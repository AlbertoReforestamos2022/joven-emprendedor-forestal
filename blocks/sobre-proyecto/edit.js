import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, contenido, objetivosTitulo, objetivos, imagen, imagenAlt } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5 bg-light-custom'
    });

    const updateObjetivo = (index, value) => {
        const newObjetivos = [...objetivos];
        newObjetivos[index] = value;
        setAttributes({ objetivos: newObjetivos });
    };

    const addObjetivo = () => {
        const newObjetivos = [...objetivos, ''];
        setAttributes({ objetivos: newObjetivos });
    };

    const removeObjetivo = (index) => {
        const newObjetivos = objetivos.filter((_, i) => i !== index);
        setAttributes({ objetivos: newObjetivos });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Imagen', 'jovenemprendedor')}>
                    <MediaUpload
                        onSelect={(media) => {
                            setAttributes({ 
                                imagen: media.url,
                                imagenAlt: media.alt || ''
                            });
                        }}
                        allowedTypes={['image']}
                        value={imagen}
                        render={({ open }) => (
                            <div>
                                {imagen ? (
                                    <div>
                                        <img 
                                            src={imagen} 
                                            alt={imagenAlt} 
                                            style={{ width: '100%', marginBottom: '8px' }} 
                                        />
                                        <Button onClick={open} variant="secondary" className="mb-2">
                                            Cambiar imagen
                                        </Button>
                                    </div>
                                ) : (
                                    <Button onClick={open} variant="primary">
                                        Seleccionar imagen
                                    </Button>
                                )}
                            </div>
                        )}
                    />
                </PanelBody>

                <PanelBody title={__('Objetivos', 'jovenemprendedor')} initialOpen={true}>
                    <TextControl
                        label={__('Título de objetivos', 'jovenemprendedor')}
                        value={objetivosTitulo}
                        onChange={(value) => setAttributes({ objetivosTitulo: value })}
                    />

                    <Button 
                        variant="primary" 
                        onClick={addObjetivo}
                        className="mb-3"
                    >
                        {__('Agregar Objetivo', 'jovenemprendedor')}
                    </Button>

                    {objetivos.map((objetivo, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Objetivo {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeObjetivo(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                value={objetivo}
                                onChange={(value) => updateObjetivo(index, value)}
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <RichText
                                tagName="h2"
                                className="section-title"
                                value={titulo}
                                onChange={(value) => setAttributes({ titulo: value })}
                                placeholder="Título de la sección"
                            />
                            
                            <RichText
                                tagName="div"
                                className="project-content mt-4"
                                value={contenido}
                                onChange={(value) => setAttributes({ contenido: value })}
                                placeholder="Contenido del proyecto..."
                            />

                            <div className="mt-4">
                                <h5 className="fw-bold text-primary">{objetivosTitulo}</h5>
                                <ul className="text-muted">
                                    {objetivos.map((objetivo, index) => (
                                        <li key={index}>{objetivo}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            {imagen ? (
                                <img src={imagen} alt={imagenAlt} className="img-fluid rounded shadow-lg" />
                            ) : (
                                <div className="bg-secondary rounded d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                                    <span className="text-white">Selecciona una imagen</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}