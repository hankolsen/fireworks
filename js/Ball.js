/**
 *
 * @constructor
 */
function Ball() {
  // color is represented as hsla in an array with 4 elements
  this.color = [Math.floor(Math.random()*360), 100, Math.floor(Math.random()*10 + 50), 1];

  // x speed is random between -3 and 3
  this.xSpeed = Math.random() * 6 - 3;

  // y Speed is random  between -20 and -15
  this.ySpeed = Math.random() * - 5 - 15;

  // size is random between 10 and 20
  this.size   = Math.random() * 10 + 10;
}

Ball.prototype = new Drawable();

Ball.prototype.draw = function(){

  // set the fill colour
  this.setFillStyle();

  // draw a circle
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
  this.context.fill();

  // When it reaches its top position make it explode
  if (this.ySpeed > 0 && !this.exploded) {
    this.explode();
  }

  // Update it's position
  this.move();
};


Ball.prototype.move = function(){
  // add the speed to the position
  this.x+=this.xSpeed;
  this.y+=this.ySpeed;

  // make it shrink by 96%
  this.size*=.96;

  // add gravity
  this.ySpeed +=.4;
};

Ball.prototype.setFillStyle = function() {
  var color = this.color,
    context = this.context,
    h = color[0],
    s = color[1] + '%',
    l = color[2] + '%',
    a = color[3];

  context.fillStyle = 'hsla(' + h + ',' + s + ',' + l + ',' + a + ')';
};


/**
 * Let the ball pop and create a bunch of stars that fly out of it
 */
Ball.prototype.explode = function(){
  var star,
      j = 0,
      numberOfStars = 8;

  for (j; j < numberOfStars; j++) {

    star = new Star();
    star.init(this.x, this.y);
    star.xSpeed = Math.random() * 20 - 10;
    star.ySpeed = Math.random() * 15 - 10;
    star.size = Math.random() * 10 + 10;
    star.color = this.color;

    Fireworks.stars.addStar(star);
  }
  this.exploded = true;
};
