(function(){
	

	/**
	 * requestAnim shim layer by Paul Irish
	 * Finds the first API that works to optimize the animation loop,
	 * otherwise defaults to setTimeout().
	 */
	window.requestAnimFrame = (function(){
		return 	window.requestAnimationFrame 		||
				window.webkitRequestAnimationFrame 	||
				window.mozRequestAnimationFram		||
				window.msRequestAnimationFrame		||
				function(callback){
					window.setTimeout(callback, 1000/60);
				};
	})();


	
	/**
	 * Creates the Drawable object which will be the base class for
	 * all drawable objects. Sets up defualt variables
	 * that all child objects will inherit, as well as the defualt
	 * functions.
	 */
	function Drawable() {
		this.init = function(x, y) {
			this.x = x;
			this.y = y;
		}

		this.xSpeed = 0;
		this.ySpeed = 0;

    this.setFillStyle = function(){
      var h = this.color[0],
          s = this.color[1] + '%',
          l = this.color[2] + '%',
          a = this.color[3];

      this.context.fillStyle = 'hsla(' + h + ',' + s + ',' + l + ',' + a + ')';
    };

		// abstract methods
		this.draw = function(){};
	}


  /**
   * Creates a Ball object that inherits from Drawable
   * @constructor
   */
	function Ball() {
      this.color  = [Math.floor(Math.random()*360), 100, Math.floor(Math.random()*10 + 50), 1];
      this.xSpeed = Math.random() * 6 - 3;    // x speed is random between -3 and 3
      this.ySpeed = Math.random() * - 5 - 15; // ySpeed is random  between -20 and -15
      this.size   = Math.random() * 10 + 10;  // size is random between 10 and 20

    /**
     * Draw the ball on its canvas
     */
		this.draw = function(){

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
	}

  /**
   * Creates a Star object that extends Drawable
   * @constructor
   */
	function Star() {
      this.setFillStyle = function(){
        var h = this.color[0],
            s = this.color[1] + '%',
            l = this.color[2] + '%',
            a = this.color[3];

        this.context.fillStyle = 'hsla(' + h + ',' + s + ',' + l + ',' + a + ')';
        this.color[1] *= .995;
        this.color[2] *= .999;

      };

      this.draw = function() {
        var i = 0,
            numOfEdges = 5,
            midAngle = .5;

        this.context.save();
        this.context.beginPath();
        this.context.translate(this.x, this.y);
        this.context.moveTo(0,0-this.size);

        for (i; i < numOfEdges; i++)
        {
          this.context.rotate(Math.PI / numOfEdges);
          this.context.lineTo(0, 0 - (numOfEdges*midAngle));
          this.context.rotate(Math.PI / numOfEdges);
          this.context.lineTo(0, 0 - numOfEdges);
        }

        this.setFillStyle();
        this.context.fill();
        this.context.restore();

        this.move();
      }
	}

	Ball.prototype = new Drawable();
	Star.prototype = new Drawable();


	Ball.prototype.move = function(){
      // add the speed to the position
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;

      // make it shrink by 96%
      this.size*=.96;

      // add gravity
      this.ySpeed +=.4;
	};


  Star.prototype.move = function() {
    // add the speed to the position
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;

    // make it shrink by 98%
    this.size*=.98;

    // add gravity
    this.ySpeed +=.2;
  };


	Ball.prototype.explode = function(){
      var star,
          j = 0,
          numberOfStars = 8;

      for (j; j < numberOfStars; j++) {

        star = new Star();
        star.init(this.x, this.y);
        star.xSpeed = Math.random() * 20 - 10;
        star.ySpeed = Math.random() * 15 - 10;
        star.size = Math.random()*5 + 10;
        star.color = this.color;

        fireworks.stars.addStar(star);
      }
      this.exploded = true;
	};


	function Balls() {
		var self = this,
            balls = [],
            count = 0;

		
		return {
          draw: function(){
            var i = 0,
                ball,
                delay = Math.round(Math.random() * 50) + 30;

            if (count % delay === 0) {
              ball = new Ball();
              ball.init(self.canvasWidth / 2, self.canvasHeight / 4 * 3);
              balls.push(ball);
            }

            // clear the canvas
            self.context.clearRect(0,0,self.canvasWidth, self.canvasHeight);

            for (i ; i < balls.length; i++) {
              balls[i].draw();
              if (balls[i].y > self.canvasHeight) {
                balls.splice(i,1);
              }
            }

            count++;
          }
		}
	}

	function Stars() {
		var self = this,
        stars = [],
        fadeCanvas = function(){
          self.context.fillStyle = 'rgba(0,0,0,0.1)';
          self.context.fillRect(0, 0, self.canvasWidth, self.canvasHeight);
        };

		return {
          draw: function(){
            var i = 0;

            fadeCanvas();
            // clear the canvas
            //self.context.clearRect(0,0,self.canvasWidth, self.canvasHeight);

            for (i ; i < stars.length; i++) {
              var star = stars[i];
              star.draw();
              if (star.y > self.canvasHeight) {
                  stars.splice(i,1);
              }
            }
          },
          addStar: function(star) {
            stars.push(star);
          }
		}
	}


  /**
   *
   * @returns {{init: Function, start: Function, render: Function}}
   * @constructor
   */
	function Fireworks() {
		var particleCanvas, 
        particleContext,
        starCanvas,
        starContext,
        setUpCanvas = function() {

          // this makes a canvas
          starCanvas = document.createElement('canvas');
          starContext = starCanvas.getContext('2d');

          // puts it in the HTML body
          document.body.appendChild(starCanvas);

          // change the width and height to match the
          // browser size
          starCanvas.width = window.innerWidth;
          starCanvas.height = window.innerHeight;


          // this makes a canvas
          particleCanvas = document.createElement('canvas');
          particleContext = particleCanvas.getContext('2d');

          // puts it in the HTML body
          document.body.appendChild(particleCanvas);

          // change the width and height to match the
          // browser size
          particleCanvas.width = window.innerWidth;
          particleCanvas.height = window.innerHeight;

        };

      return {

        init : function() {
          setUpCanvas();
          Ball.prototype.context = particleContext;

          Balls.prototype.context = particleContext;
          Balls.prototype.canvasWidth = particleCanvas.width;
          Balls.prototype.canvasHeight = particleCanvas.height;

          Star.prototype.context = starContext;

          Stars.prototype.context = starContext;
          Stars.prototype.canvasWidth = starCanvas.width;
          Stars.prototype.canvasHeight = starCanvas.height;

          this.balls = new Balls();
          this.stars = new Stars();

          return true;
        },

        start : function() {
          animate();
        },

        render: function() {
          this.balls.draw();
          this.stars.draw();
        }
      }
	}

	function animate() {
      requestAnimationFrame(animate);
      fireworks.render();
	}

	var fireworks = new Fireworks();

	if (fireworks.init()) {
      fireworks.start();
	}
})();