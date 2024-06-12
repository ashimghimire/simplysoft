import { Component, OnInit } from '@angular/core';
import  AppService  from '../services/app-service.service';
import { Data } from '../app.types';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { LoadingService } from '../loading-service.service';
import {delay} from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../highlight.directive';


@Component({
  standalone:true,
  selector: 'app-first',
  templateUrl:'./first.component.html',
  styleUrls: ['./first.component.css'],
  imports:[NgFor,NgIf,AgGridAngular,FormsModule,CommonModule,HighlightDirective]
})
export class FirstComponent implements OnInit {
  loading: boolean = false;
  showModal = false;
  color:string='red';
  selected:Data={econimic:0, id:0, keyfield:0, Name:'Asim', Date:new Date(),Region:'katm'};
  pageArray=()=>{
    let result=[];
    for(let i=0;i<this.pages;i++){
      result.push(i);
    }
    return result;
  }
  



  show(item:Data){
    if(item) this.selected=item;
    this.showModal = true;
  }

  sortEconomic(order:string){
    if(order='asc')
    this.list.sort(this.compareNumberEconimic);
  if(order='desc')
    this.list.sort(this.compareNumberEconimicDesc);
  }

  sortName(){
    this.list.sort(this.compareString);
  }
  
  hideModal(){
    this.showModal=false;
  }
  constructor(private appService:AppService, private _loading: LoadingService){
    
  }
  
  list:Data[]=[{id:232323,econimic:2332, keyfield:232323, Name:'232323', Date: new Date(), Region:'sdasd'}];
  appData:Data[]=[];

  colDefs: ColDef[] = [
    { field: "id" },
    { field: "econimic" },
    { field: "keyfield" },
    { field: "Name" },
    { field: "Date" },
    { field: "Region" }
  ];
  
  ngOnInit(): void {
      this.appService.getData().subscribe((data: Data[]) =>{
        this.appData=data;
        this.list=data;
        this.showList();
        this.pages=Math.ceil(data.length/this.perpage);
      });
      
      this.listenToLoading();
  }
  
  perpage=10;
  pages:number=Math.ceil(this.list.length/this.perpage);
  currentPage:number=1;

  showList(){
    this.list=this.appData.slice((this.perpage*this.currentPage-this.perpage),this.perpage*this.currentPage);
  }
  
  navigate(page:number){
    this.currentPage=page;
    this.showList();
  }
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  compareNumberEconimic(a:Data,b:Data){
    if(a.econimic<b.econimic) return -1;
    if(a.econimic>a.econimic) return 1;
    return 0;
  }

  compareNumberEconimicDesc(a:Data,b:Data){
    if(a.econimic<b.econimic) return -1;
    if(a.econimic>a.econimic) return 1;
    return 0;
  }

  compareString(a:Data,b:Data){
    const nameA= a.Name.toUpperCase();
    const nameB= b.Name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  }

  
  
  

  

}
