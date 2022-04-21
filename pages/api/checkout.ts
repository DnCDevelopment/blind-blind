import { NextApiHandler } from 'next';
import { createHash } from 'crypto';
import { Telegram } from 'telegraf';
import { IBotUser } from '../../src/cockpitTypes';

import { FORM } from '../../src/constants/form';
import sendGrid from '../../backendHelpers/sendGrid';
import getPromocode from '../../backendHelpers/getPromocode';
import {
  ICartGoodsItemProps,
  ICartVoucherItemProps,
} from '../../src/components/Cart/Types';

interface ICart {
  certeficatePrice: string[];
  receiverEmail: string[];
  receiverName: string[];
  message: string[];
  items: { _id: string; link: string }[];
  sizes: string[];
  goods: { name: string; size: string }[];
}

const bot = new Telegram(process.env.NEXT_PUBLIC_TELEGRAM_KEY as string);

const getGoodsMessage = ({ goods }: ICart) =>
  goods.reduce(
    (acc, { name, size }) => acc + `Название: ${name}, Размер: ${size}; | `,
    ''
  );

const sendEmail = async (
  name: string,
  surname: string,
  email: string,
  country: string,
  city: string,
  phone: string,
  paymentType: string,
  deliveryType: string,
  deliveryCost: string,
  warehouse: string,
  street: string,
  house: string,
  flat: string,
  cart: ICart,
  totalSum: string,
  promoCode: string,
  cookies: { [key: string]: string },
  ip: string
) => {
  const [promoCodeValues] = await getPromocode(promoCode);

  const emailBody = `
    Товары: ${getGoodsMessage(cart)} \n
    Сумма: ${totalSum} \n
    Промокод: ${promoCode || 'none'} \n
    Скидка: ${
      promoCodeValues?.discount ? promoCodeValues?.discount + '%' : 'none'
    } \n
    Тип оплаты: ${paymentType} \n
    Cтрана доставки: ${country} \n
    Город доставки: ${city} \n
    Тип доставки: ${deliveryType} \n
    Стоимость Доставки: ${deliveryCost} \n
    Отделение НП: ${warehouse || 'none'} \n
    Улица: ${street || 'none'} \n
    Дом: ${house || 'none'} \n
    Квартира: ${flat || 'none'} \n
    Имя: ${name} \n
    Фамилия: ${surname} \n
    Телефон: ${phone.replace('+', '')} \n
    Емеил: ${email} \n
    Utm_data: ${cookies.utm_data || 'none'} \n
    Utm_source: ${cookies.utm_source || 'none'} \n
    Utm_medium: ${cookies.utm_medium || 'none'} \n
    Utm_campaign: ${cookies.utm_campaign || 'none'} \n
    Utm_term: ${cookies.utm_term || 'none'} \n
    Utm_content: ${cookies.utm_content || 'none'} \n
    User_ip: ${ip || 'none'} \n
    Location: ${cookies.user_geo || 'none'} \n
    REF URL: ${cookies.ref_url || 'organic'} \n
    GA: ${cookies._ga || 'none'} \n
  `;

  const msg = {
    to: process.env.EMAIL_TO as string,
    from: process.env.EMAIL_FROM as string,
    subject: 'Заказ',
    text: emailBody,
  };

  sendGrid.send(msg).then(console.log, (error) => {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  });
};
const sendToBot = async (
  users: IBotUser[],
  name: string,
  surname: string,
  email: string,
  country: string,
  city: string,
  phone: string,
  paymentType: string,
  deliveryType: string,
  warehouse: string,
  street: string,
  house: string,
  flat: string,
  locale: string,
  currency: string,
  cart: ICart,
  totalSum: string,
  deliveryCost: string
) => {
  try {
    const certeficatesMessage = cart.certeficatePrice.reduce(
      (acc, price, index) =>
        acc +
        `Цена: ${price}${currency}, Почта получателя: ${cart.receiverEmail[index]}, Имя получателя: ${cart.receiverName[index]}, Сообщение: ${cart.message[index]} | `,
      ''
    );

    const goodsMessage = getGoodsMessage(cart);
    const message =
      `Имя: ${name}\n` +
      `Фамилия: ${surname}\n` +
      `Почта: ${email}\n` +
      `Cтрана: ${country}\n` +
      `Город: ${city}\n` +
      `Телефон: ${phone}\n` +
      `Тип оплаты: ${paymentType}\n` +
      `Тип Доставки: ${deliveryType}\n` +
      `Стоимость Доставки: ${deliveryCost}\n` +
      `Отделение НП: ${warehouse}\n` +
      `Улица: ${street}\n` +
      `Дом: ${house}\n` +
      `Квартира: ${flat}\n` +
      `Язык: ${locale}\n` +
      `Cумма: ${totalSum}${currency}\n` +
      `Сертификаты: ${
        cart.certeficatePrice.length ? certeficatesMessage : ''
      }\n` +
      `Товары: ${cart.goods.length ? goodsMessage : ''}\n`;
    const messages = users.map(({ chatId }) =>
      bot.sendMessage(+chatId, message)
    );

    await Promise.allSettled(messages).catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

const checkout: NextApiHandler = async (req, res) => {
  try {
    const ip =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const {
      name,
      surname,
      email,
      country,
      city,
      phone,
      paymentType,
      deliveryMethod,
      locale,
      currency,
      items = [],
      totalSum,
      coupon,
      warehouse,
      street,
      house,
      flat,
      deliveryCost,
    } = req.body;
    const check: boolean =
      locale &&
      name &&
      email &&
      surname &&
      country &&
      city &&
      phone &&
      paymentType &&
      deliveryMethod &&
      items.length &&
      currency &&
      deliveryCost !== undefined &&
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
            receiverName: [...acc.receiverName, item.receiverName],
            message: [...acc.message, item.message],
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
        receiverName: [],
        goods: [],
        message: [],
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
          receiverName: cart.receiverName,
          message: cart.message,
          isPaid: false,
        },
      }),
    });

    await sendToBot(
      entries,
      name,
      surname,
      email,
      country,
      city,
      phone,
      paymentType,
      deliveryMethod,
      warehouse,
      street,
      house,
      flat,
      locale,
      currency,
      cart,
      totalSum,
      deliveryCost
    );

    await sendEmail(
      name,
      surname,
      email,
      country,
      city,
      phone,
      paymentType,
      deliveryMethod,
      deliveryCost,
      warehouse,
      street,
      house,
      flat,
      cart,
      totalSum,
      coupon,
      req.cookies,
      ip as string
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
  } catch (error) {
    console.log(error);
  }
};

export default checkout;
