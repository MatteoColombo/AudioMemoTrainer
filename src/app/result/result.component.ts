import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() sequence: string[];
  @Input() responses: string[];
  @Input() time: number;
  @Output() restart: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('document:keydown.space', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this, this.restart.emit();
  }

}
