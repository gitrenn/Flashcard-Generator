var ClozeCard = function(text, cloze){
    this.text = text;
    this.cloze = cloze;
}

ClozeCard.prototype.partial = function(){
    return this.text.replace(this.cloze, "...");
 
};

ClozeCard.prototype.fullText = function(){
    return this.text
};

ClozeCard.prototype.error = function(){
    console.log("'" + this.cloze + "'" + " doesn't appear in " + "'" + this.text + "'");
};

module.exports = ClozeCard;