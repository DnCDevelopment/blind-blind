import useSWR from 'swr';

export const useCockpit = <T>(type: string, name: string, params?: string) => {
  if (!type || !name) {
    throw new Error('type/name is required');
  }

  const fetcher = (url: string): Promise<T> =>
    fetch(url).then((res) => res.json());
  const url = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/${type}/get/${name}?token=${process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`;
  const urlWithParams = params ? url + '&' + params : url;
  const { data, error } = useSWR(urlWithParams, fetcher, { suspense: true });

  return { data, error };
};

export default useCockpit;
