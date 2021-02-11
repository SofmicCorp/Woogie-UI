import DateTimeFormat = Intl.DateTimeFormat;
import {FollowStatusEnum} from './follow-status-enum';

export interface User {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string;
  status: FollowStatusEnum;
  mutualFollowingUsers: [string];
  createdAt: DateTimeFormat;
  updatedAt: DateTimeFormat;
}
