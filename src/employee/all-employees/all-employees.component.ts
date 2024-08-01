import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeService } from '../../services/employee.service';
import { RouterLink } from '@angular/router';
import { initializeState, markLoading, markSuccess, PrimaryButtonComponent, SpinnerComponent } from '@js-smart/ng-kit';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-all-employees',
	standalone: true,
	imports: [CommonModule, RouterLink, FormsModule, SpinnerComponent, PrimaryButtonComponent],
	template: `
		<div>
			<h1>Employees</h1>
			<hr />
			<form (ngSubmit)="loadData()">
				<primary-button
					type="submit"
					[loading]="loadingState().isLoading"
					label="Load Data"
					loadingLabel="Loading Data..."></primary-button>
				<ul *ngFor="let employee of employees" class="mt-3">
					<li>
						<a [routerLink]="['/employee', employee?.id]">{{ employee.firstName }} {{ employee.lastName }}</a>
					</li>
				</ul>
			</form>
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
