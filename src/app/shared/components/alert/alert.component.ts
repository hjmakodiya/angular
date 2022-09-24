import { Component, Input, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() alertMsg: any;
  
  constructor(private msgService: MessagingService) {
  }

  ngOnInit(): void {
    this.msgService.getMessage().subscribe(data => {
      this.alertMsg = data
    })
  }
}
