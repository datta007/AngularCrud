import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EmployeeService } from './employees/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuardDetailsService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const employeeExist = !!this._employeeService.getEmployee(+route.paramMap.get('id'));
    // Two Exclamation mark are used to convert into boolean value
    // + sign is used to convert into integer values

    if (employeeExist) {
      return true;
    } else {
      this._router.navigate(['/notFound']);
      return false;
    }
  }
  constructor(private _employeeService: EmployeeService, private _router: Router) {

  }
}
