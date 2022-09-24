import { Component, Input, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { CustomFormComponent } from '../custom-form/custom-form.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input('parentData') public gridColumns : object;
  @Input() customFormComponent: CustomFormComponent;
  public responseData : any[]

  constructor(
    private apiServices : DepartmentService,
    private msgServices : MessagingService
  ) { }

  ngOnInit(): void {
    this.getDepartmentList();
    //this.customFormComponent = new CustomFormComponent()
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

  editClcik(id : string) {
    console.log("this.customFormComponent========>", this.customFormComponent);
    this.customFormComponent.editClick(id)
  }

  // deleteClick(id : string) {
  //   this.customFormComponent.deleteDepartment(id)
  // }

}
