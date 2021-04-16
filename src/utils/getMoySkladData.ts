import { IMoySkladRawData } from '../moySkladTypes';

const url = process.env.NEXT_PUBLIC_MOYSKLAD_API as string;
const token = process.env.NEXT_PUBLIC_MOYSKLAD_TOKEN as string;

const getMoySkladData = async <T>(
  query: string
): Promise<IMoySkladRawData<T>> => {
  const data = await fetch(`${url}${query}`, {
    headers: {
      Authorization: token,
    },
  });
  return await data.json();
};

export default getMoySkladData;
