export const updateGoodsInStock = async (id: string, value: boolean) => {
  const url = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/collections/save/Goods`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          _id: id,
          isOutOfStock: value,
        },
      }),
    });

    return response;
  } catch {
    throw new Error('bad request');
  }
};
