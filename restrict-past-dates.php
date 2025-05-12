<?php
/**
 * Plugin Name: Restrict Past Dates for Forms
 * Description: Disables past dates in any form's day/month/year select fields.
 * Version: 2.1
 * Author: Sheikh Abdul Fahad
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Enqueue our JS
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script(
        'restrict-past-dates',
        plugin_dir_url(__FILE__) . 'restrict-past-dates.js',
        ['jquery'], // dependency
        '1.1',
        true // load in footer
    );
});
