import { RichText, useBlockProps } from '@wordpress/block-editor'; 

export default function save( {  attributes} ) {
    const { titulo, descripcion, backgroundColor, textColor } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        id: 'about',
        style: {
            backgroundColor: backgroundColor,
            color: textColor,
        }
    }); 


    return(
        <section {...blockProps}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <RichText.Content
                            tagName="h2"
                            className="section-title"
                            value={titulo}
                        />

                        <RichText.Content
                            tagName="p"
                            className="project-content mt-4"
                            value={descripcion}
                        />
                    </div>
                </div>
            </div>
        </section>

    )
}