export interface ICockpitCollections {
  title: string;
  link: string;
  description?: string;
  _id?: string;
}

interface IPhoto {
  meta: { title: string; asset: string };
  path: string;
}

export interface ICockpitRunwaysAndLookbooks extends ICockpitCollections {
  photos: IPhoto[];
  videoLink?: {
    value: string;
  }[];
}

export interface ICockpitGoods extends ICockpitCollections {
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
  description_en: string;
  _mby: string;
  _by: string;
  _modified: number;
  _created: number;
  inMenu: boolean;
}

export interface ICockpitRunwaysAndLookbooksRaw
  extends ICockpitRunwaysAndLookbooks {
  _id: string;
  title_en: string;
  description_en: string;
  link_en: string;
  photos: IPhoto[];
  _by: string;
  _mby: string;
  _modified: number;
  inMenu: boolean;
}

export interface ICockpitPages {
  title: string;
  title_en: string;
  link: string;
  link_en: string;
  content: string;
  content_en: string;
  seoDescription: string;
  seoDescription_en: string;
}

export interface ICockpitGoodsRaw extends ICockpitGoods {
  title_en: string;
  link_en: string;
  description_en: string;
  otherImages: string | { path: string }[];
  consist: string[];
  consist_en: string[];
  sizes:
    | {
        _id: string;
        link: string;
        display: string;
      }[]
    | ICockpitSize[];
  collection: {
    _id: string;
    link: string;
    link_en: string;
    title: string;
    title_en: string;
  };
  subCollection: {
    _id: string;
    link: string;
    link_en: string;
    title: string;
    title_en: string;
  };
  _mby: string;
  _by: string;
  _created: number;
  price: string;
  stockPrice: string | null;
  isExclusive: boolean;
}

export interface ICockpitGoodsEntries {
  entries: ICockpitGoodsRaw[];
  total: number;
}

export interface ICockpitSubCollectionRaw {
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  link: string;
  link_en: string;
  image: {
    path: string;
  };
  collection: {
    _id: string;
    link: string;
    link_en: string;
    title: string;
    title_en: string;
  };
  _mby: string;
  _by: string;
  _modified: number;
  _created: number;
  _id: string;
}

export interface ICockpitSize {
  size: {
    size: string;
  };
}

export interface ICockpitPromocode {
  id?: string;
  code: string;
  discount: string;
  inPercent: boolean;
}

export interface ICockpitCelebrity {
  proffesion: string;
  name: string;
  photo: IPhoto;
}

export interface ICockpitCelebrityRaw extends ICockpitCelebrity {
  name_en: string;
  proffesion_en: string;
}

export interface ICockpitContacts {
  email: string;
  phone: string;
}

export interface ICockpitSalesPlace {
  city: string;
  address: string;
  email: string;
  phone: string;
  picture: IPhoto;
}

export interface ICockpitSalesPlaceRow extends ICockpitSalesPlace {
  city_en: string;
  address_en: string;
}

export interface IBotUser {
  chatId: string;
  nickname: string;
}
