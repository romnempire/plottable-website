d3.csv("ships.csv", function(error, data) {
  keys = _.keys(data[0]);
  histogram = _(data)
    .groupBy("Ship class") // Create histogram
    .map(function (values, key){
      return {
        shipClass : key,
        count     : values.length
      };
    })
    .sortBy("count")
    .value();

  // Scales
  var xScale = new Plottable.Scale.Linear();
  var yScale = new Plottable.Scale.Ordinal();

  // Plot Components
  var title  = new Plottable.Component.TitleLabel("Ship Class Histogram");
  var xAxis  = new Plottable.Axis.Numeric(xScale, "bottom");
  var yAxis  = new Plottable.Axis.Category(yScale, "left");
  var lines  = new Plottable.Component.Gridlines(xScale, null);
  var plot   = new Plottable.Plot.HorizontalBar(histogram, xScale, yScale)
    .project("x", "count", xScale)
    .project("y", "shipClass", yScale)
    .animate(true);

  // Layout and render
  new Plottable.Component.Table([
    [null,  title],
    [yAxis, lines.merge(plot)],
    [null,  xAxis]
  ])
  .renderTo(d3.select('svg#example-class-histogram'));
});