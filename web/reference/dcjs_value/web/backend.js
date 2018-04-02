//# dc.js Getting Started and How-To Guide
'use strict';

/* jshint globalstrict: true */
/* global dc,d3,crossfilter,colorbrewer */

// ### Create Chart Objects

// Create chart objects associated with the container elements identified by the css selector.
// Note: It is often a good idea to have these objects accessible at the global scope so that they can be modified or
// filtered by other page controls.
var topBubbleChart = dc.bubbleChart('#top-bubble-chart');
var carMakePiechart = dc.pieChart('#make-piechart');
var transmissionPiechartObject = dc.pieChart('#transmission-piechart');
var valueratingHistogramObject = dc.barChart('#valuerating-histogram');
var yearlyHistogramObject = dc.barChart('#yearly-histogram');
var modelRowchartObject = dc.rowChart('#model-chart');
// var ageChart = dc.pieChart('#subseries-chart');
var seriesRowchartObject = dc.rowChart('#subseries-chart');
var moveChart = dc.lineChart('#pricediff-move-chart');
var volumeChart = dc.barChart('#monthly-volume-chart');
var priceDiffDataCount = dc.dataCount('.dc-data-count');

// require("js/dc-tableview.s");
// dc.tableview(div, "chartGroupName");

var varDataTable = dc.dataTable('.dc-data-table');
// var varDataTable = dc.tableview('.dc-data-table');
// var varDataTable = dc.tableview('.dc-data-table');
// dc.table
// ### Anchor Div for Charts
/*
// A div anchor that can be identified by id
    <div id='your-chart'></div>
// Title or anything you want to add above the chart
    <div id='chart'><span>Days by Gain or Loss</span></div>
// ##### .turnOnControls()

// If a link with css class `reset` is present then the chart
// will automatically hide/show it based on whether there is a filter
// set on the chart (e.g. slice selection for pie chart and brush
// selection for bar chart). Enable this with `chart.turnOnControls(true)`

// dc.js >=2.1 uses `visibility: hidden` to hide/show controls without
// disrupting the layout. To return the old `display: none` behavior,
// set `chart.controlsUseVisibility(false)` and use that style instead.
    <div id='chart'>
       <a class='reset'
          href='javascript:myChart.filterAll();dc.redrawAll();'
          style='visibility: hidden;'>reset</a>
    </div>
// dc.js will also automatically inject the current filter value into
// any html element with its css class set to `filter`
    <div id='chart'>
        <span class='reset' style='visibility: hidden;'>
          Current filter: <span class='filter'></span>
        </span>
    </div>
*/

//### Load your data

//Data can be loaded through regular means with your
//favorite javascript library
//
//```javascript
//d3.csv('data.csv', function(data) {...});
//d3.json('data.json', function(data) {...});
//jQuery.getJson('data.json', function(data){...});
//```

//Get top Groups, elminate others
function getTops(source_group, number_of_items) {
    return {
        all: function () {
            return source_group.top(number_of_items);
        }
    };
}

var currentYear = (new Date()).getFullYear()
var minYear = 0;

