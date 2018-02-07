<?php
/*
* Plugin Name: edit-frontend-via-REST API
* Description: To add JS frontend editing via REST API
* Author: AJ
*
*/

function editFrontEndViaREST() {
  $user = wp_get_current_user();
  	$allowed_roles = array('editor', 'administrator', 'author');


  	if(array_intersect($allowed_roles, $user->roles ) && is_single()) { /* Läser scriptet om man är inloggade som administrator, author och editor */
wp_enqueue_script('edit-frontend-via-rest', plugin_dir_url(__FILE__). /* Får filens directory istället för att skriva hela directoryn så får den pluginens directory */
'js/edit-frontend-via-rest.js', array('jquery'), 0.1, true); /* Därifrån kan man sedan navigera till js foldern och köra js scriptet */

wp_localize_script('edit-frontend-via-rest', 'WPsettings', array(
  'root' => esc_url_raw(rest_url()), /* Får url till rest_url */
  'nonce' => wp_create_nonce('wp_rest'), /* Skapar en "key" för att verifiera eventet bunden till användaren */
  'current_ID' => get_the_ID() /* Hämtar id för specifika posten */
));
}
}
add_action('wp_enqueue_scripts', 'editFrontEndViaREST'); /* När wp_enqueue_scripts läses in så startar den (editFrontEndViaREST) funktionen */

 ?>
