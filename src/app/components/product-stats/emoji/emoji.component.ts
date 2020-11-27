import {Component, Input, OnInit} from '@angular/core';
import {ProductStatsService} from '../product-stats.service';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent implements OnInit {

  @Input() reactionCount: number;
  @Input() type: string;
  @Input() imgPath: string;
  @Input() hoverColor: string;
  @Input() clickedColor: string;
  clicked: boolean;
  color: string;

  constructor(private productStatsService: ProductStatsService) { }

  ngOnInit(): void {
    this.productStatsService.productStatClickedMap[this.type].subjects.subscribe(obj => {
      console.log(this.clicked);
      this.clicked = obj.clicked;
      this.reactionCount = obj.reactionCount;
      if (this.clicked){
        this.color = this.hoverColor;
      }else{
        this.color = null;
      }
    });
  }

  onHover() {
    this.color = this.hoverColor;
  }

  onOut() {
    if (!this.clicked){
      this.color = null;
    }
  }

  onClick(){
    this.productStatsService.onClicked(this.type, !this.clicked);
  }

}
