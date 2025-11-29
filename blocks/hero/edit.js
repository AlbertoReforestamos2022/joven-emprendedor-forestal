import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, subtitulo, showButtons, buttonPrimaryText, buttonPrimaryUrl, buttonSecondaryText, buttonSecondaryUrl, stats } = attributes;

    const blockProps = useBlockProps({
        className: 'hero-section'
    });

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

                <PanelBody title={__('Estadísticas', 'jovenemprendedor')} initialOpen={true}>
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
                <div className="container hero-content">
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