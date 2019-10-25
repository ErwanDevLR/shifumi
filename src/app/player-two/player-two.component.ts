// tslint:disable-next-line: max-line-length
import { Component, OnChanges,  SimpleChanges , ViewContainerRef, Input } from '@angular/core';
import { AddChoiceTwo } from '../store/actions/choiceOne.action';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

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

  constructor(public viewContainerRef: ViewContainerRef,
              private readonly store: Store) {}

  @Input()isValue: boolean;
  @Input()isReset: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (this.isValue) {
      this.choiceTwo();
    }
    if (this.isReset) {
      this.resetChoice();
    }
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

  addChoiceTwo(value) {
    this.store.dispatch(new AddChoiceTwo(value));
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

    // launch value of player two
    this.addChoiceTwo(this.value);
  }

}
