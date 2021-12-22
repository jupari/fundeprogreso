import { Component, OnInit } from '@angular/core';

declare function carouselInit():any;
declare function homeInicializar():any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //carouselInit();
    //homeInicializar();
  }

}
