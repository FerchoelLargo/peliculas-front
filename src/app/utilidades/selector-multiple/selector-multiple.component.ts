import { Component, Input, OnInit, } from '@angular/core';
import { MultipleSelector } from './multipleSelector';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.scss']
})
export class SelectorMultipleComponent implements OnInit {

  constructor() { }

  @Input() public itemsElegidos: MultipleSelector[] = [];
  @Input() public itemsNoElegidos: MultipleSelector[] = [];

  ngOnInit(): void {
  }

  check(item:MultipleSelector,index:number):void{
    this.itemsElegidos.push(item)
    this.itemsNoElegidos.splice(index,1)
  }

  checkAll():void{
    this.itemsElegidos.push(...this.itemsNoElegidos)
    this.itemsNoElegidos.splice(0)
  }

  unCheck(item:MultipleSelector,index:number):void{
    this.itemsNoElegidos.push(item)
    this.itemsElegidos.splice(index,1)
  }

  unCheckAll():void{
    this.itemsNoElegidos.push(...this.itemsElegidos)
    this.itemsElegidos.splice(0)
  }

}
