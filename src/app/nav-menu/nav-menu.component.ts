import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterViewInit {

  //@ts-ignore
  @ViewChild('container') private container: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.container.nativeElement.width = window.innerWidth;
  }

}
