import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, descripcion, preguntasVisibles, preguntasOcultas, textoBoton } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5 bg-light-custom'
    });

    const updatePregunta = (tipo, index, field, value) => {
        const preguntas = tipo === 'visible' ? [...preguntasVisibles] : [...preguntasOcultas];
        preguntas[index][field] = value;
        
        if (tipo === 'visible') {
            setAttributes({ preguntasVisibles: preguntas });
        } else {
            setAttributes({ preguntasOcultas: preguntas });
        }
    };

    const addPregunta = (tipo) => {
        const nuevaPregunta = { pregunta: '', respuesta: '' };
        
        if (tipo === 'visible') {
            setAttributes({ preguntasVisibles: [...preguntasVisibles, nuevaPregunta] });
        } else {
            setAttributes({ preguntasOcultas: [...preguntasOcultas, nuevaPregunta] });
        }
    };

    const removePregunta = (tipo, index) => {
        if (tipo === 'visible') {
            const preguntas = preguntasVisibles.filter((_, i) => i !== index);
            setAttributes({ preguntasVisibles: preguntas });
        } else {
            const preguntas = preguntasOcultas.filter((_, i) => i !== index);
            setAttributes({ preguntasOcultas: preguntas });
        }
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configuración', 'jovenemprendedor')}>
                    <TextControl
                        label={__('Texto del botón', 'jovenemprendedor')}
                        value={textoBoton}
                        onChange={(value) => setAttributes({ textoBoton: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Preguntas Visibles', 'jovenemprendedor')} initialOpen={true}>
                    <p className="text-muted small">Preguntas que se muestran inicialmente</p>
                    
                    <Button 
                        variant="primary" 
                        onClick={() => addPregunta('visible')}
                        className="mb-3"
                    >
                        {__('Agregar Pregunta Visible', 'jovenemprendedor')}
                    </Button>

                    {preguntasVisibles.map((item, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Pregunta {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removePregunta('visible', index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Pregunta', 'jovenemprendedor')}
                                value={item.pregunta}
                                onChange={(value) => updatePregunta('visible', index, 'pregunta', value)}
                            />

                            <TextControl
                                label={__('Respuesta', 'jovenemprendedor')}
                                value={item.respuesta}
                                onChange={(value) => updatePregunta('visible', index, 'respuesta', value)}
                            />
                        </div>
                    ))}
                </PanelBody>

                <PanelBody title={__('Preguntas Ocultas', 'jovenemprendedor')}>
                    <p className="text-muted small">Preguntas que se muestran al hacer clic en "Ver más"</p>
                    
                    <Button 
                        variant="primary" 
                        onClick={() => addPregunta('oculta')}
                        className="mb-3"
                    >
                        {__('Agregar Pregunta Oculta', 'jovenemprendedor')}
                    </Button>

                    {preguntasOcultas.map((item, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Pregunta {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removePregunta('oculta', index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Pregunta', 'jovenemprendedor')}
                                value={item.pregunta}
                                onChange={(value) => updatePregunta('oculta', index, 'pregunta', value)}
                            />

                            <TextControl
                                label={__('Respuesta', 'jovenemprendedor')}
                                value={item.respuesta}
                                onChange={(value) => updatePregunta('oculta', index, 'respuesta', value)}
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

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div id="faqContainer">
                                {/* Preguntas visibles */}
                                {preguntasVisibles.map((item, index) => (
                                    <div key={index} className="faq-item">
                                        <div className="faq-question">
                                            <span>{item.pregunta}</span>
                                            <i className="fas fa-chevron-down faq-icon"></i>
                                        </div>
                                        <div className="faq-answer">
                                            {item.respuesta}
                                        </div>
                                    </div>
                                ))}

                                {/* Preguntas ocultas (preview) */}
                                <div className="hidden-faqs" style={{ opacity: 0.5 }}>
                                    {preguntasOcultas.slice(0, 2).map((item, index) => (
                                        <div key={index} className="faq-item">
                                            <div className="faq-question">
                                                <span>{item.pregunta}</span>
                                                <i className="fas fa-chevron-down faq-icon"></i>
                                            </div>
                                        </div>
                                    ))}
                                    {preguntasOcultas.length > 2 && (
                                        <p className="text-center text-muted">
                                            +{preguntasOcultas.length - 2} preguntas más...
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                <button className="btn btn-show-more">
                                    <span>{textoBoton}</span>
                                    <i className="fas fa-chevron-down ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}