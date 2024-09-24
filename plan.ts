// host.component.ts
import { Component, Injector, OnInit } from '@angular/core';
import { ComponentOne } from './component-one';
import { ComponentTwo } from './component-two';
import { MyService } from './my-service';

@Component({
  selector: 'app-host',
  template: `
    <h1>Dynamic Component Loader with Custom Injector</h1>

    <ng-container *ngFor="let comp of componentsArray; let i = index; trackBy: trackByFn">
      <ng-container
        *ngComponentOutlet="comp.component; injector: injectors[i]">
      </ng-container>
    </ng-container>
  `,
  standalone: true
})
export class HostComponent implements OnInit {
  componentsArray = [
    { component: ComponentOne, service: 'Service for Component One' },
    { component: ComponentTwo, service: 'Service for Component Two' }
  ];
  injectors: Injector[] = [];

  constructor(private parentInjector: Injector) {}

  ngOnInit() {
    // Create injectors once during initialization
    this.injectors = this.componentsArray.map(comp => this.getTemplateInjector(comp.service));
  }

  // Function to create a custom injector
  getTemplateInjector(serviceData: string) {
    return Injector.create({
      providers: [{ provide: MyService, useValue: { getServiceData: () => serviceData } }],
      parent: this.parentInjector
    });
  }

  // TrackBy function to minimize re-renders
  trackByFn(index: number, item: any) {
    return index; // or return item.id if each item has a unique identifier
  }
}


// my-service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes the service available application-wide
})
export class MyService {
  // Method to return some data
  getServiceData() {
    return 'Data from MyService';
  }
}


constructor(private myService: MyService) {
  this.serviceData = this.myService.getServiceData(); // Accesses data from the service
}

// component-one.ts
import { Component } from '@angular/core';
import { MyService } from './my-service';

@Component({
  selector: 'app-component-one',
  template: `<p>Component One Loaded! Service Data: {{ serviceData }}</p>`,
  standalone: true
})
export class ComponentOne {
  serviceData: string;

  constructor(private myService: MyService) {
    this.serviceData = this.myService.getServiceData();
  }
}

// component-two.ts
import { Component } from '@angular/core';
import { MyService } from './my-service';

@Component({
  selector: 'app-component-two',
  template: `<p>Component Two Loaded! Service Data: {{ serviceData }}</p>`,
  standalone: true
})
export class ComponentTwo {
  serviceData: string;

  constructor(private myService: MyService) {
    this.serviceData = this.myService.getServiceData();
  }
}


// host.component.ts
import { Component, Injector } from '@angular/core';
import { ComponentOne } from './component-one';
import { ComponentTwo } from './component-two';
import { MyService } from './my-service';

@Component({
  selector: 'app-host',
  template: `
    <h1>Dynamic Component Loader with Custom Injector</h1>

    <ng-container *ngFor="let comp of componentsArray">
      <ng-container
        [ngComponentOutlet]="comp.component"
        [ngComponentOutletInjector]="getTemplateInjector(comp.service)">
      </ng-container>
    </ng-container>
  `,
  standalone: true
})
export class HostComponent {
  componentsArray = [
    { component: ComponentOne, service: 'Service for Component One' },
    { component: ComponentTwo, service: 'Service for Component Two' }
  ];

  constructor(private parentInjector: Injector) {}

  // Function to create a custom injector
  getTemplateInjector(serviceData: string) {
    return Injector.create({
      providers: [{ provide: MyService, useValue: { getServiceData: () => serviceData } }],



      // ----------------------

      // component-one.ts
import { Component } from '@angular/core';
import { MyService } from './my-service';

@Component({
  selector: 'app-component-one',
  template: `<p>Component One Loaded! Service: {{ serviceData }}</p>`,
  standalone: true
})
export class ComponentOne {
  serviceData: string;

  constructor(private myService: MyService) {
    this.serviceData = this.myService.getServiceData();
  }
}

// component-two.ts
import { Component } from '@angular/core';
import { MyService } from './my-service';

@Component({
  selector: 'app-component-two',
  template: `<p>Component Two Loaded! Service: {{ serviceData }}</p>`,
  standalone: true
})
export class ComponentTwo {
  serviceData: string;

  constructor(private myService: MyService) {
    this.serviceData = this.myService.getServiceData();
  }
}
