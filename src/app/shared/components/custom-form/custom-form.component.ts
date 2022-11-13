import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Common } from 'src/app/global/common';
import { ApiService } from 'src/app/services/api.service';
import { MessagingService } from 'src/app/services/messaging.service';

// @Injectable({
//   providedIn: 'root'
// })

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})

export class CustomFormComponent implements OnInit {
  @Input('parentData') public customFormInputs : any[];
  @Input('apiPathRoute') public apiPath : string;
  
  public responseData : any[]
  public customForm: FormGroup
  public isEdit : boolean = false
  public uniqueId : string

  constructor(
    private apiServices : ApiService,
    private fb: FormBuilder,
    private msgServices : MessagingService,
    private common : Common) {
  }

  ngOnInit(): void {
    this.customForm = this.fb.group(this.common.generateFormInput(this.customFormInputs));
    this.msgServices.editDeleteIdEvent.subscribe(obj=>{
      if (obj.isEdit) 
        this.editClick(obj.id);
      else 
        this.deleteclick(obj.id);
    })
  }

  submitForm() {
    if (this.customForm.valid) {
      if (this.isEdit) 
        this.apiServices.updateData(this.apiPath, this.uniqueId, this.customForm.value)
      else 
        this.apiServices.addData(this.apiPath, this.customForm.value);
    } else {
      this.customForm.markAllAsTouched();
    }
  }

  editClick(id : string) {
    this.isEdit = true
    this.uniqueId = id
    this.apiServices.getDataById(this.apiPath, id).subscribe(
			response => {
        this.customForm.patchValue(response)
			}, error => {
				this.msgServices.error(error, true)
			}
		)
  }

  deleteclick(id : string) {
    alert(`Are you sure you want to delete ${this.apiPath}?`)
    this.apiServices.deleteData(this.apiPath, id);
  }
}
