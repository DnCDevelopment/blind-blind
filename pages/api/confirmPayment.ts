import { NextApiHandler } from 'next';
import { createHash } from 'crypto';

const confimPayment: NextApiHandler = async (req, res) => {
  const { data, signature } = req.body;

  const url = `${process.env.NEXT_PUBLIC_COCKPIT_URL}api/collections/save/checkouts`;
  if (data && signature) {
    const sign = createHash('sha1')
      .update(
        `${process.env.LIQPAY_PRIVATE_KEY}${data}${process.env.LIQPAY_PRIVATE_KEY}`
      )
      .digest('base64');
    if (sign !== signature)
      return res.status(401).send({ message: 'Invalid Signature' });

    const { order_id, status } = JSON.parse(
      Buffer.from(data, 'base64').toString('utf-8')
    );
    if (status === 'success')
      await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            _id: order_id,
            isPaid: true,
          },
        }),
      });

    return res.status(200).send({ message: 'ok' });
  } else return res.status(400).send({ message: 'Bad Request' });
};
export default confimPayment;
