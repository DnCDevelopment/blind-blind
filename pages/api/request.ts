import { NextApiHandler } from 'next';
import { Telegram } from 'telegraf';
import { IBotUser } from '../../src/cockpitTypes';

const bot = new Telegram(process.env.NEXT_PUBLIC_TELEGRAM_KEY as string);

const request: NextApiHandler = async (req, res) => {
  const { phone } = req.body;

  if (!phone) res.status(400).send({ message: 'Bad Request' });

  const url = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/collections/save/Request`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          phone,
        },
      }),
    });

    const sendOrderUsersUrl = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/collections/get/BotUsers`;
    const usersResponse = await fetch(sendOrderUsersUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`,
      },
    });

    const { entries }: { entries: IBotUser[] } = await usersResponse.json();

    entries.forEach(({ chatId }) => {
      bot.sendMessage(chatId, `Телефон:${phone}`);
    });

    if (response.status === 200) {
      return res.status(200).send({ message: 'ok' });
    }
  } catch {
    return res.status(400).send({ message: 'Bad Request' });
  }
};

export default request;
