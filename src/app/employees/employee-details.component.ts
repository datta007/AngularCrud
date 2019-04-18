import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  private _employeeid: number;
  constructor(private _route: ActivatedRoute, private _employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit() {
    // Using this approach when we want to navigate back to list and come agan to the details page then use SnapShot
    // this._employeeid = +this._route.snapshot.paramMap.get('id');
    this._route.paramMap.subscribe(params => {
      this._employeeid = + params.get('id');
      this.employee = this._employeeService.getEmployee(this._employeeid);
    });


  }
  getNextEmployee() {
    if (this._employeeid < 3) {
      this._employeeid = this._employeeid + 1;
    } else { this._employeeid = 1; }
    this.router.navigate(['/employees', this._employeeid]);
  }

}
