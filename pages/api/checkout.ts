import { NextApiHandler } from 'next';
import { createHash } from 'crypto';
import { FORM } from '../../src/constants/form';

const checkout: NextApiHandler = async (req, res) => {
  const {
    name,
    surname,
    address,
    phone,
    deliveryService,
    paymentType,
    locale,
    items = [],
    totalSum,
  } = req.body;
  const check =
    locale &&
    name &&
    surname &&
    address &&
    phone &&
    deliveryService &&
    paymentType &&
    items.length &&
    totalSum;
  if (!check) res.status(400).send({ message: 'Bad Request' });

  const url = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/collections/save/checkouts`;
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        ...req.body,
        items: items.map((item: string) => ({ _id: item, link: 'Goods' })),
        isPaid: false,
      },
    }),
  });
  const { _id } = await response.json();
  if (paymentType === FORM[locale as 'ru' | 'en'].paymentOnline) {
    const data = {
      version: 3,
      public_key: process.env.NEXT_PUBLIC_LIQPAY_KEY,
      action: 'pay',
      amount: totalSum,
      currency: 'UAH',
      order_id: _id,
      description: 'Покупка в магазине BLIND-BLIND',
      result_url: `${process.env.NEXT_PUBLIC_HOME_URL}thank-you`,
      server_url: `${process.env.NEXT_PUBLIC_HOME_URL}api/confirmPayment`,
    };

    const encodedData = Buffer.from(JSON.stringify(data)).toString('base64');
    const signature = createHash('sha1')
      .update(
        `${process.env.LIQPAY_PRIVATE_KEY}${encodedData}${process.env.LIQPAY_PRIVATE_KEY}`
      )
      .digest('base64');
    return res.status(200).send({ data: encodedData, signature });
  }
  return res.status(200).send({ message: 'ok' });
};

export default checkout;
