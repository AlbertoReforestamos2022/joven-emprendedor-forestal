import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, descripcion, years } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5'
    });

    const updateYear = (yearIndex, field, value) => {
        const newYears = [...years];
        newYears[yearIndex][field] = value;
        setAttributes({ years: newYears });
    };

    const updateImagen = (yearIndex, imgIndex, field, value) => {
        const newYears = [...years];
        newYears[yearIndex].imagenes[imgIndex][field] = value;
        setAttributes({ years: newYears });
    };

    const addYear = () => {
        const newYears = [...years, { year: '', imagenes: [{ url: '', caption: '' }] }];
        setAttributes({ years: newYears });
    };

    const removeYear = (index) => {
        const newYears = years.filter((_, i) => i !== index);
        setAttributes({ years: newYears });
    };

    const addImagen = (yearIndex) => {
        const newYears = [...years];
        newYears[yearIndex].imagenes.push({ url: '', caption: '' });
        setAttributes({ years: newYears });
    };

    const removeImagen = (yearIndex, imgIndex) => {
        const newYears = [...years];
        newYears[yearIndex].imagenes = newYears[yearIndex].imagenes.filter((_, i) => i !== imgIndex);
        setAttributes({ years: newYears });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Años y Galerías', 'jovenemprendedor')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addYear}
                        className="mb-3"
                    >
                        {__('Agregar Año', 'jovenemprendedor')}
                    </Button>

                    {years.map((yearData, yearIndex) => (
                        <div key={yearIndex} className="border p-3 mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Año {yearIndex + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeYear(yearIndex)}
                                >
                                    Eliminar Año
                                </Button>
                            </div>

                            <TextControl
                                label={__('Año', 'jovenemprendedor')}
                                value={yearData.year}
                                onChange={(value) => updateYear(yearIndex, 'year', value)}
                                placeholder="2024"
                            />

                            <hr />
                            <strong className="d-block mb-2">Imágenes:</strong>

                            <Button 
                                variant="secondary" 
                                onClick={() => addImagen(yearIndex)}
                                className="mb-2"
                                isSmall
                            >
                                {__('Agregar Imagen', 'jovenemprendedor')}
                            </Button>

                            {yearData.imagenes.map((img, imgIndex) => (
                                <div key={imgIndex} className="border-top pt-2 mt-2">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <small>Imagen {imgIndex + 1}</small>
                                        <Button
                                            isDestructive
                                            isSmall
                                            onClick={() => removeImagen(yearIndex, imgIndex)}
                                        >
                                            X
                                        </Button>
                                    </div>

                                    <MediaUpload
                                        onSelect={(media) => updateImagen(yearIndex, imgIndex, 'url', media.url)}
                                        allowedTypes={['image']}
                                        value={img.url}
                                        render={({ open }) => (
                                            <div>
                                                {img.url ? (
                                                    <div>
                                                        <img src={img.url} alt="" style={{ width: '100%', marginBottom: '8px' }} />
                                                        <Button onClick={open} variant="secondary" isSmall>
                                                            Cambiar
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button onClick={open} variant="primary" isSmall>
                                                        Seleccionar
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />

                                    <TextControl
                                        label={__('Descripción', 'jovenemprendedor')}
                                        value={img.caption}
                                        onChange={(value) => updateImagen(yearIndex, imgIndex, 'caption', value)}
                                        placeholder="Descripción de la imagen"
                                    />
                                </div>
                            ))}
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

                    <ul className="nav nav-pills justify-content-center mb-4">
                        {years.map((yearData, index) => (
                            <li key={index} className="nav-item nav-item-gallery">
                                <button className={`nav-link ${index === 0 ? 'active' : ''}`}>
                                    {yearData.year}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="tab-content">
                        {years.map((yearData, yearIndex) => (
                            <div key={yearIndex} className={`tab-pane fade ${yearIndex === 0 ? 'show active' : ''}`}>
                                <div className="row">
                                    {yearData.imagenes.map((img, imgIndex) => (
                                        <div key={imgIndex} className="col-md-4">
                                            <div className="gallery-item">
                                                {img.url ? (
                                                    <>
                                                        <img src={img.url} alt={img.caption} />
                                                        <div className="gallery-overlay">
                                                            <h5>{img.caption}</h5>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                                                        <span className="text-white">Sin imagen</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}