import type { NextApiRequest, NextApiResponse } from 'next';
import { ICockpitPromocode } from '../../src/cockpitTypes';
import { getCockpitCollection } from '../../src/utils/getCockpitData';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cockpitPromocodes = await getCockpitCollection(
    'Promocodes',
    'filter[code]=' + req.body
  );

  const promocodes = cockpitPromocodes.entries.map(
    ({ code, discount, inPercent }: ICockpitPromocode) => {
      return {
        code,
        discount,
        inPercent,
      };
    }
  );

  res.status(200).json({ discount: promocodes.length ? promocodes[0] : null });
};
