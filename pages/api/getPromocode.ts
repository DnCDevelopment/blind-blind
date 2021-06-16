import type { NextApiRequest, NextApiResponse } from 'next';
import getPromocode from '../../backendHelpers/getPromocode';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const promocodes = await getPromocode(req.body);

  res.status(200).json({ discount: promocodes.length ? promocodes[0] : null });
};
