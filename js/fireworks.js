/**
 * A simple firework by using Canvas.
 * Put together by Hank - hank@hankolsen.com - with some help of the people listed below
 *
 *
 *
 * Inspiration & Credits:
 * Seb Lee-Delisle: https://github.com/sebleedelisle/live-coding-presentations/blob/master/FOWD13/CokeMentos.html
 * Paul Irish: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * Phil Maurer: http://codepen.io/aurer/pen/Jszok
 * Steven Lamber: http://blog.sklambert.com/
 * "Programming Thomas": http://programmingthomas.wordpress.com/2012/05/16/drawing-stars-with-html5-canvas/
 *
 */




/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
  return 	window.requestAnimationFrame 		    ||
          window.webkitRequestAnimationFrame 	||
          window.mozRequestAnimationFrame		  ||
          window.msRequestAnimationFrame		  ||
          function(callback){
            window.setTimeout(callback, 1000/60);
          };
})();




(function(){

  var Fireworks = {
    // Holder for the canvas information for the balls
    ballCanvas: {},

    // Holder for the canvas information for the stars
    starCanvas: {},

    // Holders for Balls and Stars objects to be created
    balls: {},
    stars: {},

    // Simple counter to allow some delay between balls being launched
    count: 0,


    /**
     * Setup everything
     */
    init: function() {
      this.setUpCanvasElements();
      this.balls = new Balls();
      this.stars = new Stars();
    },


    /**
     * Let the good times roll...
     */
    render: function() {
      this.balls.render();
      this.stars.render();
    },


    /**
     * Create and store the canvas elements needed
     */
    setUpCanvasElements: function() {
      this.ballCanvas = this._createCanvas("balls");
      this.starCanvas = this._createCanvas("stars");


      // Add some useful variables to the prototypes of our different classes
      Ball.prototype.context = this.ballCanvas.context;

      Balls.prototype.context = this.ballCanvas.context;
      Balls.prototype.canvasWidth = this.ballCanvas.canvasWidth;
      Balls.prototype.canvasHeight = this.ballCanvas.canvasHeight;

      Star.prototype.context = this.starCanvas.context;

      Stars.prototype.context = this.starCanvas.context;
      Stars.prototype.canvasWidth = this.starCanvas.canvasWidth;
      Stars.prototype.canvasHeight = this.starCanvas.canvasHeight;

    },


    /**
     * Helper to create a canvas element and store some useful variables in an object
     *
     * @param className
     * @returns {{canvas: HTMLElement, context: CanvasRenderingContext2D, canvasWidth: *, canvasHeight: *}}
     * @private
     */
    _createCanvas: function(className) {
      var canvas = document.createElement('canvas'),
          context = canvas.getContext("2d");

      canvas.className = className;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      document.body.appendChild(canvas);

      return {
        canvas: canvas,
        context: context,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height
      };
    }
  };


  // Make it globally available
  window.Fireworks = window.Fireworks || Fireworks;


})();


// Kick start the Fireworks
Fireworks.init();


// Setup the animation loop
(function animationLoop(){
  requestAnimFrame(animationLoop);
  Fireworks.render();
})();