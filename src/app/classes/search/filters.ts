import {SortEnum} from './sort-enum';
import {ConditionEnum} from './condition-enum';

export interface Filters {
  sort: SortEnum;
  conditions: ConditionEnum;
  freeShipping: boolean;
  price: string;
}
