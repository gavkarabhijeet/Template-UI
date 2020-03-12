import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import {ROUTESADMIN} from './menu-itemsAdmin';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  viewProducts;
  adminLogin;
  public sidebarnavItems: any[];

  // this is for the open close
  addExpandClass(element: any) {
    this.showMenu=localStorage.getItem("activeLink");
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    this.showMenu=localStorage.getItem("activeLink");
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // End open close
  ngOnInit() {
    this.showMenu=localStorage.getItem("activeLink");
    this.addActiveClass(this.showMenu);
    this.addExpandClass(this.showMenu);
    this.adminLogin=localStorage.getItem("adminLogin");
    console.log("this.adminLogin",this.adminLogin);
    if(this.adminLogin === "admin"){
      console.log("Admin Login");
      this.sidebarnavItems = ROUTESADMIN.filter(sidebarnavItem => sidebarnavItem);
    }
    else if(this.adminLogin !== "admin"){
      console.log("not an admin login");
      this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    }
    
  }
}