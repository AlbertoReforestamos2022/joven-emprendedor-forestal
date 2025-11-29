import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, descripcion, items } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5'
    });

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setAttributes({ items: newItems });
    };

    const addItem = () => {
        const newItems = [...items, { year: '', titulo: '', ubicacion: '', participantes: '', descripcion: '' }];
        setAttributes({ items: newItems });
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setAttributes({ items: newItems });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Items de Timeline', 'jovenemprendedor')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addItem}
                        className="mb-3"
                    >
                        {__('Agregar Item', 'jovenemprendedor')}
                    </Button>

                    {items.map((item, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Item {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeItem(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Año', 'jovenemprendedor')}
                                value={item.year}
                                onChange={(value) => updateItem(index, 'year', value)}
                            />

                            <TextControl
                                label={__('Título', 'jovenemprendedor')}
                                value={item.titulo}
                                onChange={(value) => updateItem(index, 'titulo', value)}
                            />

                            <TextControl
                                label={__('Ubicación', 'jovenemprendedor')}
                                value={item.ubicacion}
                                onChange={(value) => updateItem(index, 'ubicacion', value)}
                            />

                            <TextControl
                                label={__('Participantes', 'jovenemprendedor')}
                                value={item.participantes}
                                onChange={(value) => updateItem(index, 'participantes', value)}
                            />

                            <TextControl
                                label={__('Descripción', 'jovenemprendedor')}
                                value={item.descripcion}
                                onChange={(value) => updateItem(index, 'descripcion', value)}
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="text-center mb-5">
                        <RichText
                            tagName="h2"
                            className="section-title"
                            value={titulo}
                            onChange={(value) => setAttributes({ titulo: value })}
                            placeholder="Título"
                        />
                        <RichText
                            tagName="p"
                            className="section-description text-muted mt-4"
                            value={descripcion}
                            onChange={(value) => setAttributes({ descripcion: value })}
                            placeholder="Descripción"
                        />
                    </div>

                    <div className="timeline">
                        {items.map((item, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-year">{item.year}</div>
                                    <h5 className="fw-bold">{item.titulo}</h5>
                                    <p className="text-muted mb-2">
                                        <i className="fas fa-map-marker-alt me-2"></i>{item.ubicacion}
                                    </p>
                                    <p className="text-muted mb-2">
                                        <i className="fas fa-users me-2"></i>{item.participantes}
                                    </p>
                                    <p>{item.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}