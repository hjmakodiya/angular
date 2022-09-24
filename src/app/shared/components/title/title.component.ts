import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input('parentData') public title: any;
  
  constructor() { }

  ngOnInit(): void {
    console.log("Inside title component");
  }

}
