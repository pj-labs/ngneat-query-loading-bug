import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-view-employee',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="container">
			<div>
				<h1>View Employee (via signals computed())</h1>
				<p>First Name: {{ employee()?.firstName }}</p>
				<p>Last Name: {{ employee()?.lastName }}</p>
				<p>Email: {{ employee()?.email }}</p>
				<p>Phone: {{ employee()?.phone }}</p>
				<p>Age: {{ employee()?.age }}</p>
			</div>
			<hr />
			<div>
				<h1>View Employee (via signals effect())</h1>
				<p>First Name: {{ employee2()?.firstName }}</p>
				<p>Last Name: {{ employee2()?.lastName }}</p>
				<p>Email: {{ employee2()?.email }}</p>
				<p>Phone: {{ employee2()?.phone }}</p>
				<p>Age: {{ employee2()?.age }}</p>
			</div>
		</div>
	`,
	styles: [],
})
export class ViewEmployeeComponent {
	employeeService = inject(EmployeeService);
	route = inject(ActivatedRoute);
	result = this.employeeService.getEmployees();
	employee2 = signal<Employee | undefined>(undefined);
	employee = computed(() => {
		if (this.route.snapshot.paramMap.get('id')) {
			return this.result()?.data?.find((employee: Employee) => employee.id === Number(this.route.snapshot.paramMap.get('id')));
		}
		return undefined;
	});

	constructor() {
		effect(
			() => {
				if (this.route.snapshot.paramMap.get('id')) {
					this.employee2.set(this.result()?.data?.find((employee) => employee.id === Number(this.route.snapshot.paramMap.get('id'))));
				}
			},
			{ allowSignalWrites: true },
		);
	}
}
