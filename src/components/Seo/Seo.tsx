import Head from 'next/head';

import { ISeoProps } from './Types';

const Seo: React.FC<ISeoProps> = ({
  breadcrumbs,
  description,
  path,
  title,
  product,
}): JSX.Element => {
  const shemaContext = 'http://schema.org';

  const schemaOrgJSONLD: { [key: string]: any }[] = [
    {
      '@context': shemaContext,
      '@type': 'Organization',
      address: 'Харьков, ул.Мироносицкая 67',
      url: 'blind-blind.com',
      name: 'Blind-blind',
      sameAs: [
        'https://www.facebook.com/blindfashion',
        'https://vimeo.com/blindfashion',
        'https://www.pinterest.com/blindfashion/_created/',
        'https://www.instagram.com/blind_officials/',
      ],
      telephone: '+380660431338',
    },
    {
      '@context': shemaContext,
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map(({ title: name, link }, idx) => ({
        '@type': 'ListItem',
        position: idx,
        item: {
          '@id': link,
          url: link,
          image: '',
          name,
        },
      })),
    },
  ];

  if (product) {
    schemaOrgJSONLD.push({
      '@context': shemaContext,
      '@type': 'Product',
      productID: product.id,
      name: product.name,
      description: description,
      url: 'https://example.org/facebook',
      image: 'https://example.org/facebook.jpg',
      brand: 'Blind',
      offers: [
        {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'UAH',
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
        },
      ],
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          propertyID: product.collection,
          value: product.collection,
        },
      ],
    });
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <link rel="shortcut icon" href="/favicon.jpg"></link>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={path} />
      <link rel="canonical" href={path} />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Head>
  );
};

export default Seo;
