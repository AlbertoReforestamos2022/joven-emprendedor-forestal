import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, contenido, objetivosTitulo, objetivos, imagen, imagenAlt, imagenPosicion } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5 bg-light-custom',
        id: 'proyecto'
    });

    // Determinar las clases de orden según la posición
    const textoClasses = imagenPosicion === 'left' ? 'col-lg-6 mb-4 mb-lg-0 order-lg-2' : 'col-lg-6 mb-4 mb-lg-0';
    const imagenClasses = imagenPosicion === 'left' ? 'col-lg-6 order-lg-1' : 'col-lg-6';

    return (
        <section {...blockProps}>
            <div className="container">
                <div className="row align-items-center">
                    <div className={textoClasses}>
                        <RichText.Content
                            tagName="h2"
                            className="section-title"
                            value={titulo}
                        />
                        
                        <RichText.Content
                            tagName="div"
                            className="project-content mt-4"
                            value={contenido}
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
                    <div className={imagenClasses}>
                        <img src={imagen} alt={imagenAlt} className="img-fluid rounded shadow-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}