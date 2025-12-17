import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, PanelColorSettings } from "@wordpress/block-editor"; 
import { PanelBody, Button, Placeholder, TextControl } from "@wordpress/components"; 

export default function Edit({ attributes, setAttributes }){
    const { titulo, descripcion, backgroundColor, textColor } = attributes; 

    const blockProps = useBlockProps({
        className : 'py-5',
        id: 'about',
        style: {
            backgroundColor: backgroundColor,
            color: textColor
        }
    }); 

    return(
        <>
            {/* ← AGREGAR InspectorControls */}
            <InspectorControls>
                <PanelColorSettings
                    title={__('Colores', 'jovenemprendedorforestal')}
                    colorSettings={[  
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Color de fondo', 'jovenemprendedorforestal')
                        },
                        {
                            value: textColor,
                            onChange: (color) => setAttributes({ textColor: color }),
                            label: __('Color del texto', 'jovenemprendedorforestal')
                        }
                    ]}
                />
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <RichText 
                                tagName="h2"
                                className="section-title"
                                value={titulo}
                                onChange={value => setAttributes({ titulo: value })}
                                placeholder="Escribe un titulo"  // ← CAMBIO: minúscula
                            />

                            <RichText
                                tagName="p"
                                className="project-content mt-4"
                                value={descripcion}
                                onChange={value => setAttributes({ descripcion: value })}
                                placeholder="Escribe una descripción"
                            />
                        </div>
                    </div>
                </div> 
            </section>
        </>
    );
}