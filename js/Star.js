/**
 * Creates a Star object that extends Drawable
 *
 * @constructor
 */
function Star() {
  this.numberOfPoints = 5;
  this.insetRadius    = .5;
}


Star.prototype = new Drawable();


/**
 * Sets the fillStyle according to the current color array
 * Fades the Saturation and Luminosity values afterwards to simulate the stars fading away
 * By Phil Maurer http://codepen.io/aurer/pen/Jszok
 */
Star.prototype.setFillStyle = function(){
  var h = this.color[0],
      s = this.color[1] + '%',
      l = this.color[2] + '%',
      a = this.color[3];

  this.context.fillStyle = 'hsla(' + h + ',' + s + ',' + l + ',' + a + ')';

  // Fade the Saturation
  this.color[1] *= .995;

  // Fade the Luminosity
  this.color[2] *= .999;
};


/**
 * Draw a star in the context
 * By http://programmingthomas.wordpress.com/2012/05/16/drawing-stars-with-html5-canvas/
 */
Star.prototype.draw = function() {
    var i = 0;

    this.context.save();
    this.context.beginPath();
    this.context.translate(this.x, this.y);
    this.context.moveTo(0, 0 - this.size);

    for (i; i < this.numberOfPoints; i++) {
      this.context.rotate(Math.PI / this.numberOfPoints);
      this.context.lineTo(0, 0 - ( this.size * this.insetRadius ));
      this.context.rotate(Math.PI / this.numberOfPoints);
      this.context.lineTo(0, 0 - this.size);
    }

    this.setFillStyle();
    this.context.fill();
    this.context.restore();

    this.move();
};


/**
 * Move the star
 */
Star.prototype.move = function() {

  // Update the position by adding the speed
  this.x += this.xSpeed;
  this.y += this.ySpeed;

  // Shrink it to 98%
  this.size *= .98;

  // Add gravity
  this.ySpeed +=.2;
};
