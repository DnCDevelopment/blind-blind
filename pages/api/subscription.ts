import { NextApiHandler } from 'next';
import { Telegram } from 'telegraf';
import { IBotUser } from '../../src/cockpitTypes';

const bot = new Telegram(process.env.NEXT_PUBLIC_TELEGRAM_KEY as string);
const sendToBot = async (
  users: IBotUser[],
  firstName: string,
  email: string,
  phone: string,
  dob: string
) => {
  const message =
    `Имя: ${firstName}\n` +
    `Почта: ${email}\n` +
    `Телефон: ${phone}\n` +
    `Дата Рождения: ${dob}\n`;
  const messages = users.map(({ chatId }) => bot.sendMessage(+chatId, message));

  await Promise.allSettled(messages).catch((err) => console.log(err));
};

const subscription: NextApiHandler = async (req, res) => {
  const { firstName, email, phone, dob } = req.body;
  const check = firstName && email && phone && dob;
  if (!check) return res.status(400).send({ message: 'Bad Request' });
  const url = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/collections/save/Subscriptions`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          firstName,
          email,
          phone,
          dob,
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

    sendToBot(entries, firstName, email, phone, dob);

    if (response.status === 200) {
      return res.status(200).send({ message: 'ok' });
    }
  } catch {
    return res.status(400).send({ message: 'Bad Request' });
  }
};
export default subscription;
