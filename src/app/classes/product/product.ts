import {ReactionsStats} from '../reaction/reactions-stats';

export interface Product {
  retailId: string;
  retailName: string;
  productName: string;
  image: string;
  thumbnailImage: string;
  priceValue: number;
  priceCurrency: string;
  itemHref: string;
  shippingCost: number;
  shippingCurrency: string;
  shippingCostType: string;
  totalPrice: number;
  apiItem: string;
  additionalImages: [string];
  adultOnly: boolean;
  reactions: ReactionsStats;
}
