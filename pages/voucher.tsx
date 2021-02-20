import { NextPage } from 'next';
import Voucher from '../src/components/Voucher/Voucher';

const VoucherPage: NextPage = () => {
  return (
    <div className="voucher-page">
      <Voucher />
    </div>
  );
};

export default VoucherPage;
