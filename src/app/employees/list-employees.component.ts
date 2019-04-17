import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  private employees: Employee[];
  employeeToDisplay: Employee;
  private arrayIndex = 1;
  private dataFromChild: Employee;
  constructor(private employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
    this.employeeToDisplay = this.employees[0];
  }
  handleNotify(eventData: Employee) {
    this.dataFromChild = eventData;
  }

  onClick(employeeId: number) {
this._router.navigate(['/employees', employeeId]);
  }

  nextEmployee(): void {
    if (this.employeeToDisplay.id <= 2) {
      this.employeeToDisplay = this.employees[this.arrayIndex];
      this.arrayIndex++;
    } else {
      this.employeeToDisplay = this.employees[0];
      this.arrayIndex = 1;
    }
  }

}
