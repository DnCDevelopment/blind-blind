import useSWR from 'swr';

const absoluteUrl = (url: string): string => {
  const dev = process.env.NODE_ENV !== 'production';

  const server = dev
    ? 'http://localhost:3000/'
    : process.env.NEXT_PUBLIC_HOST_NAME;

  return server + url;
};

export const useCockpit = <T>(type: string, name: string, params?: string) => {
  if (!type || !name) {
    throw new Error('type/name is required');
  }

  const fetcher = (url: string): Promise<T> =>
    fetch(url).then((res) => res.json());
  const url = 'api/getGoods';
  const urlWithParams = params ? url + '?' + params : url;
  const { data, error } = useSWR(absoluteUrl(urlWithParams), fetcher, {
    suspense: true,
  });

  if (!error) {
    return { data, error };
  }

  return { data: null, error };
};

export default useCockpit;
