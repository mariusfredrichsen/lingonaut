import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import Aura from '@primeng/themes/aura';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      ripple: true,
    }),
    ...(appConfig.providers ?? []),
  ],
}).catch((err) => console.error(err));
