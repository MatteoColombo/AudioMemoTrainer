import { Component, OnInit } from '@angular/core';
import { LetterService } from './letter.service';
import { MemoComponent } from './memo/memo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sequence: string[];
  responses: string[];
  config: boolean = false;
  memo: boolean = false;
  check: boolean = false;
  result: boolean = false;
  memoTime: number;
  constructor(private ls: LetterService) {
  }

  ngOnInit() {
    this.start();
  }

  configMenu() {
    this.removeButtonFocus();
    if (this.config) {
      this.start();
    } else {
      this.memo = false;
      this.result = false;
      this.check = false;
      this.config = true;
    }
  }

  memoFinished(time: number) {
    this.memoTime = time;
    this.responses = new Array(this.sequence.length);
    this.config = false;
    this.memo = false;
    this.result = false;
    this.check = true;
  }

  checkFinished() {
    this.config = false;
    this.memo = false;
    this.check = false;
    this.result = true;
  }

  start() {
    this.removeButtonFocus();
    this.generateSequence();
    this.memo = true;
    this.config = false;
    this.check = false;
    this.result = false;
  }

  private removeButtonFocus() {
    let refreshButton = document.getElementById("refreshButton");
    refreshButton.blur();
    let configButton = document.getElementById("configButton");
    configButton.blur();
  }

  private generateSequence() {
    this.sequence = new Array(this.ls.sequenceLength);
    let letters: string[] = this.ls.activeLetters;
    let extracted: number;
    let candidate: string;
    if ((2 * this.ls.activeLetters.length) >= this.ls.sequenceLength) {
      for (let i = 0; i < this.ls.sequenceLength; i++) {
        extracted = Math.floor((Math.random() * letters.length));
        candidate = letters[extracted];
        if (this.countAppearence(candidate) >= 2 || candidate === this.sequence[i - 1]) {
          i--;
        } else if (this.countAppearence(candidate) === 1) {
          letters = letters.filter(l => this.sequence.findIndex(s => s === l) < 0);
          this.sequence[i] = candidate;
        }
        else {
          this.sequence[i] = candidate;
        }
      }
    }

  }

  private countAppearence(letter: string) {
    let count = 0;
    for (let i = 0; i < this.sequence.length; i++) {
      if (this.sequence[i] === letter)
        count++;
    }
    return count;
  }
}
