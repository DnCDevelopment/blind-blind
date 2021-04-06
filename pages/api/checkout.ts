import { NextApiHandler } from 'next';
import { createHash } from 'crypto';
import { Telegram } from 'telegraf';

import { IBotUser } from '../../src/cockpitTypes';

import { FORM } from '../../src/constants/form';
import {
  ICartGoodsItemProps,
  ICartVoucherItemProps,
} from '../../src/components/Cart/Types';

interface ICart {
  certeficatePrice: string[];
  receiverEmail: string[];
  theme: string[];
  receiverName: string[];
  items: { _id: string; link: string }[];
  sizes: string[];
  goods: { name: string; size: string }[];
}

const bot = new Telegram(process.env.NEXT_PUBLIC_TELEGRAM_KEY as string);

const sendToBot = (
  users: IBotUser[],
  name: string,
  surname: string,
  email: string,
  country: string,
  city: string,
  phone: string,
  paymentType: string,
  locale: string,
  currency: string,
  cart: ICart,
  totalSum: string
) => {
  const certeficatesMessage = cart.certeficatePrice.reduce(
    (acc, price, index) =>
      acc +
      `Цена: ${price}${currency}, Почта получателя: ${cart.receiverEmail[index]}, Имя получателя: ${cart.receiverName[index]}; | `,
    ''
  );

  const goodsMessage = cart.goods.reduce(
    (acc, { name, size }) => acc + `Название: ${name}, Размер: ${size}; | `,
    ''
  );
  const message =
    `Имя: ${name}\n` +
    `Фамилия: ${surname}\n` +
    `Почта: ${email}\n` +
    `Cтрана: ${country}\n` +
    `Город: ${city}\n` +
    `Телефон: ${phone}\n` +
    `Тип оплаты: ${paymentType}\n` +
    `Язык: ${locale}\n` +
    `Cумма: ${totalSum}${currency}\n` +
    `Сертификаты: ${
      cart.certeficatePrice.length ? certeficatesMessage : ''
    }\n` +
    `Товары: ${cart.goods.length ? goodsMessage : ''}\n`;

  users.forEach(({ chatId }) => {
    bot.sendMessage(+chatId, message);
  });
};

const checkout: NextApiHandler = async (req, res) => {
  const {
    name,
    surname,
    email,
    country,
    city,
    phone,
    paymentType,
    locale,
    currency,
    items = [],
    totalSum,
  } = req.body;
  const check =
    locale &&
    name &&
    email &&
    surname &&
    country &&
    city &&
    phone &&
    paymentType &&
    items.length &&
    currency &&
    totalSum;
  if (!check) return res.status(400).send({ message: 'Bad Request' });

  const url = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/collections/save/checkouts`;
  const sendOrderUsersUrl = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/collections/get/BotUsers`;
  const usersResponse = await fetch(sendOrderUsersUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`,
    },
  });

  const { entries } = await usersResponse.json();

  const cart: ICart = items.reduce(
    (acc: ICart, item: ICartVoucherItemProps & ICartGoodsItemProps) => {
      if (item.id?.startsWith('voucher')) {
        return {
          ...acc,
          certeficatePrice: [...acc.certeficatePrice, item.price],
          receiverEmail: [...acc.receiverEmail, item.receiverEmail],
          theme: [...acc.theme, item.theme],
          receiverName: [...acc.receiverName, item.receiverName],
        };
      }

      return {
        ...acc,
        items: [...acc.items, { _id: item.id, link: 'Goods' }],
        sizes: [...acc.sizes, item.details],
        goods: [...acc.goods, { name: item.title, size: item.details }],
      };
    },
    {
      items: [],
      sizes: [],
      certeficatePrice: [],
      receiverEmail: [],
      theme: [],
      receiverName: [],
      goods: [],
    }
  );

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        ...req.body,
        items: cart.items,
        sizes: cart.sizes,
        certeficatePrice: cart.certeficatePrice,
        receiverEmail: cart.receiverEmail,
        theme: cart.theme,
        receiverName: cart.receiverName,
        isPaid: false,
      },
    }),
  });

  sendToBot(
    entries,
    name,
    surname,
    email,
    country,
    city,
    phone,
    paymentType,
    locale,
    currency,
    cart,
    totalSum
  );

  const { _id } = await response.json();
  if (paymentType === FORM[locale as 'ru' | 'en'].paymentOnline) {
    const data = {
      version: 3,
      public_key: process.env.NEXT_PUBLIC_LIQPAY_KEY,
      action: 'pay',
      amount: totalSum,
      currency: currency,
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
