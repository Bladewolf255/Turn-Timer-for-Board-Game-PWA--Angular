import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  //default colors for each player
    player1Color = signal('#D20103'); 
    player2Color = signal('#060270'); 
    player3Color = signal('#7DDA58'); 
    player4Color = signal('#FFDE59'); 
    player5Color = signal('#CC6CE7'); 
    player6Color = signal('#8D6F64'); 
    player7Color = signal('#000000'); 
    player8Color = signal('#FFFFFF'); 
  //default number of players
    numPlayers = signal('1 player'); 
}