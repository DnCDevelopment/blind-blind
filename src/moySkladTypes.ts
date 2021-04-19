export interface IMoySkladRawData<T> {
  rows: T[];
}

export interface IMoySkladGoodData {
  characteristics: {
    name: string;
    value: string;
  }[];
}
