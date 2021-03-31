import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReactionsStats} from '../../../../../../classes/reaction/reactions-stats';
import {ReactionsEnum} from '../../../../../../classes/reaction/reactions-enum';
import {UsersDialogComponent} from '../../../../../shared/reactions-dialog/users-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpService} from '../../../../../../services/http.service';
import {UserService} from '../../../../../../services/user.service';
import {User} from '../../../../../../classes/user/user';

@Component({
  selector: 'app-product-stats',
  templateUrl: './product-reactions.component.html',
  styleUrls: ['./product-reactions.component.css']
})
export class ProductReactionsComponent implements OnInit {

  @Input() reactionsStats: ReactionsStats;
  @Input() retailId: string;
  @Input() retailName: string;
  @Output() createReaction: EventEmitter<ReactionsEnum> = new EventEmitter();
  @Output() inactiveReaction: EventEmitter<ReactionsEnum> = new EventEmitter();
  lastReactionType: ReactionsEnum;
  numOfReactions: number;
  users: User[];

  constructor(public dialog: MatDialog, private httpService: HttpService, private userService: UserService) { }

  ngOnInit(): void {
    this.users = [];
    this.calcNumOfReactions();
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
        this.calcNumOfReactions();
        return;
      }
      this.reactionsStats[this.lastReactionType]--;
    }
    this.reactionsStats[reactionType]++;
    this.lastReactionType = reactionType;
    this.reactionsStats.active = true;
    this.reactionsStats.type = reactionType;
    this.createReaction.emit(reactionType);
    this.calcNumOfReactions();
  }

  private calcNumOfReactions(){
    this.numOfReactions = (+this.reactionsStats.loved) + (+this.reactionsStats.hated) + (+this.reactionsStats.bought) + (+this.reactionsStats.interested);
  }

  onClickNumOfReactions() {
    if (this.numOfReactions > 0) {
      this.httpService.getProductUsersAndReactions({
        userId: this.userService.getUser().id,
        retailId: this.retailId,
        retailName: this.retailName
      }).subscribe(users => {
        this.users = users;
        this.users.map(user => {
          user.id = user.userId;
        });
        const dialogRef = this.dialog.open(UsersDialogComponent, {
          width: '700px',
          panelClass: 'reactionsDialog',
          data: {header: 'Reactions', users: this.users}
        });

      });
    }
  }

}
