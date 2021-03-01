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
    (samples: { [key: string]: ICockpitGoods[] }, x: ICockpitGoods) => {
      (samples[x.collectionId] = samples[x.collectionId] || []).push(x);
      return samples;
    },
    {}
  );

  const collectionsSamples = collectionsData.map(({ title, link, _id }) => {
    return {
      title,
      link,
      samples: allSamples[_id as string],
    };
  });

  return (
    <div className="main-page-collections-samples">
      {collectionsSamples.map(({ title, link, samples }) => (
        <CollectionSamples
          key={title}
          title={title}
          link={link}
          samples={samples}
        />
      ))}
    </div>
  );
};

export default MainCollectionsSamples;
