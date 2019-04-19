import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {


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

  constructor(private employeeService: EmployeeService, private _router: Router,
    private _route: ActivatedRoute) {
    this.employees = this._route.snapshot.data['employeeList'];
    this._route.queryParamMap.subscribe((queryParams) => {
      if (queryParams.has('searchTerm')) {
        this.searchTerm = queryParams.get('searchTerm');
      } else {
        this.filteredEmployees = this.employees;
      }
    });
  }

  getfilteredemployee(searchTerm: string) {

    return this.employees.filter(x => x.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

  ngOnInit() {

    this.employeeToDisplay = this.employees[0];
    // Below is Snapshot Approach
    // if (this._route.snapshot.queryParamMap.has('searchTerm')) {
    //   this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    // } else {
    //   this.filteredEmployees = this.employees;
    // }
    // console.log(this._route.snapshot.queryParamMap.has('searchTerm'));
    // console.log(this._route.snapshot.queryParamMap.get('searchTerm'));
    // console.log(this._route.snapshot.queryParamMap.getAll('searchTerm'));
    // console.log(this._route.snapshot.queryParamMap.keys);

    // console.log(this._route.snapshot.paramMap.keys);


  }
  handleNotify(eventData: Employee) {
    this.dataFromChild = eventData;
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId], {
      queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValule' }

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
