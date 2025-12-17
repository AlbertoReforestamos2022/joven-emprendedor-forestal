import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion, 
        years,
        usarVerMas,
        imagenesIniciales,
        imagenesPorCarga,
        textoVerMas,
        textoVerMenos,
        verMasButtonBg,
        verMasButtonText,
        backgroundColor,
        tituloColor,
        descripcionColor,
        tabActiveColor,
        tabInactiveColor,
        overlayColor,
        captionTextColor,
        tituloFontSize,
        descripcionFontSize,
        textAlign,
        imagenAltura,
        columnasDesktop
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        id: 'galeria',
        style: {
            backgroundColor: backgroundColor
        }
    });

    return (
        <section {...blockProps}>
            <div className="container">
                <div className="text-center mb-5" style={{ textAlign: textAlign }}>
                    <RichText.Content
                        tagName="h2"
                        className="section-title mb-3"
                        value={titulo}
                        style={{
                            color: tituloColor,
                            fontSize: `${tituloFontSize}px`
                        }}
                    />
                    <RichText.Content
                        tagName="p"
                        className="section-description"
                        value={descripcion}
                        style={{
                            color: descripcionColor,
                            fontSize: `${descripcionFontSize}px`
                        }}
                    />
                </div>

                {/* Tabs */}
                <ul className="nav nav-pills justify-content-center mb-4" role="tablist">
                    {years.map((yearData, index) => (
                        <li key={index} className="nav-item nav-item-gallery" role="presentation">
                            <button 
                                className={`nav-link ${index === 0 ? 'active' : ''}`}
                                data-bs-toggle="pill" 
                                data-bs-target={`#gallery${yearData.year}`}
                                type="button"
                                role="tab"
                                style={{
                                    '--tab-active-bg': tabActiveColor,
                                    '--tab-inactive-color': tabInactiveColor
                                }}
                            >
                                {yearData.year}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                    {years.map((yearData, yearIndex) => {
                        const tabId = `gallery${yearData.year}`;
                        const totalImagenes = yearData.imagenes.length;
                        
                        return (
                            <div 
                                key={yearIndex} 
                                className={`tab-pane fade ${yearIndex === 0 ? 'show active' : ''}`}
                                id={tabId}
                                role="tabpanel"
                            >
                                <div className="row g-3" data-gallery-container={tabId}>
                                    {yearData.imagenes.map((img, imgIndex) => {
                                        const itemClass = usarVerMas && imgIndex >= imagenesIniciales ? 'gallery-item-hidden' : '';
                                        
                                        return (
                                            <div 
                                                key={imgIndex} 
                                                className={`col-md-${12/columnasDesktop} col-6 ${itemClass}`}
                                                data-img-index={imgIndex}
                                            >
                                                <div 
                                                    className="gallery-item"
                                                    style={{ height: `${imagenAltura}px` }}
                                                >
                                                    <img 
                                                        src={img.url} 
                                                        alt={img.caption}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                    {img.caption && (
                                                        <div 
                                                            className="gallery-overlay"
                                                            style={{
                                                                background: overlayColor,
                                                                color: captionTextColor
                                                            }}
                                                        >
                                                            <h5>{img.caption}</h5>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Botón Ver Más */}
                                {usarVerMas && totalImagenes > imagenesIniciales && (
                                    <div className="text-center mt-4">
                                        <button 
                                            className="btn btn-ver-mas-galeria"
                                            data-gallery-id={tabId}
                                            data-inicial={imagenesIniciales}
                                            data-por-carga={imagenesPorCarga}
                                            data-total={totalImagenes}
                                            data-texto-mas={textoVerMas}
                                            data-texto-menos={textoVerMenos}
                                            style={{
                                                backgroundColor: verMasButtonBg,
                                                color: verMasButtonText
                                            }}
                                        >
                                            {textoVerMas} <i className="fas fa-chevron-down ms-2"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}