import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, descripcion, documentos } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5 bg-light-custom'
    });

    const updateDocumento = (index, field, value) => {
        const newDocs = [...documentos];
        newDocs[index][field] = value;
        setAttributes({ documentos: newDocs });
    };

    const addDocumento = () => {
        const newDocs = [...documentos, { icon: 'fa-file', titulo: '', descripcion: '', url: '#' }];
        setAttributes({ documentos: newDocs });
    };

    const removeDocumento = (index) => {
        const newDocs = documentos.filter((_, i) => i !== index);
        setAttributes({ documentos: newDocs });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Documentos', 'jovenemprendedor')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addDocumento}
                        className="mb-3"
                    >
                        {__('Agregar Documento', 'jovenemprendedor')}
                    </Button>

                    {documentos.map((doc, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Documento {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeDocumento(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Ícono', 'jovenemprendedor')}
                                value={doc.icon}
                                onChange={(value) => updateDocumento(index, 'icon', value)}
                                placeholder="fa-file-pdf"
                            />

                            <TextControl
                                label={__('Título', 'jovenemprendedor')}
                                value={doc.titulo}
                                onChange={(value) => updateDocumento(index, 'titulo', value)}
                            />

                            <TextControl
                                label={__('Descripción', 'jovenemprendedor')}
                                value={doc.descripcion}
                                onChange={(value) => updateDocumento(index, 'descripcion', value)}
                            />

                            <TextControl
                                label={__('URL', 'jovenemprendedor')}
                                value={doc.url}
                                onChange={(value) => updateDocumento(index, 'url', value)}
                                placeholder="https://..."
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
        </>
    );
}