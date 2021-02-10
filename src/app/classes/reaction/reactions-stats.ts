import {ReactionsEnum} from './reactions-enum';

export interface ReactionsStats {
  loved: number;
  hated: number;
  interested: number;
  bought: number;
  retailId: string;
  retailName: string;
  isReacted: boolean;
  type: ReactionsEnum;
}
