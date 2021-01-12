export interface ICockpitCollections {
  title: string;
  link: string;
}

export interface ICockpitRunwaysAndLookbooks {
  title: string;
  link: string;
}

export interface ICockpitCollectionsRaw extends ICockpitCollections {
  title_en: string;
  link_en: string;
  _mby: string;
  _by: string;
  _modified: number;
  _created: number;
  _id: string;
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
