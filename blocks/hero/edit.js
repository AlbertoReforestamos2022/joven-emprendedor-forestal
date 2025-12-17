import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, MediaUpload, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
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
    
    // Si hay imagen de fondo
    if (backgroundImage) {
        heroStyle.backgroundImage = `url(${backgroundImage})`;
        heroStyle.backgroundSize = 'cover';
        heroStyle.backgroundPosition = 'center';
        heroStyle.position = 'relative';
    } 
    // Si no hay imagen, usar color o gradient por defecto
    else if (backgroundColor) {
        heroStyle.background = backgroundColor;
    } else {
        heroStyle.background = 'linear-gradient(135deg, #2e7fb1 0%, #1e5a7f 100%)';
    }

    const blockProps = useBlockProps({
        className: 'hero-section',
        style: heroStyle
    });

    // Convertir opacidad (0-100) a rgba
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

    const updateStat = (index, field, value) => {
        const newStats = [...stats];
        newStats[index][field] = value;
        setAttributes({ stats: newStats });
    };

    const addStat = () => {
        const newStats = [...stats, { number: '', label: '' }];
        setAttributes({ stats: newStats });
    };

    const removeStat = (index) => {
        const newStats = stats.filter((_, i) => i !== index);
        setAttributes({ stats: newStats });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Fondo', 'jovenemprendedor')} initialOpen={true}>
                    <MediaUpload
                        onSelect={(media) => setAttributes({ backgroundImage: media.url })}
                        allowedTypes={['image']}
                        value={backgroundImage}
                        render={({ open }) => (
                            <div className="mb-3">
                                <p><strong>{__('Imagen de fondo', 'jovenemprendedor')}</strong></p>
                                {backgroundImage ? (
                                    <div>
                                        <img 
                                            src={backgroundImage} 
                                            alt="Background" 
                                            style={{ width: '100%', marginBottom: '8px', borderRadius: '4px' }} 
                                        />
                                        <div className="d-flex gap-2">
                                            <Button onClick={open} variant="secondary">
                                                Cambiar imagen
                                            </Button>
                                            <Button 
                                                onClick={() => setAttributes({ backgroundImage: '' })}
                                                isDestructive
                                            >
                                                Quitar imagen
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Button onClick={open} variant="primary">
                                        Seleccionar imagen de fondo
                                    </Button>
                                )}
                            </div>
                        )}
                    />

                    {!backgroundImage && (
                        <div className="mt-3">
                            <p className="text-muted small">
                                {__('Si no seleccionas imagen, puedes elegir un color de fondo:', 'jovenemprendedor')}
                            </p>
                        </div>
                    )}
                </PanelBody>

                <PanelColorSettings
                    title={__('Colores', 'jovenemprendedor')}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Color de fondo (sin imagen)', 'jovenemprendedor')
                        },
                        {
                            value: overlayColor,
                            onChange: (color) => setAttributes({ overlayColor: color }),
                            label: __('Color del overlay (con imagen)', 'jovenemprendedor')
                        }
                    ]}
                />

                {backgroundImage && (
                    <PanelBody title={__('Overlay de imagen', 'jovenemprendedor')}>
                        <RangeControl
                            label={__('Opacidad del overlay', 'jovenemprendedor')}
                            value={overlayOpacity}
                            onChange={(value) => setAttributes({ overlayOpacity: value })}
                            min={0}
                            max={100}
                            help={__('Ajusta la oscuridad del overlay para mejorar la legibilidad del texto', 'jovenemprendedor')}
                        />
                    </PanelBody>
                )}

                <PanelBody title={__('Botones', 'jovenemprendedor')}>
                    <ToggleControl
                        label={__('Mostrar botones', 'jovenemprendedor')}
                        checked={showButtons}
                        onChange={(value) => setAttributes({ showButtons: value })}
                    />

                    {showButtons && (
                        <>
                            <TextControl
                                label={__('Texto botón principal', 'jovenemprendedor')}
                                value={buttonPrimaryText}
                                onChange={(value) => setAttributes({ buttonPrimaryText: value })}
                            />
                            <TextControl
                                label={__('URL botón principal', 'jovenemprendedor')}
                                value={buttonPrimaryUrl}
                                onChange={(value) => setAttributes({ buttonPrimaryUrl: value })}
                            />
                            <TextControl
                                label={__('Texto botón secundario', 'jovenemprendedor')}
                                value={buttonSecondaryText}
                                onChange={(value) => setAttributes({ buttonSecondaryText: value })}
                            />
                            <TextControl
                                label={__('URL botón secundario', 'jovenemprendedor')}
                                value={buttonSecondaryUrl}
                                onChange={(value) => setAttributes({ buttonSecondaryUrl: value })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Estadísticas', 'jovenemprendedor')} initialOpen={false}>
                    <Button 
                        variant="primary" 
                        onClick={addStat}
                        className="mb-3"
                    >
                        {__('Agregar Estadística', 'jovenemprendedor')}
                    </Button>

                    {stats.map((stat, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Estadística {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeStat(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Número', 'jovenemprendedor')}
                                value={stat.number}
                                onChange={(value) => updateStat(index, 'number', value)}
                                placeholder="10+"
                            />

                            <TextControl
                                label={__('Etiqueta', 'jovenemprendedor')}
                                value={stat.label}
                                onChange={(value) => updateStat(index, 'label', value)}
                                placeholder="Ediciones"
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                {/* Overlay si hay imagen de fondo */}
                {backgroundImage && <div style={getOverlayStyle()}></div>}
                
                <div className="container hero-content" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <RichText
                                tagName="h1"
                                className="hero-title"
                                value={titulo}
                                onChange={(value) => setAttributes({ titulo: value })}
                                placeholder="Título principal"
                            />
                            
                            <RichText
                                tagName="p"
                                className="hero-subtitle"
                                value={subtitulo}
                                onChange={(value) => setAttributes({ subtitulo: value })}
                                placeholder="Subtítulo"
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
        </>
    );
}