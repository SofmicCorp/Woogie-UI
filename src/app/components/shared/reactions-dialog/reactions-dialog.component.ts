import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../classes/user/user';

@Component({
  selector: 'app-reactions-dialog',
  templateUrl: './reactions-dialog.component.html',
  styleUrls: ['./reactions-dialog.component.css']
})
export class ReactionsDialogComponent {
  constructor(public dialogRef: MatDialogRef<ReactionsDialogComponent>, @Inject(MAT_DIALOG_DATA) public users: User[]) {}



}
