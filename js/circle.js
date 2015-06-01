(function() {

var Circle = function (options) {
    this.init(options);
};

Circle.prototype.init = function(options) {
   // this.options = {};
    this.options = options;
    this.numbers = [];
    this.process = [];
    this.colors = [];
    this.labels = [];
    this.options.data.forEach(function(item) {
        this.numbers.push(item.numbers);
        this.process.push(item.process);
        this.colors.push(item.color);
        this.labels.push(item.label);
    }, this)
    this.colors = this.colors || ["#FFF1CF", "#DD7A56", "#E9546B"];
  //  jQuery(options.container).append('<h2 class="circle-percentage green"></h2>');
  //  jQuery(options.container).append('<h2 class="circle-average white">Average</h2>');
    jQuery(options.container).append('<svg class="chart-circle" width="100%" viewBox="0 0 100 100"></svg>');
}

Circle.prototype.draw = function() {
    var data1 = this.numbers;
    var data2 = this.process;
//    console.log(data1);
//    console.log(data2);
    var sum = 0;
    this.paper = Snap(this.options.container+" .chart-circle");

    data2.forEach(function(progress,i){
        this.drawCircle(progress, i);
        sum = sum + progress;
    }, this);
//    var angle = this.paper.path("M0,0L78,0L0,78Z");
//    angle.attr({
//        "fill-opacity": "90%",
//        "fill":"#312020"
//    });
    data1.forEach(function(numbers,i){
        this.drawLabel(numbers, i);
    },this);

//    this.avg = sum / data1.length;
    this.textAvg();
}
Circle.prototype.drawLabel = function (progress, i) {
    var paper = this.paper;
    //var ly = 10*i + 8;
    var ly = 10*i +43
    if (this.labels) {
        var text = paper.text(22, ly - 1.5, this.labels[i] + ":");
        text.attr({
            'fill': this.colors[i],
            'font-size': "5px"
        });
    }
    var text = paper.text(57, ly - 1.5, progress );
    text.attr({
        'fill': this.colors[i],
        'font-size': "5px"
    });
}
Circle.prototype.drawCircle = function (progress, i) {
    var paper = this.paper;
    var y1=i*6+3;
    var rx=i*(-12)+45;
    var y2=i*(-6)+95;
    var path="M 50,"+y1+" A"+rx+","+rx+",0 1 1 50,"+y2+" A"+rx+","+rx+",0 1 1 50,"+y1;
    var background = paper.path(path);
    var prog = paper.path(path);

 /*   var ly = 10*i + 8;
    var line = paper.path("M0,"+ly+" L50,"+ly);
    line.attr({
        'stroke': this.colors[i],
        'stroke-width': 0.2
    }); */
    

    var lineL = prog.getTotalLength();
    var oneUnit = lineL / 100;
    var toOffset = lineL - oneUnit * progress;
    background.addClass("underlay");
    prog.attr({
        'stroke': this.colors[i],
        'stroke-dashoffset': lineL,
        'stroke-dasharray': lineL,
        'class': 'circle-graph'
    });
    var animTime = 1300;
    prog.animate({
        'stroke-dashoffset': toOffset,
    },animTime,mina.easein);
}

Circle.prototype.textAvg = function () {
    var textContainer = $(this.options.container).find('.circle-percentage');
    var i = 0;
    var time = 1300;
    var intervalTime = Math.abs(time / this.avg);
    var avg = this.avg;
    var timerID = setInterval(function () {
        i++;
        textContainer.text(i+"%");
        if (i >= avg) clearInterval(timerID);
    }, intervalTime);
} 

window.Circle = Circle;
})();
