import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, descripcion, items } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        id: 'timeline'
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
    );
}