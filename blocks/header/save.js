import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        BackgroundColorNav,
        colorItems,        
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

    const blockProps = useBlockProps.save();

    return (
        <nav {...blockProps} className="navbar navbar-expand-lg navbar-dark fixed-top jef-navbar" style={ {BackgroundColor: BackgroundColorNav, color: colorItems }}>
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
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-item">
                                <a className="nav-link" href={item.url} style={{ color: colorItems }}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}