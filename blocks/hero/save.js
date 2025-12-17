import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        subtitulo, 
        showButtons, 
        buttonPrimaryText, 
        buttonPrimaryUrl, 
        buttonSecondaryText, 
        buttonSecondaryUrl, 
        stats,
        backgroundColor,
        backgroundImage,
        overlayColor,
        overlayOpacity
    } = attributes;

    // Construir el estilo del hero
    const heroStyle = {};
    
    if (backgroundImage) {
        heroStyle.backgroundImage = `url(${backgroundImage})`;
        heroStyle.backgroundSize = 'cover';
        heroStyle.backgroundPosition = 'center';
        heroStyle.position = 'relative';
    } else if (backgroundColor) {
        heroStyle.background = backgroundColor;
    } else {
        heroStyle.background = 'linear-gradient(135deg, #2e7fb1 0%, #1e5a7f 100%)';
    }

    const blockProps = useBlockProps.save({
        className: 'hero-section',
        id: 'inicio',
        style: heroStyle
    });

    // Estilo del overlay
    const getOverlayStyle = () => {
        if (!backgroundImage) return {};
        
        const opacity = overlayOpacity / 100;
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: overlayColor || `rgba(46, 127, 177, ${opacity})`,
            zIndex: 1
        };
    };

    return (
        <section {...blockProps}>
            {/* Overlay si hay imagen de fondo */}
            {backgroundImage && <div style={getOverlayStyle()}></div>}
            
            <div className="container hero-content" style={{ position: 'relative', zIndex: 2 }}>
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <RichText.Content
                            tagName="h1"
                            className="hero-title"
                            value={titulo}
                        />
                        
                        <RichText.Content
                            tagName="p"
                            className="hero-subtitle"
                            value={subtitulo}
                        />

                        {showButtons && (
                            <div className="d-flex gap-3 flex-wrap mb-4">
                                <a href={buttonPrimaryUrl} className="btn btn-primary-custom">
                                    {buttonPrimaryText}
                                </a>
                                <a href={buttonSecondaryUrl} className="btn btn-outline-custom">
                                    {buttonSecondaryText}
                                </a>
                            </div>
                        )}

                        <div className="row mt-5">
                            {stats.map((stat, index) => (
                                <div key={index} className="col-4">
                                    <h3 className="text-white fw-bold">{stat.number}</h3>
                                    <p className="text-white-50">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}