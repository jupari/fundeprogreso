import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private autService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.autService.signOut();
    this.router.navigateByUrl('/public/home');
  }
}
