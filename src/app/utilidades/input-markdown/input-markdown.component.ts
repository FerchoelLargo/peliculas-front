import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.scss']
})
export class InputMarkdownComponent implements OnInit {

  public textoMarkDown: string = '';

  @Input() public labelForTextArea:string;
  @Input() private defaultText:string;

  @Output()public sendMarkDownText: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    if(this.defaultText !== undefined){
      this.textoMarkDown = this.defaultText;
    }
  }
}
