import { Component, OnInit } from '@angular/core';
import { NavigationMenu } from 'src/app/core/interfaces/NavigationMenu';
import { ApiService } from 'src/app/mock-api/navigation/api.service';


declare function sidebarMenuInit():any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems:NavigationMenu[]|undefined;
  constructor(private menuNavigation: ApiService ) { 
    this.menuItems = this.menuNavigation.getMenuNavigation();
  }

  ngOnInit(): void {
    sidebarMenuInit();

  }

}
