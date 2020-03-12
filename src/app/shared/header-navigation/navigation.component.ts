import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {NgbModal,ModalDismissReasons,NgbPanelChangeEvent, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls:['./navigation.component.css']
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  public username:any;
  public anchor = 3

  constructor(private modalService: NgbModal, private router: Router,) {}

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Launch Admin',
      subject: 'Just see the my new admin!',
     
    },
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
    
    },
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      
    }
    ,
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
     
    }
    ,
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
     
    }
    ,
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
     
    }
    ,
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
     
    }
    ,
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
     
    }
    ,
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
     
    }

    ,
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
     
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];
confirm(){
 if( confirm("Are you sure you want to logout now ?")){
    this.router.navigate(['/authentication/login']);
 }
}
  ngOnInit(): void {

    this.username =localStorage.getItem("username");
    
  }
  ngAfterViewInit() {}
}

