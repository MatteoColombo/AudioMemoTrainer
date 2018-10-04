import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit, OnChanges {

  index: number;
  start: number;
  @Input() sequence: string[];
  @Output() finished: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  public ngOnInit() {
    this.index = -1;
  }

  touch() {
    if (this.index === -1) {
      this.start = (new Date()).getTime();
    }
    if (this.index + 1 >= this.sequence.length) {
      let end = (new Date()).getTime();
      this.finished.emit((end - this.start));
    } else {
      this.index++;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sequence'].currentValue !== changes['sequence'].previousValue) {
      this.index = -1;
    }
  }

  @HostListener('document:keydown.space ', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
      this.touch();
  }
}