d3.csv('data.csv', function (data) {
    // Since its a csv file we need to format the data a bit.
    var dateFormat = d3.time.format('%m/%d/%Y');
    var numberFormat = d3.format('.2f');
    var numberSeperatorFormat = d3.format(',.0f');
    var intFormat = d3.format('0f');


    // // console.log(d3.min(data, function(d) { return d.value; }));
    // // console.log(d3.max(data, function(d) { return d.value; }));

    data.forEach(function (d) {
        d.age = +d.age;
        d.dd = new Date(currentYear - d.age, 1, 1)
        minYear = (new Date(d3.min(d.age), 1, 1));

        // d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month(d.dd); // pre-calculate month for better performance
        d.close = +d.close; // coerce to number
        d.open = +d.open;
        // d.id = +d.id;
        d.row_count = +d.row_count;
        d.price = +d.price;
        d.milage = +d.milage;

        // d.date = +d.date;
        d.age_rating = +d.age_rating;
        d.milage_rating = +d.milage_rating;
        d.price_rating = +d.price_rating;
        d.sum_rating = +d.sum_rating;
        d.market_price = +d.market_price;
        d.price_difference = +d.price_difference;
    });

    //### Create Crossfilter Dimensions and Groups
    //See the [crossfilter API](https://github.com/square/crossfilter/wiki/API-Reference) for reference.
    var input_data = crossfilter(data);
    var all = input_data.groupAll();
    var divider_offset = 155;
    var sum_index_multiplier = 1;

    var radius_amplifier = 8.33;
    // Dimension by year

    var bubbleDimensionGroup = input_data.dimension(function (d) {
        return d3.time.year(d.dd).getFullYear();
    });

    // Maintain running tallies by year as filters are applied or removed
    //The bubble chart expects the groups are reduced to multiple values which are used
    //to generate x, y, and radius for each key (bubble) in the group
    var yearlyPerformanceGroup = bubbleDimensionGroup.group().reduce(
        /* callback for when data is added to the current filter results */
        function (p, v) { // cde123
            ++p.count;
            // p.sum_of_value_rating += Math.abs(v.price_difference);
            // p.sum_of_value_rating += (v.price_difference)/divider_offset;
            // p.sum_of_value_rating += (v.sum_rating)/divider_offset;
            // // console.log(p.sum_of_value_rating,p.total_price);
            p.sum_of_value_rating += (v.sum_rating);
            p.avg_rating = p.sum_of_value_rating / p.count;

            // X Axis
            p.total_price += v.price;
            p.avg_price = p.count ? (p.total_price / p.count) : 0;
            // // console.log(p.sum_of_value_rating,p.total_price,p.avg_price,p.count);

            // Y Axis
            p.total_milage += v.milage;
            p.avg_milage = p.count ? (p.total_milage / p.count) : 0;

            // // console.log(p.total_price);

            // Radius Calculation (incremental)
            p.min_radius = p.count ? Math.max(p.min_radius, v.sum_rating) : v.sum_rating;
            p.max_radius = p.count ? Math.min(p.max_radius, v.sum_rating) : v.sum_rating;
            p.radius = Math.abs(p.min_radius - p.max_radius) * radius_amplifier;


            // p.sum_of_value_rating += (v.sum_rating)*1;
            // p.valueratingDimensions += Math.abs(v.price_difference/divider_offset);
            p.valueratingDimensions += Math.abs(v.sum_rating / divider_offset);
            p.sumIndex += (v.sum_rating * sum_index_multiplier) / 2;
            // // console.log(p.sumIndex);
            p.avgIndex = p.sumIndex / p.count;
            p.percentageGain = p.avgIndex ? (p.sum_of_value_rating / p.avgIndex) * 100 : 0;
            p.fluctuationPercentage = (p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0) / 2;
            // // console.log(p.fluctuationPercentage);
            // // console.log(p);
            p.title = v.title;

            // // console.log(p.title, 'averagemilage = ', p.avg_milage, v.age, 'count=', p.count);

            return p;
        },

        /* callback for when data is removed from the current filter results */

        function (p, v) { //cde321
            --p.count;
            p.sum_of_value_rating -= (v.sum_rating);
            p.avg_rating = p.sum_of_value_rating / p.count;

            p.total_price -= v.price;
            p.avg_price = p.count ? (p.total_price / p.count) : 0;

            p.title = v.title;

            // X Axis
            p.valueratingDimensions -= Math.abs(v.sum_rating / divider_offset);
            p.sumIndex -= (v.sum_rating * sum_index_multiplier) / 2;

            // Y Axis
            p.total_milage -= v.milage;
            p.avg_milage = p.count ? (p.total_milage / p.count) : 0;
            // // console.log(p.title,p.avg_milage);

            // Radius Calculation (decremental)
            p.min_radius = p.count ? Math.max(p.min_radius, v.sum_rating) : v.sum_rating;
            p.max_radius = p.count ? Math.min(p.max_radius, v.sum_rating) : v.sum_rating;
            p.radius = Math.abs(p.min_radius - p.max_radius) * radius_amplifier;

            p.avgIndex = p.count ? p.sumIndex / p.count : 0;
            p.percentageGain = p.avgIndex ? (p.sum_of_value_rating / p.avgIndex) * 100 : 0;
            p.fluctuationPercentage = (p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0) / 2;

            // // console.log(p.fluctuationPercentage);
            // console.log(p.title, 'averagemilage = ', p.avg_milage, v.age, 'count=', p.count, 'sum_of_value_rating=', p.sum_of_value_rating);

            return p;
        },
        /* initialize p */
        function () {
            return {
                avg_rating: 0,
                min_radius: 0,
                max_radius: 0,
                radius: 0,
                total_milage: 0,
                avg_milage: 0,
                avg_price: 0,
                total_price: 0,
                count: 0,
                sum_of_value_rating: 0,
                fluctuation: 0,
                fluctuationPercentage: 0,
                sumIndex: 0,
                avgIndex: 0,
                percentageGain: 0,
                title: ''
            };
        }
    );

    // Dimension by full date
    var dateDimension = input_data.dimension(function (d) {
        return d.dd;
    });

    // Dimension by month
    var moveMonths = input_data.dimension(function (d) {
        return d.month;
    });
    // Group by total movement within month
    var linePrice = moveMonths.group().reduceSum(function (d) {
        // return Math.abs(d.close - d.open);
        return Math.abs(d.price) / 1000;
    });
    // Group by total volume within move, and scale down result
    var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
        return d.volume / 500000;
    });
    var linePriceDifferenceGroup = moveMonths.group().reduce(
        function (p, v) {
            ++p.days;
            p.total += (v.price_difference) / 2;
            p.avg = Math.round(p.total / p.days);
            return p;
        },
        function (p, v) {
            --p.days;
            p.total -= (v.price_difference) / 2;
            p.avg = p.days ? Math.round(p.total / p.days) : 0;
            return p;
        },
        function () {
            return {days: 0, total: 0, avg: 0};
        }
    );

    // Car Make - Create categorical dimension
    var carmakeDimensions = input_data.dimension(function (d) {
        // // console.log(d.make);
        return d.make;
        // return d.open > d.close ? 'Loss' : 'Gain';
    });
    // Produce counts records in the dimension
    var carmakeGroups = carmakeDimensions.group();

    // Transmission - Create categorical dimension
    var transmissionDimensions = input_data.dimension(function (d) {
        var words = d.title.split(" ");      // Split the string using dot as separator
        var lastVal = words.pop();       // Get last element
        return lastVal;
        // // console.log(d.make);
        // return d.transmission;
        // return d.open > d.close ? 'Loss' : 'Gain';
    });
    // Produce counts records in the dimension
    var transmissionGroups = transmissionDimensions.group();


    // Determine a histogram of percent changes
    var valueratingDimensions = input_data.dimension(function (d) {
        // return Math.round((d.close - d.open) / d.open * 100);
        return Math.round(d.sum_rating);
    });

    var valueratingDimenionGroups = valueratingDimensions.group();

    var yearlyHistogram = input_data.dimension(function (d) {
        return Math.round(currentYear - d.age);
    });

    var yearlyHistogramGroup = yearlyHistogram.group();

    // var modelRowchartDimensions = input_data.dimension(function (d) {
    //      // var day = d.dd.getDay();
    //      // var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //      // return day + '.' + name[day];
    //
    //      // return d.age;
    //      var modelName = d.model.trim();
    //      // var modelName=d.age;
    //
    //
    //      if (modelName == null || modelName == '') {
    //          modelName = 'Default'
    //          // // console.log(modelName + ' null');
    //          return modelName + '.' + modelName;
    //
    //
    //      } else {
    //          // // console.log(modelName + ' not null');
    //          // return modelName;
    //          return modelName + '.' + modelName;
    //      }
    //  });

    // Summarize volume by seriesRowDimensions
    var seriesRowchartDimenions = input_data.dimension(function (d) {
        var seriesName = d.series.trim();
        return seriesName;
        // return d.age;
    });

    var seriesRowGroup = getTops(seriesRowchartDimenions.group(), 6)
    // var seriesRowGroup = getTops(seriesRowchartDimenions.group().reduceSum(function (d) {
    //     // return d.volume;
    //     return d.age;
    // }));

    // // console.log(seriesRowGroup);

    // Counts per weekday
    var modelRowchartDimensions = input_data.dimension(function (d) {
        // var day = d.dd.getDay();
        // var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        // return day + '.' + name[day];

        // return d.age;
        var modelName = d.model.trim();
        // var modelName=d.age;


        if (modelName == null || modelName == '') {
            modelName = 'Default'
            // // console.log(modelName + ' null');
            return modelName + '.' + modelName;


        } else {
            // // console.log(modelName + ' not null');
            // return modelName;
            return modelName + '.' + modelName;
        }
    });
    var modelRowchartGroup = getTops(modelRowchartDimensions.group(), 6);

    //### Define Chart Attributes
    // Define chart attributes using fluent methods. See the
    // [dc.js API Reference](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md) for more information
    //

    //#### Bubble Chart

    //Create a bubble chart and use the given css selector as anchor. You can also specify
    //an optional chart group for this chart to be scoped within. When a chart belongs
    //to a specific group then any interaction with the chart will only trigger redraws
    //on charts within the same chart group.
    // <br>API: [Bubble Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#bubble-chart)

    topBubbleChart /* dc.bubbleChart('#top-bubble-chart', 'chartGroup') */ // abc123
    // (_optional_) define chart width, `default = 200`
        .width(990)
        // (_optional_) define chart height, `default = 200`
        .height(323)
        // (_optional_) define chart transition duration, `default = 750`
        .transitionDuration(1500)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(bubbleDimensionGroup)
        //The bubble chart expects the groups are reduced to multiple values which are used
        //to generate x, y, and radius for each key (bubble) in the group
        .group(yearlyPerformanceGroup)
        // (_optional_) define color function or array for bubbles: [ColorBrewer](http://colorbrewer2.org/)
        .colors(colorbrewer.RdYlGn[9])
        //(optional) define color domain to match your data domain if you want to bind data or color
        // .colorDomain([-100, 1000])
        //##### Accessors

        //Accessor functions are applied to each value returned by the grouping

        // `.colorAccessor` - the returned value will be passed to the `.colors()` scale to determine a fill color
        .colorAccessor(function (d) {
            // return d.value.sum_of_value_rating;
            return d.value.avg_rating;
        })
        // `.keyAccessor` - the `X` value will be passed to the `.x()` scale to determine pixel location
        .keyAccessor(function (p) {
            // return p.value.sum_of_value_rating;
            // // console.log(p.avg_price);
            return p.value.avg_price;
        })

        // `.valueAccessor` - the `Y` value will be passed to the `.y()` scale to determine pixel location
        //
        .valueAccessor(function (p) {
            // return p.value.percentageGain;
            // // console.log(p.sum_of_value_rating,p.total_price,p.avg_price,p.count);
            // // console.log(p.value.avg_milage, p.value.title);
            return p.value.avg_milage;
        })
        // `.radiusValueAccessor` - the value will be passed to the `.r()` scale to determine radius size;
        //   by default this maps linearly to [0,100]
        .radiusValueAccessor(function (p) {
            // return p.value.fluctuationPercentage;
            return p.value.radius;
        })

        .maxBubbleRelativeSize(1)
        .x(d3.scale.linear().domain([-2500, 2500]))
        .y(d3.scale.linear().domain([-100, 100]))
        .r(d3.scale.linear().domain([0, 4000]))
        //##### Elastic Scaling

        //`.elasticY` and `.elasticX` determine whether the chart should rescale each axis to fit the data.
        .elasticY(true)
        .elasticX(true)
        //`.yAxisPadding` and `.xAxisPadding` add padding to data above and below their max values in the same unit
        //domains as the Accessors.
        .yAxisPadding(70000)
        // .xAxisPadding(500)
        .xAxisPadding(2000)
        // (_optional_) render horizontal grid lines, `default=false`
        .renderHorizontalGridLines(true)
        // (_optional_) render vertical grid lines, `default=false`
        .renderVerticalGridLines(true)
        // (_optional_) render an axis label below the x axis
        .xAxisLabel('Price')
        // (_optional_) render a vertical axis lable left of the y axis
        .yAxisLabel('Milage')
        //##### Labels and  Titles

        //Labels are displayed on the chart for each bubble. Titles displayed on mouseover.
        // (_optional_) whether chart should render labels, `default = true`
        .renderLabel(true)
        .label(function (p) {
            return p.key;
        })
        // (_optional_) whether chart should render titles, `default = false`
        .renderTitle(true)
        .title(function (p) {
            return [
                p.key,
                'Average Value Rating: ' + numberFormat(p.value.avg_rating),
                'Average Price: $' + numberSeperatorFormat(p.value.avg_price),
                'Average Milage: ' + numberSeperatorFormat(p.value.avg_milage),
                // 'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%',
                // 'Deviation In group: ' + numberFormat(p.value.percentageGain / 1000),
                'Sample size: ' + intFormat(p.value.count),
                // 'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage / 100) + '%'
            ].join('\n');
        })
    ;

    //#### Customize Axes
    // Set a custom tick format. Both `.yAxis()` and `.xAxis()` return an axis object,
    // so any additional method chaining applies to the axis, not the chart.
    topBubbleChart.xAxis().tickFormat(function (v) {
        return '$' + numberSeperatorFormat(v / 1000) + 'k';
    });

    topBubbleChart.yAxis().tickFormat(function (v) {
        return numberSeperatorFormat(v / 1000) + 'k';
    });

