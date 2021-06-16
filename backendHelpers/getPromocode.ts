import { ICockpitPromocode } from '../src/cockpitTypes';
import { getCockpitCollection } from '../src/utils/getCockpitData';

const getPromocode = async (promocode: string) => {
  const cockpitPromocodesall = await getCockpitCollection('Promocodes');
  console.log(cockpitPromocodesall);
  const cockpitPromocodes = await getCockpitCollection(
    'Promocodes',
    'filter[code]=' + promocode
  );

  return cockpitPromocodes.entries.map(
    ({ code, discount, inPercent }: ICockpitPromocode) => {
      return {
        code,
        discount,
        inPercent,
      };
    }
  );
};

export default getPromocode;
