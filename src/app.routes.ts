import { Routes } from '@angular/router';
import { AllEmployeesComponent } from './employee/all-employees/all-employees.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';

export const routes: Routes = [
	{
		path: '',
		component: AllEmployeesComponent,
	},
	{
		path: 'employee',
		component: AllEmployeesComponent,
		children: [
			{
				path: ':id',
				component: ViewEmployeeComponent,
			},
		],
	},
];
