import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

export interface Scrolling {
  currentYPosition: number;
  previousYPosition: number;
  isScrollingDown: boolean;
  triggerApiPosition: number;
  fetchNext: BehaviorSubject<boolean>;
  currentAskedPage: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollingService {

  scrollingMap: {};

  constructor(private router: Router) {
    this.initMap();
    this.router.events.subscribe(res => {
      this.initMap();
    });
  }

  update(id: string, event: Event, triggerApiPosition: number){
    if (this.scrollingMap[id] == null){
      this.scrollingMap[id] = this.initById(id, event, triggerApiPosition);
      return ;
    }
    this.scrollingMap[id].previousYPosition = this.scrollingMap[id].currentYPosition;
    this.scrollingMap[id].currentYPosition = this.getYPosition(event);
    this.scrollingMap[id].isScrollingDown = this.isScrollingDown(this.scrollingMap[id].previousYPosition, this.scrollingMap[id].currentYPosition);
    if (this.scrollingMap[id].currentYPosition != null && this.scrollingMap[id].previousYPosition != null) { this.hasReachedApiEvent(id); }
  }

  private getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  private isScrollingDown(previousYPosition: number, currentYPosition: number){
    return currentYPosition > previousYPosition ? true : false;
  }

  private hasReachedApiEvent(id: string){
    const scrolling: Scrolling = this.scrollingMap[id];
    if (Math.floor(scrolling.currentYPosition / scrolling.triggerApiPosition) > 0){
      scrolling.triggerApiPosition += scrolling.triggerApiPosition;
      scrolling.fetchNext.next(true);
      console.log('current', scrolling.currentYPosition);
      return;
    }
    scrolling.fetchNext.next(false);
  }

  getScrolling(id){
    return this.scrollingMap[id];
  }

  initMap(){
    this.scrollingMap = {};
  }

  initById(id: string, event: Event, triggerApiPosition){
    return this.scrollingMap[id] = {
      currentYPosition: this.getYPosition(event),
      previousYPosition: this.getYPosition(event),
      isScrollingDown: false,
      triggerApiPosition,
      fetchNext: new BehaviorSubject<boolean>(false),
      currentAskedPage: 0
    };
  }

  refreshScrolling(){
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
