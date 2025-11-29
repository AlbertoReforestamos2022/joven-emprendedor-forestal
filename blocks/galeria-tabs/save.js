import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, descripcion, years } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        id: 'galeria'
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

                <ul className="nav nav-pills justify-content-center mb-4">
                    {years.map((yearData, index) => (
                        <li key={index} className="nav-item nav-item-gallery">
                            <button 
                                className={`nav-link ${index === 0 ? 'active' : ''}`}
                                data-bs-toggle="pill" 
                                data-bs-target={`#gallery${yearData.year}`}
                            >
                                {yearData.year}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="tab-content">
                    {years.map((yearData, yearIndex) => (
                        <div 
                            key={yearIndex} 
                            className={`tab-pane fade ${yearIndex === 0 ? 'show active' : ''}`}
                            id={`gallery${yearData.year}`}
                        >
                            <div className="row">
                                {yearData.imagenes.map((img, imgIndex) => (
                                    <div key={imgIndex} className="col-md-4">
                                        <div className="gallery-item">
                                            <img src={img.url} alt={img.caption} />
                                            <div className="gallery-overlay">
                                                <h5>{img.caption}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}