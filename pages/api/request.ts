import { NextApiHandler } from 'next';

const request: NextApiHandler = async (req, res) => {
  const { phone } = req.body;

  if (!phone) res.status(400).send({ message: 'Bad Request' });

  const url = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/collections/save/Request`;

  try {
    const response = await fetch(url, {
      method: 'post',
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

    if (response.status === 200) {
      return res.status(200).send({ message: 'ok' });
    }
  } catch {
    return res.status(400).send({ message: 'Bad Request' });
  }
};

export default request;
