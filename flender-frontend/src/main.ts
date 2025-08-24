import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';   // 👈 check filename (could be app.component.ts)
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

