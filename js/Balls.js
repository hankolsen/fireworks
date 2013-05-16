function Balls() {

  var balls = [],
      count = 0;

  this.render = function(){
    var i = 0,
        ball,
        delay = Math.round(Math.random() * 50) + 30;

    if (count % delay === 0) {
      ball = new Ball();
      ball.init(this.canvasWidth / 2, this.canvasHeight / 4 * 3);
      balls.push(ball);
    }

    // clear the canvas
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (i ; i < balls.length; i++) {
      balls[i].draw();
      if (balls[i].y > this.canvasHeight) {
        balls.splice(i,1);
      }
    }

    count++;
  }
}
