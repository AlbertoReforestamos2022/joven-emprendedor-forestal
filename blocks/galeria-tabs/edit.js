import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
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

    const blockProps = useBlockProps({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
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

    const moveYear = (index, direction) => {
        const newYears = [...years];
        const newIndex = index + direction;
        
        if (newIndex >= 0 && newIndex < newYears.length) {
            [newYears[index], newYears[newIndex]] = [newYears[newIndex], newYears[index]];
            setAttributes({ years: newYears });
        }
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
                {/* Colores */}
                <PanelColorSettings
                    title={__('Colores', 'jovenemprendedor')}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Fondo de sección', 'jovenemprendedor')
                        },
                        {
                            value: tituloColor,
                            onChange: (color) => setAttributes({ tituloColor: color }),
                            label: __('Color del título', 'jovenemprendedor')
                        },
                        {
                            value: descripcionColor,
                            onChange: (color) => setAttributes({ descripcionColor: color }),
                            label: __('Color de la descripción', 'jovenemprendedor')
                        },
                        {
                            value: tabActiveColor,
                            onChange: (color) => setAttributes({ tabActiveColor: color }),
                            label: __('Color de tab activo', 'jovenemprendedor')
                        },
                        {
                            value: tabInactiveColor,
                            onChange: (color) => setAttributes({ tabInactiveColor: color }),
                            label: __('Color de tab inactivo', 'jovenemprendedor')
                        },
                        {
                            value: overlayColor,
                            onChange: (color) => setAttributes({ overlayColor: color }),
                            label: __('Color del overlay', 'jovenemprendedor')
                        },
                        {
                            value: captionTextColor,
                            onChange: (color) => setAttributes({ captionTextColor: color }),
                            label: __('Color del texto del caption', 'jovenemprendedor')
                        }
                    ]}
                />

                {/* Tipografía y Diseño */}
                <PanelBody title={__('Diseño', 'jovenemprendedor')} initialOpen={false}>
                    <RangeControl
                        label={__('Tamaño del título (px)', 'jovenemprendedor')}
                        value={tituloFontSize}
                        onChange={(value) => setAttributes({ tituloFontSize: value })}
                        min={20}
                        max={80}
                    />

                    <RangeControl
                        label={__('Tamaño de la descripción (px)', 'jovenemprendedor')}
                        value={descripcionFontSize}
                        onChange={(value) => setAttributes({ descripcionFontSize: value })}
                        min={12}
                        max={32}
                    />

                    <SelectControl
                        label={__('Alineación del encabezado', 'jovenemprendedor')}
                        value={textAlign}
                        options={[
                            { label: 'Izquierda', value: 'left' },
                            { label: 'Centro', value: 'center' },
                            { label: 'Derecha', value: 'right' }
                        ]}
                        onChange={(value) => setAttributes({ textAlign: value })}
                    />

                    <RangeControl
                        label={__('Altura de imágenes (px)', 'jovenemprendedor')}
                        value={imagenAltura}
                        onChange={(value) => setAttributes({ imagenAltura: value })}
                        min={200}
                        max={600}
                    />

                    <RangeControl
                        label={__('Columnas en desktop', 'jovenemprendedor')}
                        value={columnasDesktop}
                        onChange={(value) => setAttributes({ columnasDesktop: value })}
                        min={2}
                        max={4}
                        help={__('Cantidad de imágenes por fila', 'jovenemprendedor')}
                    />
                </PanelBody>

                {/* NUEVO: Configuración "Ver Más" */}
                <PanelBody title={__('Configuración "Ver Más"', 'jovenemprendedor')} initialOpen={false}>
                    <ToggleControl
                        label={__('Activar "Ver más"', 'jovenemprendedor')}
                        checked={usarVerMas}
                        onChange={(value) => setAttributes({ usarVerMas: value })}
                        help={__('Muestra imágenes de forma progresiva', 'jovenemprendedor')}
                    />

                    {usarVerMas && (
                        <>
                            <RangeControl
                                label={__('Imágenes iniciales', 'jovenemprendedor')}
                                value={imagenesIniciales}
                                onChange={(value) => setAttributes({ imagenesIniciales: value })}
                                min={3}
                                max={20}
                                help={__('Cantidad de imágenes a mostrar inicialmente', 'jovenemprendedor')}
                            />

                            <RangeControl
                                label={__('Imágenes por carga', 'jovenemprendedor')}
                                value={imagenesPorCarga}
                                onChange={(value) => setAttributes({ imagenesPorCarga: value })}
                                min={3}
                                max={20}
                                help={__('Cantidad de imágenes adicionales al hacer clic en "Ver más"', 'jovenemprendedor')}
                            />

                            <TextControl
                                label={__('Texto "Ver más"', 'jovenemprendedor')}
                                value={textoVerMas}
                                onChange={(value) => setAttributes({ textoVerMas: value })}
                            />

                            <TextControl
                                label={__('Texto "Ver menos"', 'jovenemprendedor')}
                                value={textoVerMenos}
                                onChange={(value) => setAttributes({ textoVerMenos: value })}
                            />

                            <p><strong>{__('Colores del botón "Ver más"', 'jovenemprendedor')}</strong></p>
                            <PanelColorSettings
                                title={__('Botón Ver Más', 'jovenemprendedor')}
                                colorSettings={[
                                    {
                                        value: verMasButtonBg,
                                        onChange: (color) => setAttributes({ verMasButtonBg: color }),
                                        label: __('Color de fondo', 'jovenemprendedor')
                                    },
                                    {
                                        value: verMasButtonText,
                                        onChange: (color) => setAttributes({ verMasButtonText: color }),
                                        label: __('Color del texto', 'jovenemprendedor')
                                    }
                                ]}
                            />
                        </>
                    )}
                </PanelBody>

                {/* Años y Galerías */}
                <PanelBody title={__('Años y Galerías', 'jovenemprendedor')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addYear}
                        className="mb-3"
                    >
                        {__('Agregar Año', 'jovenemprendedor')}
                    </Button>

                    {years.map((yearData, yearIndex) => (
                        <div key={yearIndex} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <strong>Año {yearIndex + 1}</strong>
                                <div className="d-flex gap-1">
                                    <Button
                                        isSmall
                                        onClick={() => moveYear(yearIndex, -1)}
                                        disabled={yearIndex === 0}
                                    >
                                        ↑
                                    </Button>
                                    <Button
                                        isSmall
                                        onClick={() => moveYear(yearIndex, 1)}
                                        disabled={yearIndex === years.length - 1}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeYear(yearIndex)}
                                    >
                                        ✕
                                    </Button>
                                </div>
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
                                <div key={imgIndex} className="border p-2 mb-2" style={{ background: 'white', borderRadius: '4px' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <small><strong>Imagen {imgIndex + 1}</strong></small>
                                        <Button
                                            isDestructive
                                            isSmall
                                            onClick={() => removeImagen(yearIndex, imgIndex)}
                                        >
                                            ✕
                                        </Button>
                                    </div>

                                    <MediaUpload
                                        onSelect={(media) => updateImagen(yearIndex, imgIndex, 'url', media.url)}
                                        allowedTypes={['image']}
                                        value={img.url}
                                        render={({ open }) => (
                                            <div className="mb-2">
                                                {img.url ? (
                                                    <div>
                                                        <img 
                                                            src={img.url} 
                                                            alt="" 
                                                            style={{ 
                                                                width: '100%', 
                                                                height: '150px',
                                                                objectFit: 'cover',
                                                                marginBottom: '8px',
                                                                borderRadius: '4px'
                                                            }} 
                                                        />
                                                        <div className="d-flex gap-2">
                                                            <Button onClick={open} variant="secondary" isSmall>
                                                                Cambiar
                                                            </Button>
                                                            <Button 
                                                                onClick={() => updateImagen(yearIndex, imgIndex, 'url', '')}
                                                                isDestructive
                                                                isSmall
                                                            >
                                                                Quitar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Button onClick={open} variant="primary" isSmall>
                                                        Seleccionar imagen
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
                    <div className="text-center mb-5" style={{ textAlign: textAlign }}>
                        <RichText
                            tagName="h2"
                            className="section-title mb-3"
                            value={titulo}
                            onChange={(value) => setAttributes({ titulo: value })}
                            placeholder="Título"
                            style={{
                                color: tituloColor,
                                fontSize: `${tituloFontSize}px`
                            }}
                        />
                        <RichText
                            tagName="p"
                            className="section-description"
                            value={descripcion}
                            onChange={(value) => setAttributes({ descripcion: value })}
                            placeholder="Descripción"
                            style={{
                                color: descripcionColor,
                                fontSize: `${descripcionFontSize}px`
                            }}
                        />
                    </div>

                    {/* Tabs */}
                    <ul className="nav nav-pills justify-content-center mb-4">
                        {years.map((yearData, index) => (
                            <li key={index} className="nav-item nav-item-gallery">
                                <button 
                                    className={`nav-link ${index === 0 ? 'active' : ''}`}
                                    style={{
                                        backgroundColor: index === 0 ? tabActiveColor : 'transparent',
                                        color: index === 0 ? '#ffffff' : tabInactiveColor,
                                        borderColor: index === 0 ? tabActiveColor : tabInactiveColor
                                    }}
                                >
                                    {yearData.year || `Año ${index + 1}`}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Tab Content Preview */}
                    <div className="tab-content">
                        {years.map((yearData, yearIndex) => (
                            <div key={yearIndex} className={`tab-pane fade ${yearIndex === 0 ? 'show active' : ''}`}>
                                <div className="row g-3">
                                    {yearData.imagenes.map((img, imgIndex) => (
                                        <div key={imgIndex} className={`col-md-${12/columnasDesktop}`}>
                                            <div 
                                                className="gallery-item"
                                                style={{ height: `${imagenAltura}px` }}
                                            >
                                                {img.url ? (
                                                    <>
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
                                                    </>
                                                ) : (
                                                    <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
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