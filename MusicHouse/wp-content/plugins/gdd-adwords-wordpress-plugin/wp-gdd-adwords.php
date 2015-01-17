<?php
/*
Plugin Name: WP GDD Adwords 
Plugin URI: http://www.gdd.ro/wp-plugins
Description: This plugin places adwords links in a post.
Author: Emiliani
Version: 1.1
Author URI: http://www.gdd.ro/

Changes:

08/01/09: Version 1.0
	Initial release.
08/02/09: Version 1.1
	Fixed a bug and improved the search&replace routine in patterns	

*/

/*
Copyright (C) 2009 emiliani (emiliani AT gmail DOT com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/



function GddAdwords($content)
{
if(is_single())
{
$opt_name = 'gdd_gddadwords';
$opt_nameuri = 'gdd_gddadwordsuri';
$opt_target = 'gdd_gddadwordstarget';
    // Read in existing option value from database
    $opt_val = stripslashes (get_option( $opt_name ));
    $opt_valuri = stripslashes (get_option( $opt_nameuri ));
    $opt_valtarget = stripslashes (get_option( $opt_target ));

    //if($opt_val==""){ $opt_val = 'gddadwords'; }
    if($opt_valuri==""){ $opt_valuri = '#'; } // default if no link provided

$keyword_list = $opt_val;
$pieces = explode(",", $keyword_list);
	foreach ($pieces as $value) {
			$patterns = '/' . preg_quote($value, '/') . '(?![^<]*?>)/';
			$replacements= "<a href='".$opt_valuri."' ".$opt_valtarget.">".$value."</a>";
			$content = preg_replace($patterns, $replacements, $content);
	}	
}
  return $content;
}



add_filter('the_content','GddAdwords');


// Hook for adding admin menus
add_action('admin_menu', 'gdd_gdd_pages');

// action function for above hook
function gdd_gdd_pages() {
    // Add a new submenu under Options:
    add_options_page('GDD Adwords', 'GDD Adwords', 8, 'gddoptions', 'gdd_options_page');
}

// gdd_options_page() displays the page content for the Options submenu
function gdd_options_page() {

    // variables for the field and option names 
    $opt_name = 'gdd_gddadwords';
    $opt_nameuri = 'gdd_gddadwordsuri';
    $opt_target = 'gdd_gddadwordstarget';
    $hidden_field_name = 'gdd_gddsubmit_hidden';
    $data_field_name = 'gdd_gddadwords';
    $data_uri_name = 'gdd_gddadwordsuri';
    $data_uri_target = 'gdd_gddadwordstarget';

    // Read in existing option value from database
    $opt_val = stripslashes(get_option( $opt_name ));
    $opt_valuri = stripslashes(get_option( $opt_nameuri ));
    $opt_valtarget = stripslashes(get_option( $opt_target ));

   // if($opt_val=="")   { $opt_val = 'list of keywords here (comma separated!)';   }

    // See if the user has posted us some information
    // If they did, this hidden field will be set to 'Y'
    if( $_POST[ $hidden_field_name ] == 'Y' ) {
        // Read their posted value
        $opt_val = stripslashes($_POST[ $data_field_name ]);
        $opt_valuri = stripslashes($_POST[ $data_uri_name ]);
		$opt_valtarget = preg_replace('/"/', "'", $_POST[ $data_uri_target ]);
        $opt_valtarget = stripslashes($opt_valtarget);

        // Save the posted value in the database
        update_option( $opt_name, $opt_val );
        update_option( $opt_nameuri, $opt_valuri );
        update_option( $opt_target,  $opt_valtarget );

        // Put an options updated message on the screen

?>
<div class="updated"><p><strong><?php _e('Options saved.', 'gdd_trans_domain' ); ?></strong></p></div>
<?php

}

    // Now display the options editing screen

    echo '<div class="wrap">';

    // header

    echo "<h2>" . __( 'GDD-ADWORDS Plugin Options', 'gdd_trans_domain' ) . "</h2>";

    // options form
    
    ?>

<form name="form1" method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
<input type="hidden" name="<?php echo $hidden_field_name; ?>" value="Y">

<p><b><?php _e("Your Adwords list (comma separated):", 'gdd_trans_domain' ); ?> </b><br />
<textarea style="font-size:11px;color:#467EDD;" cols="80" rows="10" name="<?php echo $data_field_name; ?>"><?php echo $opt_val; ?></textarea>
</p>
<p><b><?php _e("Url to link adwords:", 'gdd_trans_domain' ); ?> </b><br />
<input style="font-size:11px;color:#467EDD;" type="text" accept="text/html" name="<?php echo $data_uri_name; ?>" value="<?php echo $opt_valuri; ?>" size="83" title="campain url"></p>

<p><b><?php _e("Other URL specific statements</b> (target=\"_blank\" rel=\"nofollow\") <i>*optional</i>: ", 'gdd_trans_domain' ); ?> <br />
<input style="font-size:11px;color:#467EDD;" type="text" accept="text/html" name="<?php echo $data_uri_target; ?>"  value="<?php echo $opt_valtarget; ?>" size="83" title="link target"><br>
<i><a href="http://www.w3schools.com/TAGS/tag_a.asp" title="read some help on html link Definition and Usage" target="_blank" rel="nofollow">see more on HTML A Tag statements definition and usage</a></i>
</p>
<hr />


<p class="submit">
<input type="submit" name="Submit" value="<?php _e('Update Options', 'gdd_trans_domain' ) ?>" />
</p>

</form>
</div>

<?php

}

?>