import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  @Input() availableLetters: string[];
  @Input() responses: string[];
  @Output() finished: EventEmitter<any> = new EventEmitter();
  index: number;
  stringResponses: string;

  constructor() { }

  ngOnInit() {
    this.index = 0;
    this.stringResponses = "";
  }

  addLetter(letter) {
    this.responses[this.index] = letter;
    this.stringResponses += letter + " ";
    this.index++;
    if (this.index === this.responses.length) {
      this.finished.emit(true);
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)) {
      this.addLetter((event.key.toUpperCase()));
    } else if (event.key === "Backspace") {
      this.removeLetter();
    }
  }

  @HostListener('document:keydown.backspace', ['$event'])
  handleBackSpaceEvent(event: KeyboardEvent) {
    this.removeLetter();
  }

  removeLetter() {
    this.index--;
    if (this.index >= 0)
      this.stringResponses = this.stringResponses.substr(0, (this.stringResponses.length - 2));
  }
}
