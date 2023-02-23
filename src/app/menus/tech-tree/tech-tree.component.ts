import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tech-tree',
  templateUrl: './tech-tree.component.html',
  styleUrls: ['./tech-tree.component.css']
})
export class TechTreeComponent implements OnInit {


  @Input() selectedTab: number = 1;
  @Output() selectedTabChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
