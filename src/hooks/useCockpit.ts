import useSWR from 'swr';

const absoluteUrl = (url: string): string => {
  const isServer = typeof window !== 'undefined';

  const server = isServer
    ? window.location.origin + '/'
    : process.env.NEXT_PUBLIC_COCKPIT_URL;

  return server + url;
};

export const useCockpit = <T>(withSuspense: boolean, params?: string) => {
  const fetcher = (url: string): Promise<T> => {
    return fetch(url).then((res) => res.json());
  };

  const url = 'api/getGoods';
  const urlWithParams = params ? url + '?' + params : url;
  const { data, error } = useSWR(absoluteUrl(urlWithParams), fetcher, {
    suspense: withSuspense,
  });

  if (!error) {
    return { data, error };
  }

  return { data: null, error };
};

export default useCockpit;
