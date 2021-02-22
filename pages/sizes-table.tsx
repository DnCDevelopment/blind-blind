import { NextPage } from 'next';
import SizesTable from '../src/components/SizesTable/SizesTable';

const SizesTablePage: NextPage = () => {
  return (
    <div className="voucher-page">
      <SizesTable />
    </div>
  );
};

export default SizesTablePage;
