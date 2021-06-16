import { NextApiHandler } from 'next';
import { Telegram } from 'telegraf';
import { IBotUser } from '../../src/cockpitTypes';
import sendGrid from '../../backendHelpers/sendGrid';

const bot = new Telegram(process.env.NEXT_PUBLIC_TELEGRAM_KEY as string);

const sendEmail = (
  phone: string,
  cookies: { [key: string]: string },
  ip: string
) => {
  const emailBody = `
    Телефон: ${phone.replace('+', '')} \n
    Utm_data: ${cookies.utm_data || 'none'} \n
    Utm_source: ${cookies.utm_source || 'none'} \n
    Utm_medium: ${cookies.utm_medium || 'none'} \n
    Utm_campaign: ${cookies.utm_campaign || 'none'} \n
    Utm_term: ${cookies.utm_term || 'none'} \n
    Utm_content: ${cookies.utm_content || 'none'} \n
    User_ip: ${ip || 'none'} \n
    Location: ${cookies.user_geo || 'none'} \n
    REF URL: ${cookies.ref_url || 'none'} \n
    GA: ${cookies._ga || 'none'} \n
  `;

  const msg = {
    to: process.env.EMAIL_TO as string,
    from: process.env.EMAIL_FROM as string,
    subject: 'Обратная связь',
    text: emailBody,
  };

  sendGrid.send(msg).then(console.log, (error) => {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  });
};

const request: NextApiHandler = async (req, res) => {
  const { phone } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

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

    sendEmail(phone, req.cookies, ip as string);

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
