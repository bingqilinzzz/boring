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
    this.isBreath = options.isBreath ? true : false;
}

WordCloud.prototype.draw = function() {
    var fill = d3.scale.category20();
    var deg = this.deg;
    var size = this.size;
    var container = this.container;
    var width = $(this.container).width();
    var height = $(this.container).height();
    jQuery(container).empty();
    d3.layout.cloud().size([width, height])
    .words(this.words.map(function(d) {
        return {text: d, size: 4 + Math.random() * size};
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

    if (this.isBreath) {
        this.breath();
    }
}

WordCloud.prototype.breath = function() {
    var count = 0;
    var flag = 1;
    var events = [];
    var container = this.container;
    $(container+" text").each(function(i) {
        events[i] = Math.ceil(Math.random() * 10) < 5 ? 1 : 0;
    });
    events[0] = 1;

    var breath = function () {
        $(container+" text").each(function(i) {
            if (events[i] === 0)
                return;
            var size = $(this).css("font-size");
            size = size.slice(0,-2);
            size = parseInt(size);
            size += flag;
            $(this).css("font-size", size+"px");
            count++;
            if (count > 50) {
                count = 0;
                flag *= -1;
            }
        });
    }
    clearInterval(this.interval);
    this.interval = setInterval(breath, 50);
}

window.WordCloud = WordCloud;
})();
