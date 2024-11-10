import { Component, HostListener, inject, Renderer2 } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,RouterOutlet,RouterLinkActive,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent{
  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    this.orientationStyles();
  }
  landScapeLink:any;
  landScapeLink2:any;
  counterSignal = inject(CounterService);

  constructor(private renderer:Renderer2) { }

  ngAfterViewInit(){
    console.log('test');
    this.landScapeLink = this.renderer.selectRootElement('.link__li-element', true);
    this.landScapeLink2 = this.renderer.selectRootElement('.link__li-element.a', true);
    this.orientationStyles();
  }
  orientationStyles(){
    const isLandScape = window.innerWidth > window.innerHeight;
    if(isLandScape){
      this.renderer.addClass(this.landScapeLink,'link-landscape');
      this.renderer.addClass(this.landScapeLink2,'link-landscape');
    }
    else{
      this.renderer.removeClass(this.landScapeLink,'link-landscape');
      this.renderer.removeClass(this.landScapeLink2,'link-landscape');
    }
  }
}

