import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = '';
  @HostListener('mouseenter') onMouseEnter(){
    this.highlight(this.appHighlight || 'red');
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.highlight('');
  }

  @HostListener("click") onClick(){
    console.log('reached-here');
    this.highlight(this.appHighlight || 'red');
  }
  highlight(color:string){
    if(this.el.nativeElement.checked)
    this.el.nativeElement.parentNode.parentElement.style.backgroundColor='#e7e7fd';
    else
    this.el.nativeElement.parentNode.parentElement.style.backgroundColor='white'
  }

  constructor(private el: ElementRef) {
    
  }

}
