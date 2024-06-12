import { ApplicationConfig } from "@angular/core";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from "@angular/router";
import {routes} from './app.routes';
import { HttpRequestInterceptor } from "./http.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
        provideRouter(routes, withComponentInputBinding()),
      ]
  };