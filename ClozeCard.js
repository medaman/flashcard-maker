var fs = require("fs");

var ClozeCard = function(text, cloze) {
  if (!(this instanceof ClozeCard)) { 
    return new ClozeCard(text, cloze);
  }

  this.fullText = text;
  this.cloze = cloze;
  this.partial = text.replace(this.cloze, "...");
  if(this.fullText === this.partial) {
    console.log("The Cloze Text is not part of the Full Text.")
  }

  fs.appendFile("cloze.csv", this.partial + "," + this.cloze + "\n", "utf8", function(error) {
    if (error) {return console.log(error)}
  })
}

module.exports = ClozeCard;