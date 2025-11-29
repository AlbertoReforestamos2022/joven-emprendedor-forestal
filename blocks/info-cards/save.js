import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, descripcion, cards } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        id: 'info'
    });

    return (
        <section {...blockProps}>
            <div className="container">
                <div className="text-center mb-5">
                    <RichText.Content
                        tagName="h2"
                        className="section-title"
                        value={titulo}
                    />
                    <RichText.Content
                        tagName="p"
                        className="section-description text-muted mt-4"
                        value={descripcion}
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
    );
}