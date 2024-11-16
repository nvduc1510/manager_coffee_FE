import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './shared/auth/token.interceptor';
import { LucideAngularModule, ShoppingBag } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    TokenInterceptor,
    LucideAngularModule,
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    provideRouter(routes,
      withInMemoryScrolling({scrollPositionRestoration: 'enabled'})
      
    )
    ]
};
