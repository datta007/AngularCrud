import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from './employee.service';

@Pipe({
  name: 'employeeFilter',
  pure: false
})
export class EmployeeFilterPipe implements PipeTransform {
private counter = 0;

  transform(employees: Employee[], searchTerm: string): Employee[] {
    this.counter++;
    console.log('This is executed at ' + this.counter);
    if (!employees || !searchTerm)    {
        return employees;
    }

    return employees.filter(employee => employee.name.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
