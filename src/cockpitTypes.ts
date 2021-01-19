export interface ICockpitCollections {
  title: string;
  link: string;
  _id?: string;
}

//eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICockpitRunwaysAndLookbooks extends ICockpitCollections {}

export interface ICockpitGood extends ICockpitCollections {
  description: string;
  previewImage: {
    path: string;
  };
  secondImage: {
    path: string;
  };
  collectionId: string;
  _modified: number;
}

export interface ICockpitCarousel extends ICockpitCollections {
  image: {
    path: string;
  };
}

export interface ICockpitCollectionsRaw extends ICockpitCollections {
  title_en: string;
  link_en: string;
  _mby: string;
  _by: string;
  _modified: number;
  _created: number;
  inMenu: true;
}

export interface ICockpitRunwaysAndLookbooksRaw
  extends ICockpitRunwaysAndLookbooks {
  _id: string;
  title_en: string;
  link_en: string;
  photos: {
    meta: { title: string; asset: string };
    path: string;
  }[];
  inMenu: boolean;
  _by: string;
  _mby: string;
  _modified: number;
}

export interface ICockpitGoodRaw extends ICockpitGood {
  title_en: string;
  link_en: string;
  description_en: string;
  otherImages: string;
  consist: string[];
  consist_en: string[];
  sizes: {
    _id: string;
    link: string;
    display: string;
  }[];
  collection: {
    _id: string;
    link: string;
    display: string;
  };
  subCollection: {
    _id: string;
    link: string;
    display: string;
  };
  _mby: string;
  _by: string;
  _created: number;
}

export interface ICockpitGoodsEntries {
  entries: ICockpitGoodRaw[];
}
