import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../model/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  // private _employeeId: number;

  // @Input()
  // set employeeeId(val: number) {
  //   console.log('employeeId changed from ' + JSON.stringify(this._employeeId)
  //     + ' to ' + JSON.stringify(val));
  //   this._employeeId = val;
  // }
  // get employeeeId(): number {
  //   return this._employeeId;
  // }
  // // Private backing field for the property
  // private _employee: Employee;
  // // This property setter is called anytime the input property changes
  // // Notice the code here logs the previous and current employee names
  // @Input()
  // set employee(val: Employee) {
  //   console.log('Previous : ' + (this._employee ? this._employee.name : 'NULL'));
  //   console.log('Current : ' + val.name);
  //   this._employee = val;
  // }
  // // This getter is called when reading and displaying data
  // get employee(): Employee {
  //   return this._employee;
  // }

  // @Input() employee: Employee;

  // ngOnInit() {
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   const previousEmployee = <Employee>changes.employee.previousValue;
  //   const currentEmployee = <Employee>changes.employee.currentValue;
  //   console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'NULL') );
  //   console.log('Current : ' + currentEmployee.name);
  // }
  // ngOnChanges(changes: SimpleChanges) {
  //   for (const propName of Object.keys(changes)) {
  //     console.log(propName);
  //     const change = changes[propName];
  //     const from = JSON.stringify(change.previousValue);
  //     const to = JSON.stringify(change.currentValue);
  //     console.log(propName + ' changed from ' + from + ' to ' + to);
  //   }
  // }
  @Input() employee: Employee;
  @Input() searchTerm: string;
  // @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  selectedEmployeeId: number;
  constructor(private _route: ActivatedRoute, private _router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  handleClick() {
    this.notify.emit(this.employee);
  }

  VeiwEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm }

    });
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.id);
    this.notifyDelete.emit(this.employee.id);
  }

}
