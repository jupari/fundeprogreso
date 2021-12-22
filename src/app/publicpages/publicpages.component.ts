import { Component, OnInit } from '@angular/core';


declare function carouselInit():any;

@Component({
  selector: 'app-publicpages',
  templateUrl: './publicpages.component.html',
  styleUrls: ['./publicpages.component.css']
})
export class PublicpagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //carouselInit();
  }

}
