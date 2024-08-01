import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeService } from '../../services/employee.service';
import { RouterLink } from '@angular/router';
import { initializeState, markLoading, markSuccess } from '@js-smart/ng-kit';

@Component({
	selector: 'app-all-employees',
	standalone: true,
	imports: [CommonModule, RouterLink],
	template: `
		<div>
			<h1>Employees</h1>
			<hr />
			@if(loadingState().isLoading) {
			<p>Loading...</p>
			} @else {
			<button (click)="loadData()">Fetch Data</button>
			}

			<ul *ngFor="let employee of employees">
				<li>
					<a [routerLink]="['/employee', employee?.id]">{{ employee.firstName }} {{ employee.lastName }}</a>
				</li>
			</ul>
		</div>
	`,
	styles: [],
})
export class AllEmployeesComponent {
	loadingState = initializeState();
	employeeService = inject(EmployeeService);
	employees: Employee[] | undefined;

	loadData() {
		markLoading(this.loadingState);
		this.employeeService.getEmployees2().subscribe((result) => {
			markSuccess(this.loadingState);
			this.employees = result?.data;
		});
	}
}
