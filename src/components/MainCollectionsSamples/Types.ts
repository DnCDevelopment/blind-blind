import { ICockpitCollections, ICockpitGoods } from '../../cockpitTypes';

export interface IMainCollectionsSamplesProps {
  goods: ICockpitGoods[];
}

export interface ICollectionSamplesProps extends ICockpitCollections {
  samples: ICockpitGoods[];
}
