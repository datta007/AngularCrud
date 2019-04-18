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

  constructor(private employeeService: EmployeeService, private _router: Router) { }
  private employees: Employee[];
  employeeToDisplay: Employee;
  filteredEmployees: Employee[];
  private _searchTerm: string;
  private arrayIndex = 1;
  private dataFromChild: Employee;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.getfilteredemployee(value);
  }

  getfilteredemployee(searchTerm: string) {

    return this.employees.filter(x => x.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
    this.employeeToDisplay = this.employees[0];
    this.filteredEmployees = this.employees;
  }
  handleNotify(eventData: Employee) {
    this.dataFromChild = eventData;
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId], {
      queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValule'}

    });
  }
  changeemployeeName(): void {
    // const newEmployee: Employee[] = Object.assign([], this.employees);
    this.employees[0].name = 'Jordan';
    // this.employees = newEmployee;
    this.filteredEmployees = this.getfilteredemployee(this.searchTerm);

  }
  onmousemove(): void {

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
