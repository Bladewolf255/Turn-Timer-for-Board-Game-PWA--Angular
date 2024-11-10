import { inject} from "@angular/core";
import { CanActivateFn, Router} from "@angular/router";
import { CounterService } from "../services/counter.service";

export const startGuard: CanActivateFn = (route) => {
    const router = inject(Router);
    const counter = inject(CounterService);

    if( counter.counter() > 0){
        counter.enableStart.set(true);
        return true;
    }
    else{
        router.navigate(['/']);
        counter.enableStart.set(false);
        return false;
    }
}
