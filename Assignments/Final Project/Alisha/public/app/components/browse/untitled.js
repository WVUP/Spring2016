
.state('genre', {
			url: '/genre',
			templateUrl: 'app/shared_components/genre.html'
		})

<!-- ************* 
Genre Carousel Directive
*************** -->
<div class"well">
<div id="myCarousel" class="carousel slide" data-ride="carousel">
 
  <!-- Wrapper for slides  do an api and an ng-repeat -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
    	<div class="row">
      		<div class="col-sm-3">
      			<img src="http://placehold.it/280x180" alt="image">
      		</div>
      		<div class="carousel-caption">
        		...
      		</div><!-- /col-sm-3 -->
      		<div class="col-sm-3">
      			<img src="http://placehold.it/280x180" alt="image">
      		</div>
      		<div class="carousel-caption">
        		...
      		</div><!-- /col-sm-3 -->
      		<div class="col-sm-3">
      			<img src="http://placehold.it/280x180" alt="image">
      		</div>
      		<div class="carousel-caption">
        		...
      		</div><!-- /col-sm-3 -->
      		<div class="col-sm-3">
      			<img src="http://placehold.it/280x180" alt="image">
      		</div>
      		<div class="carousel-caption">
        		...
      		</div><!-- /col-sm-3 -->

      	</div><!-- /row -->
	</div><!-- /item active -->

    <div class="item">
    	<div class="row">
      		<div class="col-sm-3">
      			<img src="http://placehold.it/280x180" alt="image">
      		</div>
      		<div class="carousel-caption">
        		...
      		</div><!-- /col-sm-3 -->
    	</div><!--/row -->
    </div><!--/item -->
    ...
  </div><!--/carousel-inner -->

  <!-- Controls -->
  <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a><!--/controls-->

</div><!--/myCarousel-->
</div><!--/well-->

<!--/directive-->