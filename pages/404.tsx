import { NextPage } from 'next';
import NotFound from '../src/components/NotFound/NotFound';

const Page404: NextPage = () => {
  console.log("404")
  return <NotFound />;
};

export default Page404;
