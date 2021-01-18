import { useContext } from 'react';
import { ICockpitGood } from '../../cockpitTypes';
import { indexContext } from '../../context/cockpitContext';
import { IIndexContext } from '../../context/Types';
import CollectionSamples from './CollectionSamples';
import { IMainCollectionsSamplesProps } from './Types';

const MainCollectionsSamples: React.FC<IMainCollectionsSamplesProps> = ({
  goods,
}) => {
  const { collectionsData } = useContext(indexContext) as IIndexContext;

  const samples = goods.reduce(
    (samples: { [key: string]: ICockpitGood[] }, x: ICockpitGood) => {
      (samples[x.collectionId] = samples[x.collectionId] || []).push(x);
      return samples;
    },
    {}
  );

  const collectionsSamples = collectionsData.map(({ title, link, _id }) => {
    return {
      title,
      link,
      samples: samples[_id as string],
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
