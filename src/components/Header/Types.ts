export interface IMobileMenuProps {
  close: () => void;
}

export interface ISublistProps {
  data: ISublist[];
  closeMenu: () => void;
}

interface ISublist {
  title: string;
  link: string;
  subsublist?: ISublist[];
}
