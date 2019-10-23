// tslint:disable-next-line: max-line-length
import { Component, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddChoiceOne } from '../store/actions/choiceOne.action';


@Component({
  selector: 'app-player-one',
  templateUrl: './player-one.component.html',
  styleUrls: ['./player-one.component.css']
})

export class PlayerOneComponent implements OnChanges {

  nbr: number;
  nbChild: number;
  value: number;
  // pierre  = 1
  // papier  = 2
  // ciseaux = 3
  constructor(public viewContainerRef: ViewContainerRef,
              private readonly store: Store) { }

  ngOnChanges(changes: SimpleChanges) {
  }

  addChoiceOne(value) {
    this.store.dispatch(new AddChoiceOne(value));
  }
  resetChoice() {
     // tslint:disable-next-line: max-line-length
     const choice =  this.viewContainerRef.element.nativeElement.children[0].children[1];

     for (let x = 1; x < 4; x++) {
       choice.children[x].classList.add('none');
     }
  }

  choiceOne(value) {

    // tslint:disable-next-line: max-line-length
    const choice =  this.viewContainerRef.element.nativeElement.children[0].children[1];

    // tslint:disable-next-line: prefer-conditional-expression
    if (value === 0) {

      // pierre choisit
      this.value = 1;
    } else if (value === 1) {

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

    this.addChoiceOne(this.value);

  }

}
