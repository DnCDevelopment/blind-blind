import { NextApiHandler } from 'next';
import { setTimeout } from 'timers';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { getCockpitCollection } from '../../src/utils/getCockpitData';
import { ICockpitGoodsRaw } from '../../src/cockpitTypes';
import getMoySkladData from '../../src/utils/getMoySkladData';
import { IMoySkladGoodData } from '../../src/moySkladTypes';
import xml from 'xml';

const priceFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'decimal',
  useGrouping: false,
});

const googleFeed: NextApiHandler = async (_req, res) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const servePath = process.cwd() + '/public/xml/';
  const goodsResponse = await getCockpitCollection('Goods');
  const goods: ICockpitGoodsRaw[] = goodsResponse.entries;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  if (!existsSync(servePath)) mkdirSync(servePath);

  const goodsData = await Promise.all(
    goods.map(
      async (
        {
          _id,
          title,
          title_en,
          description,
          description_en,
          link,
          previewImage: { path: previewImagePath },
          secondImage: { path: secondImagePath },
          collection,
          price,
          stockPrice,
          isExclusive,
        },
        idx
      ) => {
        await delay(67 * idx);
        const moyskladData = await getMoySkladData<IMoySkladGoodData>(
          `remap/1.2/entity/variant?filter=code~=${link.replace('/', '')}`
        );
        const availability = isExclusive
          ? 'backorder'
          : !!moyskladData?.rows?.length || false
          ? 'in_stock'
          : 'out_of_stock';

        const item_ru = [
          { 'g:id': _id },
          { 'g:title': title },
          { 'g:description': description },
          { 'g:link': encodeURI(`${baseUrl}/goods${link}`) },
          {
            'g:image_link': encodeURI(
              `${process.env.NEXT_PUBLIC_COCKPIT_URL}${previewImagePath}`
            ),
          },
          {
            'g:additional_image_link': encodeURI(
              `${process.env.NEXT_PUBLIC_COCKPIT_URL}${secondImagePath}`
            ),
          },
          { 'g:brand': 'BLIND' },
          { 'g:availability': availability },
          { 'g:price': `${priceFormat.format(+price)} UAH` },
        ];

        const item_en = [
          { 'g:title': title_en },
          { 'g:description': description_en },
          { 'g:link': encodeURI(`${baseUrl}/goods${link}`) },
          {
            'g:image_link': encodeURI(
              `${process.env.NEXT_PUBLIC_COCKPIT_URL}${previewImagePath}`
            ),
          },
          {
            'g:additional_image_link': encodeURI(
              `${process.env.NEXT_PUBLIC_COCKPIT_URL}${secondImagePath}`
            ),
          },
          { 'g:brand': 'BLIND' },
          { 'g:availability': availability },
          { 'g:price': `${priceFormat.format(+price)} UAH` },
        ];
        if (collection) {
          Object.defineProperty(item_ru, 'g:product_type', {
            value: `${collection}`,
          });
          Object.defineProperty(item_en, 'g:product_type', {
            value: `${collection}`,
          });
        }
        if (!isNaN(+(stockPrice?.trim() || NaN))) {
          Object.defineProperty(item_ru, 'g:sale_price', {
            value: `${stockPrice} UAH`,
          });
          Object.defineProperty(item_en, 'g:sale_price', {
            value: `${stockPrice} UAH`,
          });
        }
        return { item_ru, item_en };
      }
    )
  );

  const xml_ru = {
    rss: [
      { _attr: { 'xmlns:g': 'http://base.google.com/ns/1.0', version: '2.0' } },
      {
        title: 'BLIND-BLIND',
      },
      { link: baseUrl },
      { description: 'BLIND-BLIND product feed' },
      { channel: goodsData.map(({ item_ru }) => ({ item: item_ru })) },
    ],
  };

  const xml_en = {
    rss: [
      { _attr: { 'xmlns:g': 'http://base.google.com/ns/1.0', version: '2.0' } },
      {
        title: 'BLIND-BLIND',
      },
      { link: baseUrl },
      { description: 'BLIND-BLIND product feed' },
      { channel: goodsData.map(({ item_en }) => ({ item: item_en })) },
    ],
  };

  await Promise.all([
    writeFile(servePath + 'google_ru.xml', xml(xml_ru)),
    writeFile(servePath + 'google_en.xml', xml(xml_en)),
  ]);

  res.send(200);
};

export default googleFeed;
