import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MessagingService } from 'src/app/services/messaging.service';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input('parentData') public gridColumns: object;
  @Input('apiPathRoute') public apiPath : string;
  public responseData: any[]

  constructor(
    private apiServices: ApiService,
    private msgServices: MessagingService) { }

  ngOnInit(): void {
    this.getDataList();
  }

  async getDataList() {
    await this.apiServices.getAllData(this.apiPath).subscribe(
      response => {
        this.responseData = response
      }, error => {
        this.msgServices.error(error, true)
      }
    )
  }

  editClick(id: string) {
    this.msgServices.editDeleteIdEvent.emit({id, isEdit: true});
  }

  deleteClick(id : string) {
    this.msgServices.editDeleteIdEvent.emit({id, isEdit: false})
  }

}
