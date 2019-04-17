import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { CreateEmployeeCanDeactivateGaurdService } from './employees/create-employee-can-deactivate-gaurd.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
const appRoutes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  {
    path: 'create',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGaurdService]
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
