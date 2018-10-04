import { Component, OnInit, Input } from '@angular/core';
import { LetterService } from '../letter.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234";
  pairs: { letter: string, active: boolean }[] = [];
  loaded: boolean = false;
  seqLength;

  constructor(private ls: LetterService) { }

  ngOnInit() {
    this.seqLength = this.ls.sequenceLength;
    this.pairs = [];
    for (let i = 0; i < this.alphabet.length; i++) {
      this.pairs[i] = { letter: this.alphabet[i], active: (this.ls.activeLetters.findIndex(l => l === this.alphabet[i]) >= 0) };
      this.loaded = true;
    }
  }

  save() {
    if (this.seqLength !== this.ls.sequenceLength && this.seqLength > 0) {
      this.ls.setSequence(this.seqLength);
    }
    let removed: string[] = [];
    for (let l of this.ls.activeLetters) {
      let index = this.pairs.findIndex(p => (p.letter === l && !p.active));
      if (index >= 0) {
        removed.push(l);
      }
    }
    this.ls.removeLetters(removed);

    let added: string[] = [];
    for (let p of this.pairs) {
      if (p.active) {
        let index = this.ls.activeLetters.findIndex(l => l === p.letter);
        if (index < 0) {
          added.push(p.letter);
        }
      }

    }
    this.ls.addLetters(added);
  }

  reset() {
    this.ls.resetLetters();
    this.ls.resetSequence();
    this.ngOnInit();
  }
}
