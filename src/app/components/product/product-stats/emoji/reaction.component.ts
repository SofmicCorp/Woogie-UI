import {Component, Input, OnInit} from '@angular/core';
import {ProductReactionsService} from '../product-reactions.service';

@Component({
  selector: 'app-emoji',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {

  @Input() reactionCount: number;
  @Input() type: string;
  @Input() imgPath: string;
  @Input() hoverColor: string;
  @Input() clickedColor: string;
  @Input() isReacted: boolean;
  @Input() onClickFather;
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
    this.color = this.hoverColor;
  }

  onOut() {
    if (!this.isReacted){
      this.color = null;
    }
  }

  onClick(){
    this.onClickFather(this.type, !this.isReacted);
  }

}
