import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Common } from 'src/app/global/common';
import { DepartmentService } from 'src/app/services/department.service';
import { MessagingService } from 'src/app/services/messaging.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})

export class CustomFormComponent implements OnInit {
  @Input('parentData') public customFormInputs : any[];
  
  public responseData : any[]
  public customForm: FormGroup
  public isEdit : boolean = false
  public uniqueId : string

  constructor(
    private apiServices : DepartmentService,
    private fb: FormBuilder,
    private msgServices : MessagingService,
    private common : Common) {
      //this.customForm = this.fb.group(this.common.generateFormInput(this.customFormInputs2))
  }

  ngOnInit(): void {
    this.getDepartmentList();
    this.customForm = this.fb.group(this.common.generateFormInput(this.customFormInputs))
  }

  async getDepartmentList() {
    await this.apiServices.getAllDepartments().subscribe(
			response => {
				this.responseData = response
			}, error => {
				this.msgServices.error(error, true)
			}
		)
  }

  submitForm() {
    console.log("inside form submit this.isEdit====>", this.isEdit);
    if (this.isEdit) {
      this.apiServices.updateDepartment(this.uniqueId, this.customForm.value)
    } else {
      this.apiServices.addDepartment(this.customForm.value);
    }
  }

  editClick(id : string) {
    this.isEdit = true
    this.uniqueId = id
    console.log("editClcik this.customForm====>", this.customForm);
    this.apiServices.getDepartmentById(id).subscribe(
			response => {
				console.log("Inside getAllDepartments=====>", this);
        this.customForm.patchValue(response)
			}, error => {
				this.msgServices.error(error, true)
			}
		)
  }

  deleteDepartment(id : string) {
    alert("Are you sure you want to delete Department?")
    this.apiServices.deleteDepartment(id);
  }
}
