/**
 * InAmigos Foundation - Phase 13 JSON-LD Structured Data Schema Generator
 * Generates Schema.org compliant NGO, DonateAction, and Event metadata for Google Search Engine Indexing.
 */

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'InAmigos Foundation',
    url: 'https://inamigosfoundation.org.in',
    logo: 'https://inamigosfoundation.org.in/logo.png',
    sameAs: [
      'https://facebook.com/inamigosfoundation',
      'https://instagram.com/inamigosfoundation',
      'https://linkedin.com/company/inamigosfoundation',
    ],
    description: 'InAmigos Foundation is a Section 80G tax-exempt non-profit organization in India dedicated to hunger relief, girl child education, and healthcare.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Connaught Place',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98100-12345',
      contactType: 'donor support',
      email: 'contact@inamigosfoundation.org.in',
    },
    potentialAction: {
      '@type': 'DonateAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://inamigosfoundation.org.in/#donate',
      },
      recipient: {
        '@type': 'NGO',
        name: 'InAmigos Foundation',
      },
    },
  };
}
