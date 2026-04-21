import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
export const appConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
        provideHttpClient(),
        provideAnimationsAsync()
    ]
};
//# sourceMappingURL=app.config.js.map