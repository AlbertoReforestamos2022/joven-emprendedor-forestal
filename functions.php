<?php
function jef_enqueue() {
    wp_enqueue_style('jef_style', get_stylesheet_uri());

    # Font Awesome
    wp_enqueue_style(
        'font-awesome-editor',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        array(),
        '6.4.0'
    );
}
add_action('wp_enqueue_scripts', 'jef_enqueue'); 

// cargar los bloques personalizados
function jef_register_blocks() {
    foreach ( glob( get_theme_file_path( 'blocks/*/block.json' ) ) as $block_json ) {
        register_block_type( $block_json );
    }
}

add_action( 'init', 'jef_register_blocks' );

# Encolar build/index.js
function jef_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'jef-blocks-editor',
        get_theme_file_uri('build/index.js'),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
        filemtime(get_theme_file_path('build/index.js'))
    );
}
add_action('enqueue_block_editor_assets', 'jef_enqueue_block_editor_assets');

// Encolar estilos de bloques en el FRONTEND
function jef_enqueue_block_assets() {
    if (file_exists(get_theme_file_path('build/style-index.css'))) {
        wp_enqueue_style(
            'jef-blocks-style',
            get_theme_file_uri('build/style-index.css'),
            array(),
            filemtime(get_theme_file_path('build/style-index.css'))
        );
    }
}
add_action('wp_enqueue_scripts', 'jef_enqueue_block_assets');

## Material Icons
function jef_enqueue_material_icons() {
    wp_enqueue_style(
        'material-icons',
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
        array(),
        null
    );
}
add_action('wp_enqueue_scripts', 'jef_enqueue_material_icons');
add_action('enqueue_block_editor_assets', 'jef_enqueue_material_icons'); // También en el editor

# Crear una nueva categoria en el tema 
function jef_custom_block_categories( $categories ) {
    return array_merge(
        array(
            array(
                'slug'   => 'jef-theme',
                'title' => 'Joven Emprendedor Forestal',
            ),
        ),
        $categories

        );
}
add_filter('block_categories_all', 'jef_custom_block_categories', 10, 2);


# Agregar Bootstrap desde CDN
function jef_enqueue_bootstrap_cdn() {
    wp_enqueue_style('boostrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', array(), null ); 
    wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', array(), null, true);
}
add_action('init', 'jef_enqueue_bootstrap_cdn'); 


# Agregar estilos al editor
function jef_enqueue_editor_styles() {
    # Bootstrap
    wp_enqueue_style(
        'bootstrap-editor',
        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css',
        array(),
        '5.3.2'
    );
    
    # Font Awesome
    wp_enqueue_style(
        'font-awesome-editor',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        array(),
        '6.4.0'
    );
    
    # Estilos del tema
    wp_enqueue_style(
        'jef-theme-editor',
        get_stylesheet_uri(),
        array('bootstrap-editor'),
        filemtime(get_stylesheet_directory() . '/style.css')
    );
    
    # Estilos compilados de bloques (si existen)
    if (file_exists(get_theme_file_path('build/style-index.css'))) {
        wp_enqueue_style(
            'jef-blocks-editor',
            get_theme_file_uri('build/style-index.css'),
            array(),
            filemtime(get_theme_file_path('build/style-index.css'))
        );
    }
}
add_action('enqueue_block_editor_assets', 'jef_enqueue_editor_styles');


// Script para funcionalidad "Ver más" en Galería con Tabs
function jef_galeria_ver_mas_script() {
    ?>
    <script>
    (function() {
        'use strict';
        
        function initGaleriaVerMas() {
            const botonesVerMas = document.querySelectorAll('.btn-ver-mas-galeria');
            
            if (botonesVerMas.length === 0) {
                return;
            }
            
            console.log('Botones "Ver más" en galería encontrados:', botonesVerMas.length);
            
            botonesVerMas.forEach((boton) => {
                // Estado inicial
                boton.mostradosActual = parseInt(boton.dataset.inicial);
                boton.expandido = false;
                
                boton.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const inicial = parseInt(this.dataset.inicial);
                    const porCarga = parseInt(this.dataset.porCarga);
                    const total = parseInt(this.dataset.total);
                    const textoMas = this.dataset.textoMas;
                    const textoMenos = this.dataset.textoMenos;
                    const galleryId = this.dataset.galleryId;
                    
                    console.log('Click en botón - Gallery ID:', galleryId);
                    
                    const container = document.querySelector(`[data-gallery-container="${galleryId}"]`);
                    
                    if (!container) {
                        console.error('Container no encontrado:', galleryId);
                        return;
                    }
                    
                    const items = container.querySelectorAll('[data-img-index]');
                    console.log('Items encontrados:', items.length);
                    
                    if (this.expandido) {
                        // COLAPSAR
                        console.log('Colapsando...');
                        
                        items.forEach((item, index) => {
                            if (index >= inicial) {
                                item.classList.add('gallery-item-hidden');
                            }
                        });
                        
                        this.innerHTML = textoMas + ' <i class="fas fa-chevron-down ms-2"></i>';
                        this.expandido = false;
                        this.mostradosActual = inicial;
                        
                        // Scroll al tab activo
                        const tabPane = container.closest('.tab-pane');
                        if (tabPane) {
                            tabPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        
                    } else {
                        // EXPANDIR
                        const nuevosHasta = Math.min(this.mostradosActual + porCarga, total);
                        
                        console.log('Expandiendo de', this.mostradosActual, 'hasta', nuevosHasta);
                        
                        for (let i = this.mostradosActual; i < nuevosHasta; i++) {
                            if (items[i]) {
                                console.log('Mostrando item', i);
                                items[i].classList.remove('gallery-item-hidden');
                            }
                        }
                        
                        this.mostradosActual = nuevosHasta;
                        
                        if (nuevosHasta >= total) {
                            this.innerHTML = textoMenos + ' <i class="fas fa-chevron-up ms-2"></i>';
                            this.expandido = true;
                        } else {
                            const restantes = total - nuevosHasta;
                            this.innerHTML = textoMas + ' (' + restantes + ' restantes) <i class="fas fa-chevron-down ms-2"></i>';
                        }
                    }
                    
                    console.log('Estado actual - Mostrados:', this.mostradosActual, 'Expandido:', this.expandido);
                });
            });
        }
        
        // Ejecutar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initGaleriaVerMas);
        } else {
            initGaleriaVerMas();
        }
        
        // Reinicializar cuando se cambie de tab
        document.addEventListener('shown.bs.tab', function (event) {
            console.log('Tab cambiado, reinicializando botones...');
            
            // Resetear todos los botones
            const botonesVerMas = document.querySelectorAll('.btn-ver-mas-galeria');
            botonesVerMas.forEach((boton) => {
                const inicial = parseInt(boton.dataset.inicial);
                const textoMas = boton.dataset.textoMas;
                const galleryId = boton.dataset.galleryId;
                
                boton.mostradosActual = inicial;
                boton.expandido = false;
                boton.innerHTML = textoMas + ' <i class="fas fa-chevron-down ms-2"></i>';
                
                // Ocultar imágenes que deberían estar ocultas
                const container = document.querySelector(`[data-gallery-container="${galleryId}"]`);
                if (container) {
                    const items = container.querySelectorAll('[data-img-index]');
                    items.forEach((item, index) => {
                        if (index >= inicial) {
                            item.classList.add('gallery-item-hidden');
                        } else {
                            item.classList.remove('gallery-item-hidden');
                        }
                    });
                }
            });
        });
    })();
    </script>
    <?php
}
add_action('wp_footer', 'jef_galeria_ver_mas_script');