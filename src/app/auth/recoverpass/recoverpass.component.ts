import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.component.html',
  styleUrls: ['./recoverpass.component.css',
              '../../../assets/css/pages/login-register-lock.css'
      ]
})
export class RecoverpassComponent implements OnInit,  AfterViewInit {

  @ViewChild('preloader') preloader!:ElementRef<HTMLDivElement>; 

  constructor(private router: Router) { }


  ngAfterViewInit(): void {
    this.preloader.nativeElement.style.display = 'none';
   }

  ngOnInit(): void {

  }
  recuperar(){
    this.router.navigateByUrl('/login');
  }
 
}
