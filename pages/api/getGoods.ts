import type { NextApiRequest, NextApiResponse } from 'next';
import { getCockpitCollection } from '../../src/utils/getCockpitData';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cockpitGoods = await getCockpitCollection(
    'Goods',
    'filter[collection._id]=' + req.query['filter[collection._id]']
  );

  res.status(200).json(cockpitGoods);
};
