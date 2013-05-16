/**
 * Creates a Stars collection object
 * @constructor
 */
function Stars() {
  // Holder for all the available stars
  var stars = [];

  /**
   * Draw all the available stars on the canvas
   */
  this.render = function(){
    var i = 0,
        star;

    // First fade the canvas to simulate star trails
    this.fadeCanvas();

    // Loop through all the stars and draw each one
    for (i; i < stars.length; i++) {
      star = stars[i];
      star.draw();

      // If the star has disappeared from the screen, remove it to keep the array small and nice
      if (star.y > this.canvasHeight) {
        stars.splice(i,1);
      }
    }
  };

  /**
   * Fade the canvas by adding a black rectangle with just a tiny bit of opacity on top of the canvas
   * By Phil Maurer http://codepen.io/aurer/pen/Jszok
   */
  this.fadeCanvas = function() {
    this.context.fillStyle = 'rgba(0,0,0,0.1)';
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  };


  // Add another star to the collection
  this.addStar = function(star) {
    stars.push(star);
  };
}