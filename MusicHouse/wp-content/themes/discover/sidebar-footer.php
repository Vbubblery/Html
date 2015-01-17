<div id="footer-bar1" class="four columns">
<?php if ( is_active_sidebar( 'first-footer-widget-area' ) ) { ?>
					<ul class="xoxo">
						<?php dynamic_sidebar( 'first-footer-widget-area' ); ?>
					</ul>
					
					<?php } else { ?>
			
			<ul class="xoxo">
						<li class="widget-container"><h3 class="widget-title">Meta</h3>			<ul>
			<li>SUPINFO</li>			<li>Music Video</li>
			<li>Entries <abbr title="Really Simple Syndication">RSS</abbr></li>
			<li>Comments <abbr title="Really Simple Syndication">RSS</abbr></li>
			
						</ul>	</li>	</ul>				
					
<?php } ?>

</div><!--footer 1 end-->



<div id="footer-bar2" class="four columns">
<?php if ( is_active_sidebar( 'second-footer-widget-area' ) ) { ?>
					<ul class="xoxo">
						<?php dynamic_sidebar( 'second-footer-widget-area' ); ?>
					</ul>
<?php } else { ?>
		<ul class="xoxo">
	<li class="widget-container"><h3 class="widget-title">About us</h3><div class="textwidget">We are try our best to share the beautiful music video to you .we hope music , music video can reduce your pressure.</div>
		</li></ul>
				
<?php } ?>
</div><!--footer 2 end-->


<div id="footer-bar3" class="four columns">
<?php if ( is_active_sidebar( 'third-footer-widget-area' ) ) { ?>
					<ul class="xoxo">
						<?php dynamic_sidebar( 'third-footer-widget-area' ); ?>
					</ul>
					
	<?php } else { ?>
		<ul class="xoxo">
	<li class="widget-container"><h3 class="widget-title">Contact us</h3><div class="textwidget">About the House . If you want to john us or any advice, any question. You could tell us by email: 157292@supinfo.com</div>
		</li></ul>
				
<?php } ?>
</div><!--footer 3 end-->