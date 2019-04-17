import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private listEmployees: Employee[] = [
    {
    id: 1,
    name: 'Mark',
    gender: 'Male',
    email: 'mark@gmail.com',
    phonenumber: 1234567,
    contactPreference: 'Email',
    dateOfBirth: new Date('4/5/1987'),
    department: '1',
    isActive: true,
    photoPath: 'assets/images/mark.png',
    password: '',
    confirmPassword: ''
   },
   {
    id: 2,
    name: 'Mary',
    gender: 'Female',
    email: 'mary@gmail.com',
    phonenumber: 8633332,
    contactPreference: 'Email',
    dateOfBirth: new Date('9/15/1986'),
    department: '2',
    isActive: true,
    photoPath: 'assets/images/mary.png',
    password: '',
    confirmPassword: ''
   },
   {
    id: 3,
    name: 'John',
    gender: 'Male',
    email: 'john@gmail.com',
    phonenumber: 2457167,
    contactPreference: 'Email',
    dateOfBirth: new Date('2/14/1977'),
    department: '3',
    isActive: true,
    photoPath: 'assets/images/john.png',
    password: '',
    confirmPassword: ''
   }
  ];
  constructor() { }
  getEmployees(): Employee[] {
      return this.listEmployees;
  }

  save(employee: Employee) {
    this.listEmployees.push(employee);
  }
}
