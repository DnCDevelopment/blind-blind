import Head from 'next/head';

import { ISeoProps } from './Types';

const Seo: React.FC<ISeoProps> = ({
  breadcrumbs,
  description,
  path,
  title,
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
      <meta
        name="facebook-domain-verify"
        content="1al6a9ctqd0sz2aejcj7bxfq42qst0"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1526060404237881');
fbq('track', 'PageView');`,
        }}
      ></script>
      <noscript>
        <img
          alt="pixel"
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1526060404237881&ev=PageView&noscript=1"
        />
      </noscript>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-56684939-1"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-56684939-1');`,
        }}
      ></script>
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Head>
  );
};

export default Seo;
