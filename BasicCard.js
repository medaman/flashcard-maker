var fs = require("fs");

BasicCard = function(front, back) {
  if (!(this instanceof BasicCard)) { 
    return new BasicCard(front, back);
  }
  this.front = front;
  this.back = back;

  fs.appendFile("basic.csv", this.front + "," + this.back + "\n", "utf8", function(error) {
    if (error) {return console.log(error)}
  })
}

module.exports = BasicCard;