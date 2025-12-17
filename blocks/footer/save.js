import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
        className: 'jef-footer'
    });

    return (
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
    );
}