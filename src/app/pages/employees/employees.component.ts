import { Component, OnInit } from '@angular/core';
import formContents from 'src/assets/mockData/formsContent.json';
import { ApiService } from 'src/app/services/api.service';
import { MessagingService } from 'src/app/services/messaging.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  public employeeContent: any = {};
  public title: string = "";
  public customFormInputs: any[] = [];
  public apiPath: string
  public gridColumns: object
  public departmentList: object[] = []
  public deptIndex: number

  constructor(private apiServices: ApiService, private msgServices: MessagingService) {
    this.employeeContent = formContents.employees
  }

  ngOnInit() {
    this.setDepartmentsDynamically();
    this.title = this.employeeContent.pageTitle
    this.customFormInputs = this.employeeContent.formFields
    this.apiPath = this.employeeContent.apiPath
    this.gridColumns = this.employeeContent.gridColumn 
  }

  setDepartmentsDynamically() {
    console.log("Inside setparams");
    this.apiServices.getAllData(this.employeeContent.foreignKeyTable).toPromise().then((response) => {
      response.forEach((element: any) => {
        if (element.is_active == "yes") {
          this.departmentList.push({ label: element.name, value: element._id })
        }
      });
      this.deptIndex = this.employeeContent.formFields.findIndex((obj : any) => obj.key == "department");
      this.employeeContent.formFields[this.deptIndex].values = this.departmentList
    }).catch(error => {
      this.msgServices.error(error, true)
    });
  }
}
