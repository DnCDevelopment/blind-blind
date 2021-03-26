import { useContext } from 'react';

import CollectionSamples from './CollectionSamples';

import { indexContext } from '../../context/cockpitContext';

import { ICockpitGoods } from '../../cockpitTypes';
import { IIndexContext } from '../../context/Types';
import { IMainCollectionsSamplesProps } from './Types';

const MainCollectionsSamples: React.FC<IMainCollectionsSamplesProps> = ({
  goods,
}) => {
  const { collectionsData } = useContext(indexContext) as IIndexContext;

  const allSamples = goods.reduce(
    (samples: { [key: string]: ICockpitGoods[] }, good: ICockpitGoods) => {
      (samples[good.collectionId] = samples[good.collectionId] || []).push(
        good
      );
      return samples;
    },
    {}
  );

  const collectionsSamples = collectionsData
    .map(({ title, link, _id }) => {
      return {
        title,
        link,
        samples: allSamples[_id as string],
      };
    })
    .filter(({ samples }) => samples)
    .reverse()
    .slice(0, 3);

  return (
    <div className="main-page-collections-samples">
      {collectionsSamples.map(({ title, link, samples }) => (
        <CollectionSamples
          key={title}
          title={title}
          link={link}
          samples={samples.slice(0, 3)}
        />
      ))}
    </div>
  );
};

export default MainCollectionsSamples;
