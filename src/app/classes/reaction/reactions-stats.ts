import {ReactionsEnum} from './reactions-enum';

export interface ReactionsStats {
  loved: number;
  hated: number;
  interested: number;
  bought: number;
  isReacted: boolean;
  type: ReactionsEnum;
}
