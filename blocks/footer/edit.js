import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, SelectControl, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        logoType,
        icon, 
        logoImage,
        logoAlt,
        logoWidth,
        titulo, 
        descripcion, 
        tituloEnlaces, 
        enlaces, 
        tituloRedes, 
        redes, 
        copyright 
    } = attributes;

    const blockProps = useBlockProps({
        className: 'jef-footer'
    });

    // Funciones para Enlaces
    const updateEnlace = (index, field, value) => {
        const newEnlaces = [...enlaces];
        newEnlaces[index][field] = value;
        setAttributes({ enlaces: newEnlaces });
    };

    const addEnlace = () => {
        setAttributes({ enlaces: [...enlaces, { label: '', url: '#' }] });
    };

    const removeEnlace = (index) => {
        const newEnlaces = enlaces.filter((_, i) => i !== index);
        setAttributes({ enlaces: newEnlaces });
    };

    // Funciones para Redes Sociales
    const updateRed = (index, field, value) => {
        const newRedes = [...redes];
        newRedes[index][field] = value;
        setAttributes({ redes: newRedes });
    };

    const addRed = () => {
        setAttributes({ redes: [...redes, { icon: 'fa-link', url: '#' }] });
    };

    const removeRed = (index) => {
        const newRedes = redes.filter((_, i) => i !== index);
        setAttributes({ redes: newRedes });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Información Principal', 'jovenemprendedor')} initialOpen={true}>
                    <SelectControl
                        label={__('Tipo de logo', 'jovenemprendedor')}
                        value={logoType}
                        options={[
                            { label: 'Ícono (Font Awesome)', value: 'icon' },
                            { label: 'Imagen/Logo', value: 'image' },
                            { label: 'Sin logo', value: 'none' }
                        ]}
                        onChange={(value) => setAttributes({ logoType: value })}
                    />

                    {logoType === 'icon' && (
                        <TextControl
                            label={__('Ícono (Font Awesome)', 'jovenemprendedor')}
                            value={icon}
                            onChange={(value) => setAttributes({ icon: value })}
                            help={__('Ejemplo: fa-tree, fa-leaf', 'jovenemprendedor')}
                        />
                    )}

                    {logoType === 'image' && (
                        <>
                            <MediaUpload
                                onSelect={(media) => {
                                    setAttributes({ 
                                        logoImage: media.url,
                                        logoAlt: media.alt || titulo
                                    });
                                }}
                                allowedTypes={['image']}
                                value={logoImage}
                                render={({ open }) => (
                                    <div className="mb-3">
                                        <p><strong>{__('Logo/Imagen', 'jovenemprendedor')}</strong></p>
                                        {logoImage ? (
                                            <div>
                                                <img 
                                                    src={logoImage} 
                                                    alt={logoAlt} 
                                                    style={{ 
                                                        width: logoWidth + 'px', 
                                                        marginBottom: '8px',
                                                        background: '#1e5a7f',
                                                        padding: '8px',
                                                        borderRadius: '4px'
                                                    }} 
                                                />
                                                <div className="d-flex gap-2">
                                                    <Button onClick={open} variant="secondary">
                                                        Cambiar logo
                                                    </Button>
                                                    <Button 
                                                        onClick={() => setAttributes({ logoImage: '' })}
                                                        isDestructive
                                                    >
                                                        Quitar
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button onClick={open} variant="primary">
                                                Seleccionar logo
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />

                            <RangeControl
                                label={__('Ancho del logo (px)', 'jovenemprendedor')}
                                value={logoWidth}
                                onChange={(value) => setAttributes({ logoWidth: value })}
                                min={20}
                                max={200}
                            />

                            <TextControl
                                label={__('Texto alternativo', 'jovenemprendedor')}
                                value={logoAlt}
                                onChange={(value) => setAttributes({ logoAlt: value })}
                            />
                        </>
                    )}

                    <TextControl
                        label={__('Título', 'jovenemprendedor')}
                        value={titulo}
                        onChange={(value) => setAttributes({ titulo: value })}
                    />

                    <TextControl
                        label={__('Descripción', 'jovenemprendedor')}
                        value={descripcion}
                        onChange={(value) => setAttributes({ descripcion: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Enlaces Rápidos', 'jovenemprendedor')}>
                    <TextControl
                        label={__('Título de sección', 'jovenemprendedor')}
                        value={tituloEnlaces}
                        onChange={(value) => setAttributes({ tituloEnlaces: value })}
                    />

                    <Button 
                        variant="primary" 
                        onClick={addEnlace}
                        className="mb-3"
                    >
                        {__('Agregar Enlace', 'jovenemprendedor')}
                    </Button>

                    {enlaces.map((enlace, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Enlace {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeEnlace(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Texto', 'jovenemprendedor')}
                                value={enlace.label}
                                onChange={(value) => updateEnlace(index, 'label', value)}
                            />

                            <TextControl
                                label={__('URL', 'jovenemprendedor')}
                                value={enlace.url}
                                onChange={(value) => updateEnlace(index, 'url', value)}
                            />
                        </div>
                    ))}
                </PanelBody>

                <PanelBody title={__('Redes Sociales', 'jovenemprendedor')}>
                    <TextControl
                        label={__('Título de sección', 'jovenemprendedor')}
                        value={tituloRedes}
                        onChange={(value) => setAttributes({ tituloRedes: value })}
                    />

                    <Button 
                        variant="primary" 
                        onClick={addRed}
                        className="mb-3"
                    >
                        {__('Agregar Red Social', 'jovenemprendedor')}
                    </Button>

                    <p className="text-muted small">
                        Íconos: fa-facebook, fa-instagram, fa-twitter, fa-youtube, fa-linkedin, fa-tiktok
                    </p>

                    {redes.map((red, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Red {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeRed(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Ícono', 'jovenemprendedor')}
                                value={red.icon}
                                onChange={(value) => updateRed(index, 'icon', value)}
                            />

                            <TextControl
                                label={__('URL', 'jovenemprendedor')}
                                value={red.url}
                                onChange={(value) => updateRed(index, 'url', value)}
                            />
                        </div>
                    ))}
                </PanelBody>

                <PanelBody title={__('Copyright', 'jovenemprendedor')}>
                    <TextControl
                        label={__('Texto de copyright', 'jovenemprendedor')}
                        value={copyright}
                        onChange={(value) => setAttributes({ copyright: value })}
                        help={__('Puedes usar HTML como &copy; para ©', 'jovenemprendedor')}
                    />
                </PanelBody>
            </InspectorControls>

            <footer {...blockProps}>
                <div className="container">
                    <div className="row">
                        {/* Columna 1: Info */}
                        <div className="col-md-4 mb-4">
                            <h5 className="fw-bold mb-3 d-flex align-items-center">
                                {logoType === 'icon' && <i className={`fas ${icon} me-2`}></i>}
                                {logoType === 'image' && logoImage && (
                                    <img 
                                        src={logoImage} 
                                        alt={logoAlt} 
                                        className="footer-logo me-2"
                                        style={{ width: logoWidth + 'px', height: 'auto' }}
                                    />
                                )}
                                {titulo}
                            </h5>
                            <p>{descripcion}</p>
                        </div>

                        {/* Columna 2: Enlaces */}
                        <div className="col-md-4 mb-4">
                            <h5 className="fw-bold mb-3">{tituloEnlaces}</h5>
                            <ul className="list-unstyled">
                                {enlaces.map((enlace, index) => (
                                    <li key={index}>
                                        <a href={enlace.url}>{enlace.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Columna 3: Redes */}
                        <div className="col-md-4 mb-4">
                            <h5 className="fw-bold mb-3">{tituloRedes}</h5>
                            <div className="d-flex gap-3">
                                {redes.map((red, index) => (
                                    <a key={index} href={red.url} className="text-white fs-4">
                                        <i className={`fab ${red.icon}`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                    
                    <div className="text-center">
                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: copyright }}></p>
                    </div>
                </div>
            </footer>
        </>
    );
}