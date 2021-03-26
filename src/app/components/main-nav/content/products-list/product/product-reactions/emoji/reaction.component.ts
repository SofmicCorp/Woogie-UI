import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductReactionsService} from '../product-reactions.service';
import {ReactionsEnum} from '../../../../../../../classes/reaction/reactions-enum';
import {ReactionsStats} from '../../../../../../../classes/reaction/reactions-stats';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {iconSvg} from '../../../../../../../constants/icons-svg';

const HATED = iconSvg.hated;
const LOVED = iconSvg.loved;
const INTERESTED = iconSvg.interested;
const BOUGHT = iconSvg.bought;

@Component({
  selector: 'app-emoji',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit {

  @Input() reactionCount: number;
  @Input() reactionType: ReactionsEnum;
  @Input() clickedColor: string;
  @Input() reactionsStats: ReactionsStats;
  @Output() clickFather: EventEmitter<any> = new EventEmitter();

  constructor(private productStatsService: ProductReactionsService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('hated', sanitizer.bypassSecurityTrustHtml(HATED));
    iconRegistry.addSvgIconLiteral('loved', sanitizer.bypassSecurityTrustHtml(LOVED));
    iconRegistry.addSvgIconLiteral('interested', sanitizer.bypassSecurityTrustHtml(INTERESTED));
    iconRegistry.addSvgIconLiteral('bought', sanitizer.bypassSecurityTrustHtml(BOUGHT));
  }

  ngOnInit(): void {

    switch (this.reactionType) {
      case ReactionsEnum.BOUGHT:
        this.clickedColor = 'green';
        break;
      case ReactionsEnum.HATED:
        this.clickedColor = 'saddlebrown';
        break;
      case ReactionsEnum.INTERESTED:
        this.clickedColor = 'blue';
        break;
      case ReactionsEnum.LOVED:
        this.clickedColor = 'red';
        break;
    }

  }

  onClick(){
    this.clickFather.emit(this.reactionType);
  }

}
