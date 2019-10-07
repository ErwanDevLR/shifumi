import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ArbitratorComponent } from './arbitrator/arbitrator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shifumi';
  nbr: number;
  mode: string;
  
  constructor(public viewContainerRef: ViewContainerRef) {

  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length

  }

  choiceMode(value) {
      if (value === 1) {
        // random Mode
        this.mode = 'random';
      } else {
        this.mode = 'choice';
      }
  }

}
