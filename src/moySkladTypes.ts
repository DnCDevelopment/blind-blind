export interface IMoySkladRawData<T> {
  rows: T[];
}

export interface IMoySkladGoodData {
  id: string;
  characteristics: {
    name: string;
    value: string;
  }[];
}

export interface IMoySkladStockData {
  meta: {
    uuidHref: string;
  };
}
