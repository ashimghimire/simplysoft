import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoadingService } from './loading-service.service';
import { delay } from 'rxjs';
import { HighlightDirective } from './highlight.directive';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,HighlightDirective],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'routing-app';
  color='';

  constructor(){
    
  }
  

}
