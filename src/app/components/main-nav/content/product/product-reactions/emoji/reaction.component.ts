import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductReactionsService} from '../product-reactions.service';
import {ReactionsEnum} from '../../../../../../classes/reaction/reactions-enum';
import {ReactionsStats} from '../../../../../../classes/reaction/reactions-stats';

@Component({
  selector: 'app-emoji',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {

  @Input() reactionCount: number;
  @Input() reactionType: ReactionsEnum;
  @Input() imgPath: string;
  @Input() hoverColor: string;
  @Input() clickedColor: string;
  @Input() isReacted: boolean;
  @Input() reactionsStats: ReactionsStats;
  @Output() clickFather: EventEmitter<any> = new EventEmitter();
  color: string;

  constructor(private productStatsService: ProductReactionsService) { }

  ngOnInit(): void {
    // this.productStatsService.productStatClickedMap[this.type].subjects.subscribe(obj => {
    //   this.isReacted = obj.clicked;
    //   this.reactionCount = obj.reactionCount;
    //   if (this.isReacted){
    //     this.color = this.hoverColor;
    //   }else{
    //     this.color = null;
    //   }
    // });
  }

  onHover() {
    // this.color = this.hoverColor;
  }

  onOut() {
    // if (!this.isReacted){
    //   this.color = null;
    // }
  }

  onClick(){
    this.clickFather.emit(this.reactionType);
  }

}
