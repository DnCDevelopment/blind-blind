import { ICockpitCollections, ICockpitGood } from '../../cockpitTypes';

export interface IMainCollectionsSamplesProps {
  goods: ICockpitGood[];
}

export interface ICollectionSamplesProps extends ICockpitCollections {
  samples: ICockpitGood[];
}
