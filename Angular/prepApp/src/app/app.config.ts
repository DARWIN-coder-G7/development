import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { PreventDefaultEventPlugin } from '../components/event-manager-plugin/prevent-default-events';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    {
      provide:EVENT_MANAGER_PLUGINS,
      multi:true,
      useClass:PreventDefaultEventPlugin
    }
  ]
};
