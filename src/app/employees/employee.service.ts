import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private listEmployees: Employee[] = [
    {
      id: 1,
      fname: 'Mark',
      gender: 'Male',
      email: 'mark@pragimetech.com',
      phonenumber: null,
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
      fname: 'Mary',
      gender: 'Female',
      email: 'mary@gmail.com',
      phonenumber: 8633332,
      contactPreference: 'Phone',
      dateOfBirth: new Date('9/15/1986'),
      department: '2',
      isActive: true,
      photoPath: 'assets/images/mary.png',
      password: '',
      confirmPassword: ''
    },
    {
      id: 3,
      fname: 'John',
      gender: 'Male',
      email: 'john@gmail.com',
      phonenumber: null,
      contactPreference: 'Email',
      dateOfBirth: new Date('2/14/1977'),
      department: '3',
      isActive: true,
      photoPath: 'assets/images/john.png',
      password: '',
      confirmPassword: ''
    }
  ];
  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    // return of(this.listEmployees).pipe(delay(2000));
    return this.httpClient.get<Employee[]>('http://localhost:3000/employees')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = '';
    if (errorResponse.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${errorResponse.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${errorResponse.status}\nMessage: ${errorResponse.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
  getEmployee(employeeId: number) {
    return this.listEmployees.find(e => e.id === employeeId);
  }
  save(employee: Employee) {
    if (employee.id === null) {
      // reduce() method reduces the array to a single value. This method executes
      // the provided function for each element of the array (from left-to-right)
      // When we implement the server side service to save data to the database
      // table, we do not have to compute the id, as the server will assing it
      const maxId = this.listEmployees.reduce(function (e1, e2) {
        return (e1.id > e2.id) ? e1 : e2;
      }).id;
      employee.id = maxId + 1;

      this.listEmployees.push(employee);
    } else {
      const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
      this.listEmployees[foundIndex] = employee;
    }
  }
  deleteEmployee(id: number) {
    if (id > 0) {
      const i = this.listEmployees.findIndex(e => e.id === id);
      if (i !== -1) {
        this.listEmployees.splice(i , 1);
      }

    }
  }
}
