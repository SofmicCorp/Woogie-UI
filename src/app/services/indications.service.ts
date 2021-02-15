import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicationsService {

  isFetching = false;
  isFetchingBehaviorSubject = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  onFetching(){
    this.isFetching = true;
    this.isFetchingBehaviorSubject.next(this.isFetching);
  }

  onStopFetching(){
    this.isFetching = false;
    this.isFetchingBehaviorSubject.next(this.isFetching);
  }

  getIsFetching(): boolean {
    return this.isFetching.valueOf();
  }
}
