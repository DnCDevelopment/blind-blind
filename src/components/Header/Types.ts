export interface IMobileMenuProps {
  close: () => void;
}

export interface ISublistProps {
  data: {
    title: string;
    link?: string;
  }[];
}
