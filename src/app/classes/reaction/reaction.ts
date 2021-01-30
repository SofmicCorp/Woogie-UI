import {ReactionsEnum} from './reactions-enum';

export interface Reaction {
  id: string;
  type: ReactionsEnum;
  userId: string;
  active: boolean;
}
