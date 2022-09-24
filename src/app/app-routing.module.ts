import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './guard/check-login.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: "login", loadChildren: () => import("./authentication/login/login.module").then(m => m.LoginModule), canLoad : [CheckLoginGuard]  },
  {
    path: "", canActivate: [CheckLoginGuard], children: [
      { path: "", component: DashboardComponent, pathMatch: 'full'},
      { path: "departments", loadChildren: () => import("./pages/departments/departments.module").then(m => m.DepartmentsModule) },
      { path: "employees", loadChildren: () => import("./pages/employees/employees.module").then(m => m.EmployeesModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }