export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://urologie-neuwied.de/#clinic",
        "name": "Urologische Praxis Neuwied",
        "alternateName": "Urologie Neuwied",
        "url": "https://urologie-neuwied.de",
        "logo": "https://urologie-neuwied.de/logo.png",
        "image": "https://urologie-neuwied.de/logo.png",
        "description": "Urologische Facharztpraxis in Neuwied. Diagnostik, Onkologie, Andrologie, UroLift®, Magnetstimulation und Urodynamik.",
        "telephone": "+49-2631-23351",
        "faxNumber": "+49-2631-941845",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Dierdorfer Str. 115-117",
          "addressLocality": "Neuwied",
          "postalCode": "56564",
          "addressCountry": "DE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 50.4267,
          "longitude": 7.4698
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Thursday"],
            "opens": "08:00",
            "closes": "12:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Thursday"],
            "opens": "14:00",
            "closes": "17:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Wednesday", "Friday"],
            "opens": "08:00",
            "closes": "12:00"
          }
        ],
        "medicalSpecialty": "Urology",
        "availableService": [
          { "@type": "MedicalProcedure", "name": "Urologische Diagnostik" },
          { "@type": "MedicalProcedure", "name": "Onkologie & Tumornachsorge" },
          { "@type": "MedicalProcedure", "name": "Andrologie & Vasektomie" },
          { "@type": "MedicalProcedure", "name": "UroLift® bei BPH" },
          { "@type": "MedicalProcedure", "name": "Magnetstimulation Beckenboden" },
          { "@type": "MedicalProcedure", "name": "Urodynamik" }
        ],
        "hasMap": "https://maps.google.com/?q=Dierdorfer+Str.+115,+56564+Neuwied",
        "sameAs": [
          "https://www.doctolib.de/praxis/neuwied/urologie-neuwied",
          "https://www.jameda.de/neuwied/aerzte/urologen/walters-ticha-fomuki/uebersicht/81329551_1/",
          "https://www.vasektomie-neuwied.de"
        ]
      },
      {
        "@type": "Physician",
        "@id": "https://urologie-neuwied.de/#doctor",
        "name": "Walters T. Fomuki",
        "givenName": "Walters",
        "familyName": "Fomuki",
        "jobTitle": "Facharzt für Urologie",
        "medicalSpecialty": "Urology",
        "worksFor": { "@id": "https://urologie-neuwied.de/#clinic" },
        "hasCredential": [
          "Facharzt für Urologie",
          "Onkologisch qualifizierter Arzt",
          "Medikamentöse Tumortherapie"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://urologie-neuwied.de/#website",
        "url": "https://urologie-neuwied.de",
        "name": "Urologie Neuwied",
        "inLanguage": ["de", "en", "fr", "tr"],
        "publisher": { "@id": "https://urologie-neuwied.de/#clinic" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Wie kann ich einen Termin bei Urologie Neuwied buchen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sie können einen Termin online über Doctolib buchen oder uns telefonisch unter 02631 - 23351 erreichen."
            }
          },
          {
            "@type": "Question",
            "name": "Welche Öffnungszeiten hat die Urologie Neuwied?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mo, Di, Do: 08:00–12:00 und 14:00–17:00 Uhr. Mi und Fr: 08:00–12:00 Uhr."
            }
          },
          {
            "@type": "Question",
            "name": "Was ist UroLift®?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "UroLift® ist ein minimalinvasives ambulantes Verfahren zur Behandlung der benignen Prostatahyperplasie (BPH) ohne klassische Operation."
            }
          },
          {
            "@type": "Question",
            "name": "Bietet die Praxis Vasektomien an?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, Dr. Fomuki ist zertifiziertes Mitglied im Vasektomie-Experten-Netzwerk und führt Vasektomien konservativ und non-skalpell durch."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
