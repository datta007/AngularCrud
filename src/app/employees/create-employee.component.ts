import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../model/department.model';
import { BsDatepickerConfig } from 'node_modules/ngx-bootstrap/datepicker';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../employees/employee.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  // gender = 'male';
  isActive = true;
  previewPhoto = false;
  employee: Employee;
  panelTitle: string;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }

  ];

  // saveEmployee(empForm: NgForm): void {
  //     console.log(empForm.value);
  // }
  // saveEmployee(employeeForm: Employee): void {
  //     console.log(employeeForm);
  // }
  saveEmployee(): void {
    let newEmployee: Employee;
    newEmployee = Object.assign({}, this.employee);
    this.employeeService.save(newEmployee);
    this.createEmployeeForm.reset();
    this.router.navigate(['list']);
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
  constructor(private employeeService: EmployeeService, private router: Router, private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: true,
        minDate: new Date(2018, 0, 1),
        maxDate: new Date(2018, 11, 31),
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        fname: null,
        gender: null,
        contactPreference: null,
        phonenumber: null,
        email: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null,
        password: null,
        confirmPassword: null
      };
      this.createEmployeeForm.reset();
      this.panelTitle = 'Create Employee';

    }  else {
      this.employee = Object.assign({}, this.employeeService.getEmployee(id));
      this.panelTitle = 'Edit Employee';
    }

  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

}
