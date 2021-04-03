export interface IBreadcrumb {
  title: string;
  link: string;
}

export interface ISeoProps {
  breadcrumbs: IBreadcrumb[];
  description: string;
  lang: 'ru' | 'en';
  path: string;
  title: string;
  product?: {
    id: string;
    name: string;
    image: string;
    price: string;
    collection: string;
  };
}
