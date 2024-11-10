import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ColorService } from '../services/colorPlayer.service';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-select-time',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './select-time.component.html',
  styleUrl: './select-time.component.scss'
})
export class SelectTimeComponent  implements OnInit {
  @ViewChild('timeElement') timeElement!: ElementRef;
  @ViewChild('numPlayers') numPlayers!: ElementRef;
  @ViewChild('timeSet') timeSet!: ElementRef;
  colorService = inject(ColorService);
  counterService = inject(CounterService);
  counter = 0;
  counterSignal = this.counterService.counter;
  //players
  player1ColorControl = new FormControl(this.colorService.player1Color());
  player2ColorControl = new FormControl(this.colorService.player2Color());
  player3ColorControl = new FormControl(this.colorService.player3Color());
  player4ColorControl = new FormControl(this.colorService.player4Color());
  player5ColorControl = new FormControl(this.colorService.player5Color());
  player6ColorControl = new FormControl(this.colorService.player6Color());
  player7ColorControl = new FormControl(this.colorService.player7Color());
  player8ColorControl = new FormControl(this.colorService.player8Color());
  //numPlayers
  numPlayersControl = new FormControl(this.colorService.numPlayers());
  constructor() { 
    this.numPlayersControl.valueChanges.subscribe(numPlayers => {
      if (numPlayers !== null) {
        this.colorService.numPlayers.set(numPlayers);
      }
    });
    //color player 1
    this.player1ColorControl.valueChanges.subscribe(color => {
      if (color !== null) {
        this.colorService.player1Color.set(color);
      }
    });
    //color player 2
    this.player2ColorControl.valueChanges.subscribe(color => {
      if (color !== null) {
        this.colorService.player2Color.set(color);
      }
    });
    //color player 3
    this.player3ColorControl.valueChanges.subscribe(color => {
      if (color !== null) {
        this.colorService.player3Color.set(color);
      }
    });
    //color player 4
    this.player4ColorControl.valueChanges.subscribe(color => {
      if (color !== null) {
        this.colorService.player4Color.set(color);
      }
    });
    //color player 5
    this.player5ColorControl.valueChanges.subscribe(color => {
      if (color !== null) {
        this.colorService.player5Color.set(color);
      }
    });
    //color player 6
    this.player6ColorControl.valueChanges.subscribe(color => {
      if (color !== null) {
        this.colorService.player6Color.set(color);
      }
    });
    //color player 7
    this.player7ColorControl.valueChanges.subscribe(color => {
      if (color !== null) {
        this.colorService.player7Color.set(color);
      }
    });
    //color player 8
    this.player8ColorControl.valueChanges.subscribe(color => {
      if (color !== null) {
        this.colorService.player8Color.set(color);
      }
    });
  }

  ngOnInit() {}
  ngAfterViewInit(){
    this.numPlayers.nativeElement.value = this.numPlayersControl.value;
    this.timeSet.nativeElement.textContent = this.counterService.counter();
  }
  onInput(){
    this.counterSignal.set(this.timeElement.nativeElement.value);
    this.timeSet.nativeElement.textContent = this.counterService.counter();
    if(this.counterSignal() > 0){
      this.counterService.enableStart.set(true);
    }
    else{
      this.counterService.enableStart.set(false);
    }
  }
  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    const isNumber = /^[0-9]$/.test(event.key);
    
    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

}
