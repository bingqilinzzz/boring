(function() {

var WordCloud = function(options) {
    this.init(options);
}

WordCloud.prototype.init = function(options) {
    var options = options ? options : {};
    this.options = options;
    this.words = options.words ? options.words :  [ "Hello", "world", "normally", "words", "than", "this"];
    this.deg = options.deg ? options.deg : 90;
    this.size = options.size ? options.size : 20;
    this.font = options.font ? options.font : "Impact";
    this.container = options.container ? options.container : "body";
    //console.log(bound);
}

WordCloud.prototype.draw = function() {
    var fill = d3.scale.category20();
    var deg = this.deg;
    var size = this.size;
    var container = this.container;
    var bound = d3.select(this.container).node().getBoundingClientRect();
    var width = bound.width;
    var height = bound.height;
    jQuery(container).empty();
    d3.layout.cloud().size([width, height])
    .words(this.words.map(function(d) {
        return {text: d, size: 5 + Math.random() * size};
    }))
    .rotate(function() { return ~~(Math.random() * 2) * deg; })
    .font(this.font)
    .fontSize(function(d) { return d.size; })
    .on("end", daw)
    .start();


    function daw(words) {
        d3.select(container).append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .attr("transform", "translate("+width/2+","+height/2+")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", this.font)
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
        .text(function(d) { return d.text; });
    }
}

window.WordCloud = WordCloud;
})();
