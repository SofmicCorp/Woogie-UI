import {FollowStatusEnum} from '../user/follow-status-enum';

export interface Notification {
  id: 1;
  receiverId: 2;
  senderId: 1;
  senderFullname: string;
  senderImage: string;
  type: FollowStatusEnum;
  dirty: true;
}
