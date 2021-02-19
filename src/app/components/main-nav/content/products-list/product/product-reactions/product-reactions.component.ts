import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReactionsStats} from '../../../../../../classes/reaction/reactions-stats';
import {ReactionsEnum} from '../../../../../../classes/reaction/reactions-enum';

@Component({
  selector: 'app-product-stats',
  templateUrl: './product-reactions.component.html',
  styleUrls: ['./product-reactions.component.css']
})
export class ProductReactionsComponent implements OnInit {

  @Input() reactionsStats: ReactionsStats;
  @Output() createReaction: EventEmitter<ReactionsEnum> = new EventEmitter();
  @Output() inactiveReaction: EventEmitter<ReactionsEnum> = new EventEmitter();
  lastReactionType: ReactionsEnum;

  constructor() { }

  ngOnInit(): void {
    console.log(this.reactionsStats)
    this.lastReactionType = this.reactionsStats.type;
  }

  onClicked(reactionType: ReactionsEnum) {
    if (this.reactionsStats.active){
      if (this.lastReactionType === reactionType){
        this.reactionsStats[this.lastReactionType]--;
        this.reactionsStats.active = false;
        this.lastReactionType = null;
        this.reactionsStats.type = null;
        this.inactiveReaction.emit(reactionType);
        return;
      }
      this.reactionsStats[this.lastReactionType]--;
    }
    this.reactionsStats[reactionType]++;
    this.lastReactionType = reactionType;
    this.reactionsStats.active = true;
    this.reactionsStats.type = reactionType;
    this.createReaction.emit(reactionType);
  }

}
