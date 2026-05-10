import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title, 
    description, 
    keywords,
    name = "Ixlosbek Rajabboyev", 
    type = 'website', 
    image = 'https://www.iqooow.uz/og-image.jpg',
    canonical,
    robots = "index, follow",
    structuredData
}) => {
    const defaultTitle = "iqooow | Premium Full Stack Developer";
    const defaultDescription = "Ixlosbek Rajabboyev - Full Stack Dasturchi. Zamonaviy, tez va xavfsiz web loyihalar hamda arxitekturalar yarataman.";
    const defaultKeywords = "Ixlosbek Rajabboyev, iqooow, full stack developer, web architect, react developer, nodejs developer, uzbekistan developer, portfolio";
    
    const finalTitle = title ? (title.includes('iqooow') ? title : `${title} | iqooow`) : defaultTitle;
    const finalDescription = description || defaultDescription;
    const finalKeywords = keywords || defaultKeywords;
    const finalCanonical = canonical || "https://www.iqooow.uz" + window.location.pathname;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{finalTitle}</title>
            <meta name='description' content={finalDescription} />
            <meta name='keywords' content={finalKeywords} />
            <meta name='robots' content={robots} />
            <link rel="canonical" href={finalCanonical} />
            
            {/* Facebook / Open Graph tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:url" content={finalCanonical} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="iqooow Portfolio" />
            
            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
