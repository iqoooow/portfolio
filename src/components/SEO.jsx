import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type = 'website', image = 'https://www.iqooow.uz/og-image.jpg' }) => {
    const defaultTitle = "iqooow | Premium Full Stack Developer";
    const defaultDescription = "Ixlosbek Rajabboyev - Full Stack Dasturchi. Zamonaviy, tez va xavfsiz web loyihalar hamda arxitekturalar yarataman.";
    
    const finalTitle = title ? `${title} | iqooow` : defaultTitle;
    const finalDescription = description || defaultDescription;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{finalTitle}</title>
            <meta name='description' content={finalDescription} />
            
            {/* Facebook / Open Graph tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:url" content="https://www.iqooow.uz" />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="iqooow Portfolio" />
            
            {/* Twitter tags */}
            <meta name="twitter:creator" content={name || "Ixlosbek"} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
