import {FollowStatusEnum} from '../user/follow-status-enum';

export interface Notification {
  id: string;
  receiverId: string;
  senderId: string;
  senderFullname: string;
  senderImage: string;
  type: FollowStatusEnum;
  connectionStatus: FollowStatusEnum;
  dirty: true;
}
