import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
    public counter = signal(0);
    public enableStart = signal(false);


    get start() {
        return this.enableStart;
    }
}

