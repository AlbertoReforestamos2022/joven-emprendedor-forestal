import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, subtitulo, showButtons, buttonPrimaryText, buttonPrimaryUrl, buttonSecondaryText, buttonSecondaryUrl, stats } = attributes;

    const blockProps = useBlockProps.save({
        className: 'hero-section',
        id: 'inicio'
    });

    return (
        <section {...blockProps}>
            <div className="container hero-content">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <RichText.Content
                            tagName="h1"
                            className="hero-title"
                            value={titulo}
                        />
                        
                        <RichText.Content
                            tagName="p"
                            className="hero-subtitle"
                            value={subtitulo}
                        />

                        {showButtons && (
                            <div className="d-flex gap-3 flex-wrap mb-4">
                                <a href={buttonPrimaryUrl} className="btn btn-primary-custom">
                                    {buttonPrimaryText}
                                </a>
                                <a href={buttonSecondaryUrl} className="btn btn-outline-custom">
                                    {buttonSecondaryText}
                                </a>
                            </div>
                        )}

                        <div className="row mt-5">
                            {stats.map((stat, index) => (
                                <div key={index} className="col-4">
                                    <h3 className="text-white fw-bold">{stat.number}</h3>
                                    <p className="text-white-50">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}