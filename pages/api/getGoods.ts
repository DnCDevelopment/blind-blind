import type { NextApiRequest, NextApiResponse } from 'next';
import { getCockpitCollection } from '../../src/utils/getCockpitData';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const filters = Object.keys(req.query).filter(
    (param) => !param.startsWith('__next')
  );

  const requestFilters = filters.reduce(
    (requestFilters, param) => requestFilters + `${param}=${req.query[param]}`,
    ''
  );

  const cockpitGoods = await getCockpitCollection('Goods', requestFilters);

  res.status(200).json(cockpitGoods);
};
