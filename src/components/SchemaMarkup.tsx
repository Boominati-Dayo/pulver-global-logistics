export default function SchemaMarkup() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://swiftxpressinc.com/#organization',
        'name': 'SwiftXpress Inc.',
        'url': 'https://swiftxpressinc.com',
        'logo': 'https://swiftxpressinc.com/logo.png',
        'description': 'Professional logistics and shipping services across 50+ countries. Air freight, sea freight, ground transport, and express delivery.',
        'foundingDate': '2005',
        'knowsAbout': ['Logistics', 'Shipping', 'Air Freight', 'Sea Freight', 'Supply Chain'],
        'areaServed': 'Worldwide',
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+1-234-567-890',
          'contactType': 'customer service',
          'email': 'info@swiftxpressinc.com',
          'availableLanguage': 'English'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://swiftxpressinc.com/#website',
        'url': 'https://swiftxpressinc.com',
        'name': 'SwiftXpress Inc.',
        'publisher': { '@id': 'https://swiftxpressinc.com/#organization' },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://swiftxpressinc.com/track?tracking={search_term_string}',
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