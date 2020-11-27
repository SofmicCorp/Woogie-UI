import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductStatsService {
  productStatClickedMap: {};
  constructor() {
    this.productStatClickedMap = {
      loved: {
        subjects: new BehaviorSubject<{clicked: boolean, reactionCount: number}>({clicked: false, reactionCount: 0}),
        clicked: false,
        reactionCount: 0
      },
      hated: {
        subjects: new BehaviorSubject<{clicked: boolean, reactionCount: number}>({clicked: false, reactionCount: 0}),
        clicked: false,
        reactionCount: 0
      },
      interested: {
        subjects: new BehaviorSubject<{clicked: boolean, reactionCount: number}>({clicked: false, reactionCount: 0}),
        clicked: false,
        reactionCount: 0
      },
      bought: {
        subjects: new BehaviorSubject<{clicked: boolean, reactionCount: number}>({clicked: false, reactionCount: 0}),
        clicked: false,
        reactionCount: 0
      },
    };
  }

  onClicked(key: string, value: boolean){
    if(this.productStatClickedMap[key].clicked){
      this.productStatClickedMap[key].clicked = false;
      this.productStatClickedMap[key].subjects.next({clicked: false, reactionCount: --this.productStatClickedMap[key].reactionCount});
      return;
    }
    Object.keys(this.productStatClickedMap).forEach((type ) => {
      if (this.productStatClickedMap[type].clicked){
        this.productStatClickedMap[type].clicked = false;
        this.productStatClickedMap[type].subjects.next({clicked: false, reactionCount: --this.productStatClickedMap[type].reactionCount});
      }
    });
    this.productStatClickedMap[key].clicked = value;
    this.productStatClickedMap[key].subjects.next({clicked: true, reactionCount: ++this.productStatClickedMap[key].reactionCount});
  }

}
