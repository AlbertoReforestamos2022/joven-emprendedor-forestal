<?php
function jef_enqueue() {
    wp_enqueue_style('jef_style', get_stylesheet_uri());
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