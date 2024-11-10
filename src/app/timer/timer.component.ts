import { Component, HostListener, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownModule } from 'ngx-countdown';
import { ColorService } from '../services/colorPlayer.service';
import { CounterService } from '../services/counter.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule,CountdownModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;
  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    this.orientationStyles();
  }
  private timer:any;
  private pauseBtn:any;
  private btnChangeOrder:any;
  private btnPassTurn:any;

  colorService = inject(ColorService);
  counterService = inject(CounterService);
  currentColorIndex: number = 0;
  counterSignal = this.counterService.counter;
  counting = false;
  zero = true;
  
  audio2 = new Audio('../assets/sounds/ding.mp3');
  passTurnDisabled = false;
  changeOrder = false;
  colors =[
    this.colorService.player1Color(),
    this.colorService.player2Color(),
    this.colorService.player3Color(),
    this.colorService.player4Color(),
    this.colorService.player5Color(),
    this.colorService.player6Color(),
    this.colorService.player7Color(),
    this.colorService.player8Color()
  ]
  constructor(private renderer: Renderer2) {
    
   }
   loadElement(){
    return this.counterSignal();
   }
  ngOnInit(): void {
    this.audio2.load();
  }
  ngAfterViewInit(){
    this.timer = this.renderer.selectRootElement('.timer__timer-container', true);
    this.pauseBtn = this.renderer.selectRootElement('.btn-container__timer', true);
    this.btnChangeOrder = this.renderer.selectRootElement('.swap-icon__timer', true);
    this.btnPassTurn = this.renderer.selectRootElement('.change-turn__timer', true);
    this.renderer.setStyle(this.timer, 'background-color', this.colors[0]);
    this.sliceColors();
    this.orientationStyles();
  }
 //timer controls
  pauseEvent(){
    this.countdown.pause();
  }
  resumeCounting(){
    this.countdown.resume();
  }
  resetCounting(){
    this.countdown.restart();
  }
  handleEvent(event: any) {
    switch (event.action) {
      case 'start':
        this.counting = true;
        this.zero = false;
       
        break;

      case 'pause':
        this.counting = false;
        break;
      
      case 'resume':
        this.counting = true;
        break;
      
      case 'done':
        this.counting = false;
        this.zero = true;
        break;

      case 'restart':  
        this.delayDisableBtn();     
        this.counting = true;
        this.zero = false;
        if(this.changeOrder){
          this.previousColor();
        }
        else{
          this.applyNextColor();
        }
        break;
    
      default:
        this.zero = true;
        break;
    }
    if(event.text === '00:00'){
      this.zero = true;
      this.playSound2();
    }
   
    }
  //END timer controls
  applyNextColor() {
    this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    const nextColor = this.colors[this.currentColorIndex];
    this.renderer.setStyle(this.timer, 'background-color', nextColor);
  }
  previousColor() {
    this.currentColorIndex = (this.currentColorIndex - 1) % this.colors.length;
    if (this.currentColorIndex < 0) {
      this.currentColorIndex = this.colors.length - 1;
    }
    const previousColor = this.colors[this.currentColorIndex];
    this.renderer.setStyle(this.timer, 'background-color', previousColor);
  }
  sliceColors(){
    switch (this.colorService.numPlayers()) {
      case '1 player':
        this.colors = this.colors.slice(0, 1);
        break;
      case '2 players':
        this.colors = this.colors.slice(0, 2);
        break;
      case '3 players':
        this.colors = this.colors.slice(0, 3);
        break;
      case '4 players':
        this.colors = this.colors.slice(0, 4);
        break;
      case '5 players':
        this.colors = this.colors.slice(0, 5);
        break;
      case '6 players':
        this.colors = this.colors.slice(0, 6);
        break;
      case '7 players':
        this.colors = this.colors.slice(0, 7);
        break;
      case '8 players':
        this.colors = this.colors.slice(0, 8);
        break;
    
      default:
        this.colors = this.colors.slice(0, 1);
        break;
    }
  }
  orientationStyles(){
    const isLandScape = window.innerWidth > window.innerHeight;
    if(isLandScape){
      this.renderer.addClass(this.timer,'timer-container-landscape');
      this.renderer.addClass(this.btnPassTurn,'change-turn__timer-landscape');
      this.renderer.addClass(this.pauseBtn,'pause-btn__btn-container__timer-landscape');
    }
    else{
      this.renderer.removeClass(this.timer,'timer-container-landscape');
      this.renderer.removeClass(this.btnPassTurn,'change-turn__timer-landscape');
      this.renderer.removeClass(this.pauseBtn,'pause-btn__btn-container__timer-landscape');

    }
  }
  
  playSound2() {
    this.audio2.currentTime = 0;
    this.audio2.play().catch(error => console.error('Error al reproducir el audio:', error));
  }
  toggleChangeOrder(){
    this.changeOrder = !this.changeOrder;
    this.renderer.setStyle(this.btnChangeOrder, 'background-color', this.changeOrder ? 'blue' : 'rgba(255, 255, 255, 0.644)');
  }
  delayDisableBtn(){
    this.passTurnDisabled = true;
    this.renderer.setStyle(this.btnPassTurn, 'color', 'lightgrey');
   setTimeout(() => {
    this.passTurnDisabled = false;
    this.renderer.setStyle(this.btnPassTurn, 'color', 'white');
   }, 1000);
  }
}
