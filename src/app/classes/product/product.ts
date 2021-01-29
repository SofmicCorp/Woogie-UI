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

  // constructor(retailId, retailName, productName, image, thumbnailImage, priceValue,
  //             priceCurrency, itemHref, shippingCost, shippingCurrency, shippingCostType, totalPrice,
  //             apiItem, additionalImages, adultOnly){
  //   this.retailId = retailId;
  //   this.retailName = retailName;
  //   this.productName = productName;
  //   this.image = image;
  //   this.thumbnailImage = thumbnailImage;
  //   this.priceValue = priceValue;
  //   this.priceCurrency = priceCurrency;
  //   this.itemHref = itemHref;
  //   this.shippingCost = shippingCost;
  //   this.shippingCurrency = shippingCurrency;
  //   this.shippingCostType = shippingCostType;
  //   this.totalPrice = totalPrice;
  //   this.apiItem = apiItem;
  //   this.additionalImages = additionalImages;
  //   this.adultOnly = adultOnly;
  // }

}
