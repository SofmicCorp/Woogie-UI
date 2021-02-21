import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

export interface Scrolling {
  currentYPosition: number;
  previousYPosition: number;
  triggerApiPosition: number;
  fetchNext: BehaviorSubject<boolean>;
  currentAskedPage: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollingService {

  scrollingMap: Map<string, Scrolling>;

  constructor(private router: Router) {
    this.initMap();
    this.router.events.subscribe(res => {
      this.initMap();
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
    scrolling.currentAskedPage++;
  }

  getScrolling(id){
    return this.scrollingMap.get(id);
  }

  initMap(){
    this.scrollingMap = new Map<string, Scrolling>();
  }

  initById(id: string, triggerApiPosition){
    this.scrollingMap.set(id, {
      currentYPosition: 0,
      previousYPosition: 0,
      triggerApiPosition,
      fetchNext: new BehaviorSubject<boolean>(false),
      currentAskedPage: 0
    });
  }

  refreshScrolling(){
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
