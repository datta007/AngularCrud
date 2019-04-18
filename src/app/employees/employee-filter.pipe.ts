import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from './employee.service';

@Pipe({
  name: 'employeeFilter',
  pure: true
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(employees: Employee[], searchTerm: string): Employee[] {
    if (!employees || !searchTerm)    {
        return employees;
    }

    return employees.filter(employee => employee.name.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