//######################################################################################################################
    // #### Pie/Donut Charts

    // Create a pie chart and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    // <br>API: [Pie Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#pie-chart)

    carMakePiechart /* dc.pieChart('#make-piechart', 'chartGroup') */
    // (_optional_) define chart width, `default = 200`
        .width(180)
        // (optional) define chart height, `default = 200`
        .height(180)
        // Define pie radius
        .radius(80)
        // Set dimension
        .dimension(carmakeDimensions)
        // Set group
        .group(carmakeGroups)
        // (_optional_) by default pie chart will use `group.key` as its label but you can overwrite it with a closure.
        .label(function (d) {
            if (carMakePiechart.hasFilter() && !carMakePiechart.hasFilter(d.key)) {
                return d.key + '(0%)';
            }
            var label = d.key;
            if (all.value()) {
                label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
            }
            return label;
        })
    /*
        // (_optional_) whether chart should render labels, `default = true`
        .renderLabel(true)
        // (_optional_) if inner radius is used then a donut chart will be generated instead of pie chart
        .innerRadius(40)
        // (_optional_) define chart transition duration, `default = 350`
        .transitionDuration(500)
        // (_optional_) define color array for slices
        .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        // (_optional_) define color domain to match your data domain if you want to bind data or color
        .colorDomain([-1750, 1644])
        // (_optional_) define color value accessor
        .colorAccessor(function(d, i){return d.value;})
        */;

    transmissionPiechartObject /* dc.pieChart('#make-piechart', 'chartGroup') */
    // (_optional_) define chart width, `default = 200`
        .width(180)
        // (optional) define chart height, `default = 200`
        .height(180)
        // Define pie radius
        .radius(80)
        // Set dimension
        .dimension(transmissionDimensions)
        // Set group
        .group(transmissionGroups)
        // (_optional_) by default pie chart will use `group.key` as its label but you can overwrite it with a closure.
        .label(function (d) {
            if (transmissionPiechartObject.hasFilter() && !transmissionPiechartObject.hasFilter(d.key)) {
                return d.key + '(0%)';
            }
            var label = d.key;
            if (all.value()) {
                label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
            }
            return label;
        })
    // .ordinalColors([
    //     '#0421dd', '#5d81ff'
    // ])
    /*
    // seriesChart /* dc.pieChart('#subseries-chart', 'chartGroup') */
    //     .width(180)
    //     .height(180)
    //     .radius(60)
    //     // .innerRadius(30)
    //     // .sort
    //     .externalLabels(8)
    //     .group(seriesRowGroup)
    //     .dimension(seriesRowDimensions)


    // // console.log(seriesRowGroup)
    // .sort()
    // .orderFunction(seriesRowGroup);
    ;

    //#### Row Chart

    // Create a row chart and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    // <br>API: [Row Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#row-chart)
    var rowchartWidth = 285 * 2;
    modelRowchartObject /* dc.rowChart('#model-chart', 'chartGroup') */
        .width(rowchartWidth / 2)
        .height(180)
        .margins({top: 20, left: 10, right: 10, bottom: 20})
        .group(modelRowchartGroup)
        .dimension(modelRowchartDimensions)
        // Assign colors to each value in the x scale domain
        // .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'
            // ,'#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'
        ])
        // .ordin
        .label(function (d) {
            return d.key.split('.')[1];
        })
        // Title sets the row text
        .title(function (d) {
            return d.key.split('.')[1] + ' (' + d.value + ')';
        })
        .elasticX(true)
        .xAxis().ticks(4);


    //#### Row Chart

    // Create a row chart and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    // <br>API: [Row Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#row-chart)
    seriesRowchartObject /* dc.rowChart('#model-chart', 'chartGroup') */
        .width(rowchartWidth / 2)
        .height(180)
        .margins({top: 20, left: 10, right: 10, bottom: 20})
        .group(seriesRowGroup)
        .dimension(seriesRowchartDimenions)
        // Assign colors to each value in the x scale domain
        // .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        // .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'
        // .ordinalColors([ '#2a07dd','#301ece','#3635c0','#3d4db1','#4364a3','#315364'])
        .ordinalColors(['#0421dd', '#0e2cc7', '#1838b0', '#22439a', '#2c4f83', '#365a6d'])
        // .ordin
        .label(function (d) {
            // return d.key.split('.')[1];
            return d.key;
        })
        // Title sets the row text
        .title(function (d) {
            return d.key + ' (' + d.value + ')';
        })
        .elasticX(true)
        .xAxis().ticks(4);

    // seriesChart /* dc.pieChart('#subseries-chart', 'chartGroup') */
    //     .width(180)
    //     .height(180)
    //     .radius(60)
    //     // .innerRadius(30)
    //     // .sort
    //     .externalLabels(8)
    //     .group(seriesRowGroup)
    //     .dimension(seriesRowDimensions)

    var histogramWidth = 960;
    //#### Bar Chart - Histogram
    // Create a bar chart and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    // <br>API: [Bar Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#bar-chart)
    valueratingHistogramObject /* dc.barChart('#volume-month-chart', 'chartGroup') */
    // .width(420)
    // .width(495)
        .width(histogramWidth / 2)
        .height(180)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(valueratingDimensions)
        .group(valueratingDimenionGroups)
        .elasticY(true)
        // (_optional_) whether bar should be center to its x value. Not needed for ordinal chart, `default=false`
        // .centerBar(true)
        .centerBar(false)
        // (_optional_) set gap between bars manually in px, `default=2`
        .gap(1)
        // (_optional_) set filter brush rounding
        .round(dc.round.floor)
        .alwaysUseRounding(true)
        .x(d3.scale.linear().domain([-6, 6]))

        // .colors(d3.scale.ordinal().domain([-6, 6])
        //     .range(["#263f4d", "#63a5c8"]))

        .colorAccessor(function (d) {
            // if(d.value >0)
            //     return "positive"
            // return "negative";})
            // console.log('d.value = ', d.value);
            return (d.value);
        })

        // .ordinalColors([ '#0421dd', '#0e2cc7', '#1838b0', '#22439a', '#2c4f83', '#365a6d' ])
        // .ordinalColors(["#cc0000","#b91201","#a72402","#943704","#824905","#6f5b06","#5d6d07","#4a7f08","#389109","#25a40b","#13b60c","#00c80d"])
        .ordinalColors([
            "#ff0000",
            "#ff2401",
            "#ff4802",
            "#ff6c02",
            "#ff9003",
            "#ffb404",
            "#c1dd0d",
            "#9bde11",
            "#76df16",
            "#50e01a",
            "#2be11f",
            "#05e223"
        ])


        .renderHorizontalGridLines(true)
        // Customize the filter displayed in the control span
        .filterPrinter(function (filters) {
            var filter = filters[0], s = '';
            s += numberFormat(filter[0]) + ' -> ' + numberFormat(filter[1]);
            return s;
        });

    // Customize axes
    valueratingHistogramObject.xAxis().tickFormat(
        function (v) {
            // return v + '%';
            return v;
        });
    valueratingHistogramObject.yAxis().ticks(5);


    //#### Bar Chart - histogram of years
    yearlyHistogramObject /* dc.barChart('#volume-month-chart', 'chartGroup') */
    // .width(990)
        .width(histogramWidth / 2)
        .height(200)
        .transitionDuration(1000)
        .dimension(yearlyHistogram)
        .group(yearlyHistogramGroup)
        .elasticY(true)
        // (_optional_) whether bar should be center to its x value. Not needed for ordinal chart, `default=false`
        .centerBar(true)
        // (_optional_) set gap between bars manually in px, `default=2`
        .gap(1)
        // (_optional_) set filter brush rounding
        .round(dc.round.floor)
        .alwaysUseRounding(true)
        .x(d3.scale.linear().domain([1985, 2020]))
        .renderHorizontalGridLines(true)
        // Customize the filter displayed in the control span
        .filterPrinter(function (filters) {
            var filter = filters[0], s = '';
            s += intFormat(filter[0]) + ' -> ' + intFormat(filter[1]) + '';
            return s;
        })
        .title(function (d) {
            // return dateFormat(d.key) + '\n' + numberFormat(value);
            return (d.value.avg_rating);
        })
        .xAxis().tickFormat(
        function (v) {
            return intFormat(v);
        });

    ;

    // Customize axes
    // histogram_years.xAxis().tickFormat(
    //     function (v) {
    //         return v + '%';
    //     });
    // histogram_years.yAxis().ticks(5);

    //#### Stacked Area Chart

    //Specify an area chart by using a line chart with `.renderArea(true)`.
    // <br>API: [Stack Mixin](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#stack-mixin),
    // [Line Chart](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#line-chart)
    moveChart /* dc.lineChart('#pricediff-move-chart', 'chartGroup') */
        .renderArea(true)
        .width(990)
        .height(200)
        .transitionDuration(1000)
        .margins({top: 30, right: 50, bottom: 25, left: 40})
        .dimension(moveMonths)
        .mouseZoomable(true)
        // Specify a "range chart" to link its brush extent with the zoom of the current "focus chart".
        .rangeChart(volumeChart)
        .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(currentYear, 11, 31)]))
        .round(d3.time.month.round)
        .xUnits(d3.time.months)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        //##### Legend

        // Position the legend relative to the chart origin and specify items' height and separation.
        .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
        .brushOn(false)
        // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
        // legend.
        // The `.valueAccessor` will be used for the base layer
        .group(linePriceDifferenceGroup, 'Price Savings/Difference')
        .valueAccessor(function (d) {
            return d.value.avg;
        })
        // Stack additional layers with `.stack`. The first paramenter is a new group.
        // The second parameter is the series name. The third is a value accessor.
        .stack(linePrice, 'Price Average', function (d) {
            return d.value;
        })
        // Title can be called by any stack layer.
        .title(function (d) {
            var value = d.value.avg ? d.value.avg : d.value;
            if (isNaN(value)) {
                value = 0;
            }
            return dateFormat(d.key) + '\n' + numberFormat(value);
        });

    //#### Range Chart

    // Since this bar chart is specified as "range chart" for the area chart, its brush extent
    // will always match the zoom of the area chart.
    volumeChart.width(990) /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
        .height(40)
        .margins({top: 0, right: 50, bottom: 20, left: 40})
        .dimension(moveMonths)
        .group(volumeByMonthGroup)
        .centerBar(true)
        .gap(1)
        .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(currentYear, 11, 31)]))
        .round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.months);

    //#### Data Count

    // Create a data count widget and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    // <br>API: [Data Count Widget](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#data-count-widget)
    //
    //```html
    //<div class='dc-data-count'>
    //  <span class='filter-count'></span>
    //  selected out of <span class='total-count'></span> records.
    //</div>
    //```

    priceDiffDataCount /* dc.dataCount('.dc-data-count', 'chartGroup'); */
        .dimension(input_data)
        .group(all)
        // (_optional_) `.html` sets different html when some records or all records are selected.
        // `.html` replaces everything in the anchor with the html given using the following function.
        // `%filter-count` and `%total-count` are replaced with the values obtained.
        .html({
            some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
            ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
            all: 'All records selected. Please click on a graph to apply filters.'
        });

    //#### Data Table

    // Create a data table widget and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    // <br>API: [Data Table Widget](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#data-table-widget)
    //
    // You can statically define the headers like in
    //
    // ```html
    //    <!-- anchor div for data table -->
    //    <div id='data-table'>
    //       <!-- create a custom header -->
    //       <div class='header'>
    //           <span>Date</span>
    //           <span>Open</span>
    //           <span>Close</span>
    //           <span>Change</span>
    //           <span>Volume</span>
    //       </div>
    //       <!-- data rows will filled in here -->
    //    </div>
    // ```
    // or do it programmatically using `.columns()`.

    varDataTable /* dc.dataTable('.dc-data-table', 'chartGroup') */
        .dimension(dateDimension)
        // Data table does not use crossfilter group but rather a closure
        // as a grouping function
        .group(function (d) {
            // var format = d3.format('yyyy');
            // return d.dd.getFullYear() ;
            return d.make;
        })
        // (_optional_) max number of records to be shown, `default = 25`
        .size(20)
        // There are several ways to specify the columns; see the data-table documentation.
        // This code demonstrates generating the column header automatically based on the columns.
        .columns([
            // Use the `d.date` field; capitalized automatically
            'date',
            {
                label: 'title',
                format: function (d) {
                    return '<a href="' + d.link + '">' + d.title + '</a>';
                }
            }
            , {
                label: 'Rating',
                format: function (d) {
                    return parseFloat(Math.round(d.sum_rating * 100) / 100).toFixed(2)
                    // return numberFormat(d.age_rating)
                }
            }
            , {
                label: 'Price Diff',
                format: function (d) {
                    // return parseFloat(Math.round(d.price_rating * 100) / 100).toFixed(2)
                    // return numberFormat(d.age_rating)
                    var val = d.price_difference;
                    return '$' + val.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')

                }
            }, {
                label: 'Price',
                format: function (d) {
                    // return parseFloat(Math.round(d.price_rating * 100) / 100).toFixed(2)
                    // return numberFormat(d.age_rating)
                    var val = d.price;
                    return '$' + val.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')

                }
            }
            , {
                label: 'Milage',
                format: function (d) {
                    var val = d.milage;
                    return val.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
                    // return numberFormat(d.age_rating)
                }
            }, 'age'
            , {
                label: 'PriceRating',
                format: function (d) {
                    return parseFloat(Math.round(d.price_rating * 100) / 100).toFixed(2)
                    // return numberFormat(d.age_rating)
                }
            }
            , {
                label: 'MilageRating',
                format: function (d) {
                    return parseFloat(Math.round(d.milage_rating * 100) / 100).toFixed(2)
                    // return numberFormat(d.age_rating)
                }
            }
            , {
                label: 'AgeRating',
                format: function (d) {
                    return parseFloat(Math.round(d.age_rating * 100) / 100).toFixed(2)
                    // return numberFormat(d.age_rating)
                }
            }
        ])

        // (_optional_) sort using the given field, `default = function(d){return d;}`
        .sortBy(function (d) {
            // return d.dd;
            return d.sum_rating;
        })
        // (_optional_) sort order, `default = d3.ascending`
        .order(d3.descending)
        // (_optional_) custom renderlet to post-process chart using [D3](http://d3js.org)

        .on('renderlet', function (table) {
            table.selectAll('.dc-table-group').classed('info', true);

        });

    /*
    //#### Geo Choropleth Chart

    //Create a choropleth chart and use the given css selector as anchor. You can also specify
    //an optional chart group for this chart to be scoped within. When a chart belongs
    //to a specific group then any interaction with such chart will only trigger redraw
    //on other charts within the same chart group.
    // <br>API: [Geo Chroropleth Chart][choro]
    // [choro]: https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#geo-choropleth-chart
    dc.geoChoroplethChart('#us-chart')
         // (_optional_) define chart width, default 200
        .width(990)
        // (optional) define chart height, default 200
        .height(500)
        // (optional) define chart transition duration, default 1000
        .transitionDuration(1000)
        // set crossfilter dimension, dimension key should match the name retrieved in geojson layer
        .dimension(states)
        // set crossfilter group
        .group(stateRaisedSum)
        // (_optional_) define color function or array for bubbles
        .colors(['#ccc', '#E2F2FF','#C4E4FF','#9ED2FF','#81C5FF','#6BBAFF','#51AEFF','#36A2FF','#1E96FF','#0089FF',
            '#0061B5'])
        // (_optional_) define color domain to match your data domain if you want to bind data or color
        .colorDomain([-5, 200])
        // (_optional_) define color value accessor
        .colorAccessor(function(d, i){return d.value;})
        // Project the given geojson. You can call this function multiple times with different geojson feed to generate
        // multiple layers of geo paths.
        //
        // * 1st param - geojson data
        // * 2nd param - name of the layer which will be used to generate css class
        // * 3rd param - (_optional_) a function used to generate key for geo path, it should match the dimension key
        // in order for the coloring to work properly
        .overlayGeoJson(statesJson.features, 'state', function(d) {
            return d.properties.name;
        })
        // (_optional_) closure to generate title for path, `default = d.key + ': ' + d.value`
        .title(function(d) {
            return 'State: ' + d.key + '\nTotal Amount Raised: ' + numberFormat(d.value ? d.value : 0) + 'M';
        });

        //#### Bubble Overlay Chart

        // Create a overlay bubble chart and use the given css selector as anchor. You can also specify
        // an optional chart group for this chart to be scoped within. When a chart belongs
        // to a specific group then any interaction with the chart will only trigger redraw
        // on charts within the same chart group.
        // <br>API: [Bubble Overlay Chart][bubble]
        // [bubble]: https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#bubble-overlay-chart
        dc.bubbleOverlay('#bubble-overlay', 'chartGroup')
            // The bubble overlay chart does not generate its own svg element but rather reuses an existing
            // svg to generate its overlay layer
            .svg(d3.select('#bubble-overlay svg'))
            // (_optional_) define chart width, `default = 200`
            .width(990)
            // (_optional_) define chart height, `default = 200`
            .height(500)
            // (_optional_) define chart transition duration, `default = 1000`
            .transitionDuration(1000)
            // Set crossfilter dimension, dimension key should match the name retrieved in geo json layer
            .dimension(states)
            // Set crossfilter group
            .group(stateRaisedSum)
            // Closure used to retrieve x value from multi-value group
            .keyAccessor(function(p) {return p.value.sum_of_value_rating;})
            // Closure used to retrieve y value from multi-value group
            .valueAccessor(function(p) {return p.value.percentageGain;})
            // (_optional_) define color function or array for bubbles
            .colors(['#ccc', '#E2F2FF','#C4E4FF','#9ED2FF','#81C5FF','#6BBAFF','#51AEFF','#36A2FF','#1E96FF','#0089FF',
                '#0061B5'])
            // (_optional_) define color domain to match your data domain if you want to bind data or color
            .colorDomain([-5, 200])
            // (_optional_) define color value accessor
            .colorAccessor(function(d, i){return d.value;})
            // Closure used to retrieve radius value from multi-value group
            .radiusValueAccessor(function(p) {return p.value.fluctuationPercentage;})
            // set radius scale
            .r(d3.scale.linear().domain([0, 3]))
            // (_optional_) whether chart should render labels, `default = true`
            .renderLabel(true)
            // (_optional_) closure to generate label per bubble, `default = group.key`
            .label(function(p) {return p.key.getFullYear();})
            // (_optional_) whether chart should render titles, `default = false`
            .renderTitle(true)
            // (_optional_) closure to generate title per bubble, `default = d.key + ': ' + d.value`
            .title(function(d) {
                return 'Title: ' + d.key;
            })
            // add data point to its layer dimension key that matches point name: it will be used to
            // generate a bubble. Multiple data points can be added to the bubble overlay to generate
            // multiple bubbles.
            .point('California', 100, 120)
            .point('Colorado', 300, 120)
            // (_optional_) setting debug flag to true will generate a transparent layer on top of
            // bubble overlay which can be used to obtain relative `x`,`y` coordinate for specific
            // data point, `default = false`
            .debug(true);
    */

    //#### Rendering

    //simply call `.renderAll()` to render all charts on the page
    dc.renderAll();
    /*
    // Or you can render charts belonging to a specific chart group
    dc.renderAll('group');
    // Once rendered you can call `.redrawAll()` to update charts incrementally when the data
    // changes, without re-rendering everything
    dc.redrawAll();
    // Or you can choose to redraw only those charts associated with a specific chart group
    dc.redrawAll('group');
    */

});

//#### Versions

//Determine the current version of dc with `dc.version`
minYear = '1988';
d3.selectAll('#version').text(dc.version);
d3.select('h2').text("Car Pricing");
d3.select('h5').text(("Year from " + minYear.toString()) + " to " + currentYear.toString());
// d3.select("#subseries-chart").select('strong').text("Series")
// d3.select("#make-piechart").select('strong').text("Car Make")
// d3.select("#model-chart").select('strong').text("Model")
// d3.select("#valuerating-histogram").select('strong').text("Value Rating Distribution")
// Determine latest stable version in the repo via Github API
d3.json('https://api.github.com/repos/dc-js/dc.js/releases/latest', function (error, latestRelease) {
    /*jshint camelcase: false */
    /* jscs:disable */
    d3.selectAll('#latest').text(latestRelease.tag_name);
});
