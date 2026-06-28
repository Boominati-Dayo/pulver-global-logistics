export default function SchemaMarkup() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://pulvergloballogistics.com/#organization',
        'name': 'Pulver Global Logistics',
        'url': 'https://pulvergloballogistics.com',
        'logo': 'https://pulvergloballogistics.com/pulver-logo.png',
        'description': 'Professional logistics and shipping services worldwide. Air freight, sea freight, ground transport, and express delivery.',
        'foundingDate': '2022',
        'knowsAbout': ['Logistics', 'Shipping', 'Air Freight', 'Sea Freight', 'Supply Chain'],
        'areaServed': 'Worldwide',
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+1-800-PULVER',
          'contactType': 'customer service',
          'email': 'info@pulvergloballogistics.com',
          'availableLanguage': 'English'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://pulvergloballogistics.com/#website',
        'url': 'https://pulvergloballogistics.com',
        'name': 'Pulver Global Logistics',
        'publisher': { '@id': 'https://pulvergloballogistics.com/#organization' },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://pulvergloballogistics.com/track?tracking={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}