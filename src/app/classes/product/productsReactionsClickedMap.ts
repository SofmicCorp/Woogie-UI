export interface ProductsReactionsClickedMapInner {
  clicked: boolean;
  reactionCount: number;
}

export interface ProductsReactionsClickedMap {
  loved: ProductsReactionsClickedMapInner;
  hated: ProductsReactionsClickedMapInner;
  interested: ProductsReactionsClickedMapInner;
  bought: ProductsReactionsClickedMapInner;
}
