import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  public activeLetters: string[] = [];
  public sequenceLength: number = 7;

  constructor() {
    let storedLetters: string[] = JSON.parse(localStorage.getItem('letters'));
    let storedLength: number = JSON.parse(localStorage.getItem('length'));
    if (storedLetters) {
      this.activeLetters = storedLetters;
    } else {
      this.resetLetters();
    }

    if (storedLength) {
      this.sequenceLength = storedLength;
    } else {
      this.resetSequence()
    }
  }

  public resetSequence() {
    this.sequenceLength = 7;
    localStorage.setItem('length', JSON.stringify(this.sequenceLength));
  }

  public setSequence(seq: number) {
    this.sequenceLength = seq;
    localStorage.setItem('length', JSON.stringify(this.sequenceLength));
  }


  public addLetters(toBeAdded) {
    toBeAdded = toBeAdded.filter(l => this.activeLetters.findIndex(a => a === l) < 0);
    for (let l of toBeAdded) {
      this.activeLetters.push(l);
    }
    this.sortLetters();
    this.saveLetters();
  }


  public removeLetters(toBeRemoved: string[]) {
    this.activeLetters = this.activeLetters.filter(l => toBeRemoved.findIndex(f => f === l) < 0);
    this.saveLetters();
  }

  public resetLetters() {
    this.activeLetters = [];
    for (let i = 65; i <= 90; i++) {
      this.activeLetters.push(String.fromCharCode(i));
    }
    this.saveLetters();
  }

  private saveLetters() {
    localStorage.setItem('letters', JSON.stringify(this.activeLetters));
  }

  private sortLetters() {
    this.activeLetters.sort((a, b) => {
      if (a < b)
        return -1;
      if (b < a)
        return 1;
      return 0;
    })
  }
}
