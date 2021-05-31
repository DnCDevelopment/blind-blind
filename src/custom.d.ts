declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare const fbq: (
  arg0: string,
  arg1: string,
  arg2?: {
    value?: number;
    currency?: string;
    content_ids: string | string[];
    content_type: string;
  }
) => void;
