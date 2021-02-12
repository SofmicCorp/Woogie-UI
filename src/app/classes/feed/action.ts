import {User} from '../user/user';
import {Product} from '../product/product';
import DateTimeFormat = Intl.DateTimeFormat;
import {ActionType} from './actionType-enum';

export interface Action {
  score: number;
  Id: string;
  actionType: ActionType;
  details: User | Product;
  users: Map<string, string>;
  dirty: boolean;
  updatedAt: DateTimeFormat;
  createdAt: DateTimeFormat;
  actionId: string;
}
