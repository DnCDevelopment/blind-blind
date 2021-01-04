import useSWR from 'swr';

export const useCockpit = (type: string, name: string) => {
  if (!type || !name) {
    throw new Error('type/name is required');
  }

  const fetcher = (url: string): Promise<Response> =>
    fetch(url).then((res) => res.json());
  const url = `http://blind-blind-content.dncapp.website/api/${type}/get/${name}?token=6b79107e7972a67976b08ef5c082c0`;

  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};

export default useCockpit;
