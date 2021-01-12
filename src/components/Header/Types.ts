export interface IMobileMenuProps {
  close: () => void;
}

export interface ISublistProps {
  data: ISublist[];
}

interface ISublist {
  title: string;
  link: string;
  subsublist?: ISublist[];
}
