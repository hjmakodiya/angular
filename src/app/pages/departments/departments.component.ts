import { Component, OnInit } from '@angular/core';
import formContents from 'src/assets/mockData/formsContent.json';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})

export class DepartmentsComponent implements OnInit {
  public departmentContent : any = {};
  public title : string = "";
  public customFormInputs : any[] = [];
  public apiPath : string
  public gridColumns : object 

  constructor() {
    this.departmentContent = formContents.departments
  }

  ngOnInit() {
    this.title = this.departmentContent.pageTitle
    this.customFormInputs = this.departmentContent.formFields,
    this.apiPath = this.departmentContent.apiPath
    this.gridColumns = this.departmentContent.gridColumn
  }
}
