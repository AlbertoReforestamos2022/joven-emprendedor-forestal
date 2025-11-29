import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, descripcion, documentos } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5 bg-light-custom',
        id: 'documentos'
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

                <div className="row g-4">
                    {documentos.map((doc, index) => (
                        <div key={index} className="col-md-4">
                            <a href={doc.url} className="document-card">
                                <i className={`fas ${doc.icon}`}></i>
                                <h5 className="fw-bold">{doc.titulo}</h5>
                                <p>{doc.descripcion}</p>
                                <small><i className="fas fa-download me-2"></i>Descargar PDF</small>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}