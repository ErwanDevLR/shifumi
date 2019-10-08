// tslint:disable-next-line: max-line-length
import { Component, EventEmitter,  OnInit, Output, ViewContainerRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Logs } from 'selenium-webdriver';
import { ChangeDetectorStatus } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'app-player-two',
  templateUrl: './player-two.component.html',
  styleUrls: ['./player-two.component.css']
})
export class PlayerTwoComponent implements OnChanges {
  nbr: number;
  nbChild: number;
  value: number;
  // pierre  = 1
  // papier  = 2
  // ciseaux = 3

  constructor(public viewContainerRef: ViewContainerRef) { 
    this.time = 3;
  }
  time: number;

  @Output() readonly playerTwo: EventEmitter<any> = new EventEmitter();
  @Input() ResetChoiceTwo;
  @Input() ChoiceTwo;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);

    this.isChange(changes, 1);

  }

  isChange(changes, value) {
    if (value === 1) {
      if (changes.ResetChoiceTwo.currentValue === true) {

        this.resetChoice();
      }
    }
  }

  resetChoice() {
     // tslint:disable-next-line: max-line-length
     const choice =  this.viewContainerRef.element.nativeElement.children[0].children[1];

     for (let x = 1; x < 4; x++) {
       choice.children[x].classList.add('none');
     }
  }

  choiceTwo() {

    // tslint:disable-next-line: max-line-length
    const choice =  this.viewContainerRef.element.nativeElement.children[0].children[1];
    const gene = Math.floor(Math.random() * 3);
    // tslint:disable-next-line: prefer-conditional-expression
    if (gene === 0) {

      // pierre choisit
      this.value = 1;
    } else if (gene === 1) {

      // papier choisit
      this.value = 2;
    } else {

      // ciseaux choisit
      this.value = 3;
    }

    // reset the previous choice
    this.resetChoice();

    // display the choice of the player
    choice.children[this.value].classList.remove('none');

    this.playerTwo.emit(this.value);

  }

}
