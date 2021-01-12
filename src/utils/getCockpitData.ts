export const getCockpitCollection = async (collectionName: string) => {
  const url = process.env.NEXT_PUBLIC_COCKPIT_URL;
  const token = process.env.NEXT_PUBLIC_COCKPIT_TOKEN;

  const requestResult = await fetch(
    url + `api/collections/get/${collectionName}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const cockpitData = await requestResult.json();

  return cockpitData;
};
