import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const addNewUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const isTelegramMessage =
    req.body &&
    req.body.message &&
    req.body.message.chat &&
    req.body.message.chat.id;
  if (isTelegramMessage) {
    const chat_id = req.body.message.chat.id;
    const message = req.body.message.text;
    const from = req.body.message.from;
    if (message === '/start') {
      return res.status(200).send({
        method: 'sendMessage',
        chat_id,
        text: 'Добро пожаловать! Введите команду-пароль',
      });
    }

    const url = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/collections/save/BotUsers`;

    if (message === '/blind_orders') {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              chatId: `${chat_id}`,
              nickname: `${from?.first_name || ''} ${from?.last_name || ''}`,
            },
          }),
        });

        if (!response.ok) {
          return res.status(200).send({
            method: 'sendMessage',
            chat_id,
            text: `Что то пошло не так при добавлении этого чата ${chat_id}`,
          });
        }

        return res.status(200).send({
          method: 'sendMessage',
          chat_id,
          text: 'Вы успешно авторизованы',
        });
      } catch (err) {
        return res.status(200).send({
          method: 'sendMessage',
          chat_id,
          text: `Что то пошло не так при добавлении этого чата ${chat_id}`,
        });
      }
    }
  }
};

const createBotUser: NextApiHandler = async (req, res) => addNewUser(req, res);

export default createBotUser;
