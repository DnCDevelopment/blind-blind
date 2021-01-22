const url = process.env.NEXT_PUBLIC_COCKPIT_URL;
const token = process.env.NEXT_PUBLIC_COCKPIT_TOKEN;

export const getCockpitCollection = async (
  collectionName: string,
  params?: string
) => {
  const requestResult = await fetch(
    url + `api/collections/get/${collectionName}?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const cockpitData = await requestResult.json();

  return cockpitData;
};

export const getCockpitCollections = async (collections: string[]) => {
  const collectionPromises = collections.map((collection) =>
    getCockpitCollection(collection)
  );
  return await Promise.all(collectionPromises);
};
