import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ISubCollectionProps } from './Types';

const SubCollections: React.FC<ISubCollectionProps> = ({ subCollections }) => {
  const { locale, defaultLocale } = useRouter();

  const subCollectionsItems = subCollections.map((el) => {
    return {
      id: el._id,
      title: locale === defaultLocale ? el.title : el.title_en,
      link: el.link,
      image: el.image.path,
    };
  });

  return (
    <div className="subcollections-list">
      <div className="subcollections-list__subcollection-container">
        {subCollectionsItems.map(({ id, title, link, image }) => (
          <Link
            key={title}
            href={`subcollections${link}?id=${id}&name=${title}`}
          >
            <div className="subcollections-item">
              <div className="subcollections-item__image">
                <Image
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                  src={process.env.NEXT_PUBLIC_COCKPIT_URL + image}
                />
              </div>
              <div className="subcollections-item__title">{title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCollections;
