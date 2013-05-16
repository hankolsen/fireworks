/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects. Sets up default variables
 * that all child objects will inherit, as well as the default
 * functions.
 */
function Drawable() {

  this.init = function(x, y) {
    this.x = x;
    this.y = y;
  };

  this.draw = function() {};
  this.move = function() {};
  this.setFillStyle = function(){};
}