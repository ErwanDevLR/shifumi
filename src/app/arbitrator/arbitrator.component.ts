import { Component, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Logs } from 'selenium-webdriver';
import { isNumber } from 'util';
import { PlayerTwoComponent } from '../player-two/player-two.component';
import { PlayerOneComponent } from '../player-one/player-one.component';

@Component({
  selector: 'app-arbitrator',
  templateUrl: './arbitrator.component.html',
  styleUrls: ['./arbitrator.component.css']
})
export class ArbitratorComponent implements OnChanges {

  // tslint:disable-next-line: prefer-inline-decorator
  @ViewChild(PlayerTwoComponent) PlayerTwo: PlayerTwoComponent;
  @ViewChild(PlayerOneComponent) playerOne: PlayerOneComponent;
  @Input() myMode;

  constructor(public viewContainerRef: ViewContainerRef) {
    this.scoreOne = 0;
    this.scoreTwo = 0;
    this.time = 3;
    this.time2 = 3;
    this.count = 3;
   }

  scoreOne: number;
  scoreTwo: number;
  valueOne: number;
  valueTwo: number;
  time: number;
  time2: number;
  count: number;

  ngOnChanges(changes: SimpleChanges) {

    // console.log(changes.myMode.currentValue);

  }

  chronoFirst() {
    // tslint:disable-next-line: max-line-length
    const timer1 = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else if (this.time === 0) {

        this.chronoSecond();
        this.PlayerTwo.choiceTwo();
        clearInterval(timer1);
        }
    }, 1000);
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

  getChoiceOne(event) {

    this.valueOne = event;
  }
  getChoiceTwo(event) {

    this.valueTwo = event;
  }

  compareResult() {

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
          clearInterval(timer3);
        }
      }, 1000);

  }

  winnerIcon(value) {
    // tslint:disable-next-line: max-line-length
    const select = this.viewContainerRef.element.nativeElement.children[0].children[1].children[0].children[0].children[1];
    // console.log(select);
    this.resetWinnerIcon();
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
    // console.log(select);
  }

  resetWinnerIcon() {
    // tslint:disable-next-line: max-line-length
    const select = this.viewContainerRef.element.nativeElement.children[0].children[1].children[0].children[0].children[1];

    for (let x = 0; x < 3; x++) {
      select.children[x].classList.add('none');
    }
    this.PlayerTwo.resetChoice();
    this.playerOne.resetChoice();
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
        // console.log('we got a winner ');
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
