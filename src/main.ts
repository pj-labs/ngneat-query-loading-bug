import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { provideQueryDevTools } from '@ngneat/query-devtools';
import { provideQueryClientOptions } from '@ngneat/query';

@Component({
	selector: 'my-app',
	standalone: true,
	imports: [RouterOutlet],
	template: ` <main>
		<router-outlet />
	</main>`,
})
export class App {}

bootstrapApplication(App, {
	providers: [
		provideHttpClient(),
		provideRouter(routes),
		provideQueryClientOptions({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					refetchOnMount: false,
					refetchOnReconnect: true,
					staleTime: 600000,
				},
			},
		}),
		provideQueryDevTools({ initialIsOpen: false }),
	],
})
	.then((r) => console.log('Application Bootstrapped Successfully'))
	.catch((e) => console.error('Error Bootstrapping Application', e));
