import DateTimeFormat = Intl.DateTimeFormat;
import {FollowStatusEnum} from './follow-status-enum';
import {ReactionsEnum} from '../reaction/reactions-enum';

export interface User {
  id: string; // can be user_id or just id
  userId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string;
  status: FollowStatusEnum;
  type: ReactionsEnum; // type of reaction
  updatedReaction: boolean;
  mutualFollowingUsers: [string];
  createdAt: DateTimeFormat;
  updatedAt: DateTimeFormat;
}
