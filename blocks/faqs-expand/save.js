import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, descripcion, preguntasVisibles, preguntasOcultas, textoBoton } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5 bg-light-custom',
        id: 'faq'
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

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div id="faqContainer">
                            {/* Preguntas visibles */}
                            {preguntasVisibles.map((item, index) => (
                                <div key={index} className="faq-item">
                                    <div className="faq-question" onClick="toggleFAQ(this)">
                                        <span>{item.pregunta}</span>
                                        <i className="fas fa-chevron-down faq-icon"></i>
                                    </div>
                                    <div className="faq-answer">
                                        {item.respuesta}
                                    </div>
                                </div>
                            ))}

                            {/* Preguntas ocultas */}
                            <div className="hidden-faqs">
                                {preguntasOcultas.map((item, index) => (
                                    <div key={index} className="faq-item">
                                        <div className="faq-question" onClick="toggleFAQ(this)">
                                            <span>{item.pregunta}</span>
                                            <i className="fas fa-chevron-down faq-icon"></i>
                                        </div>
                                        <div className="faq-answer">
                                            {item.respuesta}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button className="btn btn-show-more" onClick="showMoreFAQs()">
                                <span id="btnText">{textoBoton}</span>
                                <i className="fas fa-chevron-down ms-2" id="btnIcon"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}