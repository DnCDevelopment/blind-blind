export interface ICockpitCollections {
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
