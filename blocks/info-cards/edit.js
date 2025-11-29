import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, descripcion, cards } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5'
    });

    const updateCard = (index, field, value) => {
        const newCards = [...cards];
        newCards[index][field] = value;
        setAttributes({ cards: newCards });
    };

    const addCard = () => {
        const newCards = [...cards, { icon: 'fa-star', titulo: '', descripcion: '' }];
        setAttributes({ cards: newCards });
    };

    const removeCard = (index) => {
        const newCards = cards.filter((_, i) => i !== index);
        setAttributes({ cards: newCards });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Cards', 'jovenemprendedor')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addCard}
                        className="mb-3"
                    >
                        {__('Agregar Card', 'jovenemprendedor')}
                    </Button>

                    <p className="text-muted small">
                        Íconos de Font Awesome: fa-graduation-cap, fa-users, fa-lightbulb, fa-star, fa-heart, etc.
                    </p>

                    {cards.map((card, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Card {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeCard(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Ícono (Font Awesome)', 'jovenemprendedor')}
                                value={card.icon}
                                onChange={(value) => updateCard(index, 'icon', value)}
                                placeholder="fa-star"
                            />

                            <TextControl
                                label={__('Título', 'jovenemprendedor')}
                                value={card.titulo}
                                onChange={(value) => updateCard(index, 'titulo', value)}
                            />

                            <TextControl
                                label={__('Descripción', 'jovenemprendedor')}
                                value={card.descripcion}
                                onChange={(value) => updateCard(index, 'descripcion', value)}
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
                            placeholder="Título de la sección"
                        />
                        <RichText
                            tagName="p"
                            className="section-description text-muted mt-4"
                            value={descripcion}
                            onChange={(value) => setAttributes({ descripcion: value })}
                            placeholder="Descripción"
                        />
                    </div>
                    <div className="row g-4 justify-content-center">
                        {cards.map((card, index) => (
                            <div key={index} className="col-md-3">
                                <div className="info-card text-center">
                                    <i className={`fas ${card.icon}`}></i>
                                    <h4 className="fw-bold">{card.titulo}</h4>
                                    <p className="text-muted">{card.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}