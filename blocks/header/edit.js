import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, SelectControl, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        siteName, 
        logoType, 
        icon, 
        logoImage, 
        logoAlt, 
        logoWidth, 
        menuItems, 
        logoDosImage, 
        logoDosAlt,
        logoDosWidth 
    } = attributes;

    const blockProps = useBlockProps();

    const updateMenuItem = (index, field, value) => {
        const newItems = [...menuItems];
        newItems[index][field] = value;
        setAttributes({ menuItems: newItems });
    };

    const addMenuItem = () => {
        const newItems = [...menuItems, { label: '', url: '#' }];
        setAttributes({ menuItems: newItems });
    };

    const removeMenuItem = (index) => {
        const newItems = menuItems.filter((_, i) => i !== index);
        setAttributes({ menuItems: newItems });
    };

    const moveMenuItem = (index, direction) => {
        const newItems = [...menuItems];
        const newIndex = index + direction;
        
        if (newIndex >= 0 && newIndex < newItems.length) {
            [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
            setAttributes({ menuItems: newItems });
        }
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configuración del Navbar', 'jovenemprendedor')} initialOpen={true}>
                    <TextControl
                        label={__('Nombre del sitio', 'jovenemprendedor')}
                        value={siteName}
                        onChange={(value) => setAttributes({ siteName: value })}
                    />

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
                            help={__('Ejemplo: fa-tree, fa-leaf, fa-seedling', 'jovenemprendedor')}
                        />
                    )}

                    {logoType === 'image' && (
                        <>
                            <MediaUpload
                                onSelect={(media) => {
                                    setAttributes({ 
                                        logoImage: media.url,
                                        logoAlt: media.alt || siteName
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
                                                        background: '#2e7fb1',
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
                </PanelBody>

                {/* Segundo Logo  */}
                <PanelBody>
                    <MediaUpload
                        onSelect={(media) => {
                            setAttributes({ 
                                logoDosImage: media.url,
                                logoDosAlt: media.alt || siteName
                            });
                        }}
                        allowedTypes={['image']}
                        value={logoDosImage}
                        render={({ open }) => (
                            <div className="mb-3">
                                <p><strong>{__('Logo/Imagen', 'jovenemprendedor')}</strong></p>
                                {logoDosImage ? (
                                    <div>
                                        <img 
                                            src={logoDosImage} 
                                            alt={logoAlt} 
                                            style={{ 
                                                width: logoDosWidth + 'px', 
                                                marginBottom: '8px',
                                                background: '#2e7fb1',
                                                padding: '8px',
                                                borderRadius: '4px'
                                            }} 
                                        />
                                        <div className="d-flex gap-2">
                                            <Button onClick={open} variant="secondary">
                                                Cambiar logo
                                            </Button>
                                            <Button 
                                                onClick={() => setAttributes({ logoDosImage: '' })}
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
                        value={logoDosWidth}
                        onChange={(value) => setAttributes({ logoDosWidth: value })}
                        min={20}
                        max={200}
                    />

                    <TextControl
                        label={__('Texto alternativo', 'jovenemprendedor')}
                        value={logoDosAlt}
                        onChange={(value) => setAttributes({ logoDosAlt: value })}
                    />                    
                </PanelBody>

                <PanelBody title={__('Items del Menú', 'jovenemprendedor')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addMenuItem}
                        className="mb-3"
                    >
                        {__('Agregar Item', 'jovenemprendedor')}
                    </Button>

                    {menuItems.map((item, index) => (
                        <div key={index} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Item {index + 1}</strong>
                                <div className="d-flex gap-1">
                                    <Button
                                        isSmall
                                        onClick={() => moveMenuItem(index, -1)}
                                        disabled={index === 0}
                                    >
                                        ↑
                                    </Button>
                                    <Button
                                        isSmall
                                        onClick={() => moveMenuItem(index, 1)}
                                        disabled={index === menuItems.length - 1}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeMenuItem(index)}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            </div>

                            <TextControl
                                label={__('Texto', 'jovenemprendedor')}
                                value={item.label}
                                onChange={(value) => updateMenuItem(index, 'label', value)}
                            />

                            <TextControl
                                label={__('URL', 'jovenemprendedor')}
                                value={item.url}
                                onChange={(value) => updateMenuItem(index, 'url', value)}
                                placeholder="#seccion"
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <nav {...blockProps} className="navbar navbar-expand-lg navbar-dark jef-navbar">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        {logoType === 'icon' && <i className={`fas ${icon} me-2`}></i>}
                        {logoType === 'image' && logoImage && (
                            <img 
                                src={logoImage} 
                                alt={logoAlt} 
                                className="navbar-logo me-2"
                                style={{ width: logoWidth + 'px', height: 'auto' }}
                            />
                        )}
                        {siteName}
                    </a>
                    {/* Segundo logo */}
                    <a className="navbar-brand" href="#">
                        {logoDosImage && (
                            <img 
                                src={logoDosImage} 
                                alt={logoDosAlt} 
                                className="navbar-logo me-2"
                                style={{ width: logoDosWidth + 'px', height: 'auto' }}
                            />
                        )}
                    </a>                    
                    <button className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            {menuItems.map((item, index) => (
                                <li key={index} className="nav-item">
                                    <a className="nav-link" href={item.url}>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}