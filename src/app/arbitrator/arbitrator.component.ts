// tslint:disable-next-line: max-line-length
import { Component, Input, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { isNumber } from 'util';
import { ChoiceOneState } from '../store/state/choiceOne.state';

@Component({
  selector: 'app-arbitrator',
  templateUrl: './arbitrator.component.html',
  styleUrls: ['./arbitrator.component.css']
})
export class ArbitratorComponent implements OnInit {

  constructor(public viewContainerRef: ViewContainerRef,
              private readonly store: Store) {

    this.scoreOne = 0;
    this.scoreTwo = 0;
    this.time = 3;
    this.time2 = 3;
    this.count = 3;
    this.isValue = false;
    this.ValChoice = false;
    this.isResetValue = false;
   }

  scoreOne: number;
  scoreTwo: number;
  valueOne: number;
  valueTwo: number;
  time: number;
  time2: number;
  count: number;
  isValue: boolean;
  ValChoice: boolean;
  isResetValue: boolean;

  choiceOnes$: Observable<number>;

  ngOnInit() {

  }

  disableOrdinateurChoice(test) {
    // tslint:disable-next-line: max-line-length
    const btn = this.viewContainerRef.element.nativeElement.children[0].children[1].children[0].children[0].children[2].children[3];
    // tslint:disable-next-line: max-line-length
    const selecteur = this.viewContainerRef.element.nativeElement.children[0].children[1].children[0].children[0].children[2].children[2];

    if (test === 1) {
      btn.classList.remove('disabled');
      selecteur.classList.add('none');

    } else {
      btn.classList.add('disabled');
      selecteur.classList.remove('none');

    }
  }

  chronoFirst() {
    // tslint:disable-next-line: max-line-length
    const btn = this.viewContainerRef.element.nativeElement.children[0].children[1].children[0].children[0].children[2].children[3];

    if (!btn.classList.contains('disabled')) {
      // tslint:disable-next-line: max-line-length
      const timer1 = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else if (this.time === 0) {
          this.chronoSecond();
          this.changeIsValue(1);
          clearInterval(timer1);
          }
      }, 1000);
    }
  }

  changeIsValue(val) {
    if (val === 1) {
      this.isValue = true;
    } else {
      this.isValue = false;
    }
  }

  chronoSecond() {
    this.time = 3;
    // tslint:disable-next-line: max-line-length
    const timer2 = setInterval(() => {
      if (this.time2 > 0) {
        this.time2--;
      } else if (this.time2 === 0) {
        this.compareResult();
        clearInterval(timer2);
          }
    }, 1000);
  }

  isValueSend(event) {
      if (event === true) {

        this.disableOrdinateurChoice(1);

      } else {
        this.disableOrdinateurChoice(4);
      }
  }

  compareResult() {
    this.valueOne = this.store.selectSnapshot(ChoiceOneState.choiceInfos);
    this.valueTwo = this.store.selectSnapshot(ChoiceOneState.choiceTowInfo);

    // tslint:disable-next-line: cyclomatic-complexity
    if (this.verif(1)) {
      this.verif(2);
   } else {
     if (this.valueOne  === 1 && this.valueTwo === 1) {
        // egalité de pierre
        this.winnerIcon(0);

     } else if (this.valueOne === 1 && this.valueTwo === 2) {
        // Victoire PLayer Two
        this.winnerIcon(2);
        if (this.verif(1)) {
          this.verif(2);
       }

      } else if (this.valueOne === 1 && this.valueTwo === 3) {
        // victoire Player One
        this.winnerIcon(1);
        if (this.verif(1)) {
          this.verif(2);
       }

      }  else if (this.valueOne === 2 && this.valueTwo === 1) {
        // victoire Player One
        this.winnerIcon(1);
        if (this.verif(1)) {
          this.verif(2);
       }
      }  else if (this.valueOne === 2 && this.valueTwo === 2) {
        // égalité de Papier
        this.winnerIcon(0);

      }  else if (this.valueOne === 2 && this.valueTwo === 3) {
        // victoire Player Two
        this.winnerIcon(2);
        if (this.verif(1)) {
          this.verif(2);
       }

      }  else if (this.valueOne === 3 && this.valueTwo === 1) {
        // victoire Player Two
        this.winnerIcon(2);
        if (this.verif(1)) {
          this.verif(2);
       }

      }  else if (this.valueOne === 3 && this.valueTwo === 2) {
        // Vicoire Player One
        this.winnerIcon(1);
        if (this.verif(1)) {
          this.verif(2);
       }

      }  else if (this.valueOne === 3 && this.valueTwo === 3) {
        // égalité de Ciseaux
        this.winnerIcon(0);

      }
   }
    const timer3 = setInterval(() => {
        if (this.count > 0) {
          this.count--;
        } else if (this.count === 0) {
          console.log('reset');
          this.resetWinnerIcon();
          this.isResetValue = true;
          // Launch reset of player two choice
          this.disableOrdinateurChoice(0);
          clearInterval(timer3);
        }
      }, 1000);

  }

  winnerIcon(value) {
    // tslint:disable-next-line: max-line-length
    const select = this.viewContainerRef.element.nativeElement.children[0].children[1].children[0].children[0].children[1];

    this.resetWinnerIcon();
   // Launch reset of player two choice
    if (value === 0) {
      // égalité
      select.children[2].classList.remove('none');
    } else if (value === 1) {

      // Player Two Win one Manche
      select.children[0].classList.remove('none');
        // +1 for player One
      this.scoreOne++;
    } else {

      // Player One Win one Manche
      select.children[1].classList.remove('none');
      // +1 for player Two
      this.scoreTwo++;
    }

  }

  resetWinnerIcon() {
    // tslint:disable-next-line: max-line-length
    const select = this.viewContainerRef.element.nativeElement.children[0].children[1].children[0].children[0].children[1];

    for (let x = 0; x < 3; x++) {
      select.children[x].classList.add('none');
    }
    // Launch reset of player two choice
  }

  setScoreTo0() {
    this.scoreOne = 0;
    this.scoreTwo = 0;

    // tslint:disable-next-line: max-line-length
    const select = this.viewContainerRef.element.nativeElement.children[0].children[0].children[0].children[0];

    for (let x = 2; x < 4; x++) {
     select.children[x].classList.add('none');
    }
  }

  verif(mode: number) {
    // tslint:disable-next-line: max-line-length
    const select = this.viewContainerRef.element.nativeElement.children[0].children[0].children[0].children[0];

    if (mode === 1) {
       if (this.scoreOne === 3 || this.scoreTwo === 3) {
          return true;
       } else {

         return false;
       }
      } else {
        if (this.scoreOne === 3) {
          // Winner Player One
          select.children[2].classList.remove('none');
        } else {
          // Winner Player Two
          select.children[3].classList.remove('none');
        }
      }
    }

}
