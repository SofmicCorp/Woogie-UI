import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

export interface Scrolling {
  currentYPosition: number;
  previousYPosition: number;
  triggerApiPosition: number;
  fetchNext: BehaviorSubject<boolean>;
  scrollUpElementTagName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollingService {

  scrollingMap: Map<string, Scrolling>;

  constructor(private router: Router) {
    this.scrollingMap = new Map<string, Scrolling>();
    this.router.events.subscribe(res => {
      this.initAllPositions();
    });
  }

  update(id: string, event: Event){
    if (this.scrollingMap.get(id) == null){
      return ;
    }
    this.scrollingMap.get(id).previousYPosition = this.scrollingMap.get(id).currentYPosition;
    this.scrollingMap.get(id).currentYPosition = this.getYPosition(event);
    if (this.scrollingMap.get(id).currentYPosition != null && this.scrollingMap.get(id).previousYPosition != null) { this.hasReachedApiEvent(id); }
  }

  private getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  private hasReachedApiEvent(id: string){
    const scrolling: Scrolling = this.scrollingMap.get(id);
    if (Math.floor(scrolling.currentYPosition / scrolling.triggerApiPosition) > 0){
      scrolling.triggerApiPosition += scrolling.triggerApiPosition;
      scrolling.fetchNext.next(true);
      console.log('current', scrolling.currentYPosition);
      return;
    }
    scrolling.fetchNext.next(false);
  }

  getScrolling(id){
    return this.scrollingMap.get(id);
  }

  initById(id: string, triggerApiPosition: number, scrollUpElementTagName: string){
    this.scrollingMap.set(id, {
      currentYPosition: 0,
      previousYPosition: 0,
      triggerApiPosition,
      fetchNext: new BehaviorSubject<boolean>(false),
      scrollUpElementTagName
    });
  }

  initPosition(id: string){
    this.scrollingMap.get(id).currentYPosition = 0;
    this.scrollingMap.get(id).previousYPosition = 0;
  }

  initAllPositions(){
    this.scrollingMap.forEach((value: Scrolling, key: string) => {
      this.initPosition(key);
    });
  }

  scrollUp(id: string){
    const element = document.getElementsByTagName(this.scrollingMap.get(id).scrollUpElementTagName)[0];
    if (element != null){
      element.scrollTo(0, 0);
      this.initPosition(id);
    }
  }

}
