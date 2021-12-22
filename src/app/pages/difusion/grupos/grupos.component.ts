import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  @ViewChild('table') table:any;

  constructor() { }

  ngOnInit(): void {
  
  }

}
