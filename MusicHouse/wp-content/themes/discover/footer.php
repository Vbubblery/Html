	<!--footer-->
		
		<div id="footer-container">

	<!--footer container--><div class="row">
		
		<div class="twelve columns" id="footer-widget">
			
			<?php
			get_sidebar( 'footer' );
			?>
			
			</div><!--footer widget end-->
			
		</div><!-- footer container-->
					
	</div>
	
			<div id="footer-info">

				<!--footer container--><div class="row">
				
		<div class="twelve columns">					
			
			<div id="copyright"><?php _e( 'Copyright', 'discover' ); ?> <?php echo date( 'Y' ); ?> <?php echo esc_html(of_get_option('footer_cr')); ?> | <?php _e( 'Powered by', 'discover' ); ?> <a href="http://www.wordpress.org"><?php _e( 'WordPress', 'discover' ); ?></a> | <?php _e( 'discover theme by', 'discover' ); ?> <a href="http://www.antthemes.com"><?php _e( 'antthemes', 'discover' ); ?></a></div>
			
			<div class="scroll-top"><a href="#scroll-top" title="<?php esc_attr_e( 'scroll to top', 'discover' ); ?>"><?php _e( '&uarr;', 'discover' ); ?></a></div>
					
				</div>	
			</div>		
			</div><!--footer info end-->
	
	<?php wp_footer(); ?>
<!-- Piwik -->
<script type="text/javascript">
  var _paq = _paq || [];
  _paq.push(["setCookieDomain", "*.localhost"]);
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);

  (function() {
    var u=(("https:" == document.location.protocol) ? "https" : "http") + "://localhost/piwik/";
    _paq.push(["setTrackerUrl", u+"piwik.php"]);
    _paq.push(["setSiteId", "1"]);
    var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
    g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Piwik Code -->

</body>

</html>