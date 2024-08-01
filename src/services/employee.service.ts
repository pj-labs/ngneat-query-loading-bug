import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery } from '@ngneat/query';
import { delay } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	private httpClient = inject(HttpClient);
	private useQuery = injectQuery();

	getEmployees() {
		return this.useQuery({
			queryKey: ['employees'],
			queryFn: () => this.httpClient.get<Employee[]>(`https://my-json-server.typicode.com/pavankjadda/typicode-data/employees`),
		}).result;
	}

	getEmployees2() {
		return this.useQuery({
			queryKey: ['employees'],
			queryFn: () => this.httpClient.get<Employee[]>(`https://my-json-server.typicode.com/pavankjadda/typicode-data/employees`),
		}).result$.pipe(
			delay(2000), //delay for 2 seconds
		);
	}
}

export interface Employee {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	age: number;
}
