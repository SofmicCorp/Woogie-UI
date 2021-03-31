import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../classes/user/user';

@Component({
  selector: 'app-reactions-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css']
})
export class UsersDialogComponent {
  constructor(public dialogRef: MatDialogRef<UsersDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {header: string, users: User[]}) {}
}
