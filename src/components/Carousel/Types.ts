export interface ICarousel {
  children: React.ReactNode[];
  infinity?: boolean;
  buttonPrev?: React.ReactNode;
  buttonNext?: React.ReactNode;
  withDots?: boolean;
  withRange?: boolean;
  callback?: (arg0: number) => void;
}
