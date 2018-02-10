'use strict';
var margin = {top: 30, right: 30, bottom: 2, left: 30},
    data = [],
    table, chart,
    commasFormatter = d3.format(",.0f"),
    mode = "showInternet",
    svgGroup;

// get the raw data tsv file
d3.csv("data.csv", function (error, json) {

    var nest = d3.nest()
        .key(function (d) {
            return d["Country Code"];
        })
        .key(function (d) {
            return d["Indicator Code"];
        })
        .entries(json);

    // create usable data structure, process country by country
    nest.forEach(function (d) {
        var include = true;
        var item = {};

        item.key = d.key;
        item.countryCode = d.key;
        item.countryName = d.values[0].values[0]["Country Name"];

        ["GDP", "Cellular", "Internet"].forEach(function (c, i) {
            var value = d.values[i].values[0]["2012 [YR2012]"];
            if (value === "..") {
                include = false;
                return;
            } // exclude countries with any null values

            item["indicatorName" + c] = d.values[i].values[0]["Indicator Name"];
            item["indicatorCode" + c] = d.values[i].values[0]["Indicator Code"];
            item["value" + c] = +value;
        });

        if (include) data.push(item);
    });

    // select the chart div
    var chartDiv = d3.select("#chartDiv")
        .style("overflow", "scroll");

    // select the svg element
    var svg = d3.select("#svgDiv")
        .attr("width", "580px")
        .attr("height", "430px")
        .style("margin-bottom", "10px")
        .style("margin-right", "10px")
        .style("background-color", "white");

    svgGroup = svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    // create chart
    chart = scatterView()
        .accessor(mode)
        .data(data);

    chart(svgGroup);

    // select table div
    var tableDiv = d3.select("#tableDiv")
        .style("overflow", "scroll")
        .style("width", "330px")
        .style("height", "400px")
        .style("margin", "0px")
        .style("padding-left", "0px");

    // create table
    table = tableView()
        .data(data);

    table(tableDiv);

    // define handlers after chart and table are constructed
    chart.on("filter", function (filtered) {
        table.data(filtered);
        table(tableDiv);
    });

    table.on("hover", function (item) {
        chart.highlight(item)
    });

    chart.forceBrushEvent(); //TODO: upon initial load, table is not synced to brush


    // chart function -----------------------------------------------------------------------------
    function scatterView() {
        var dispatch = d3.dispatch(chart, "filter");
        var data,
            dataYmax, dataXmax,
            saveG,
            radius = 7, radiusSelected = 9,
            strokeWidth = 1,
            fillOpacity = 0.5,
            colorFill,
            colorStroke,
            mode = "internet",
            colors = {
                red: 'rgb(216, 50, 51)',
                green: 'rgb(51, 164, 51)',
                blue: 'rgb(42, 126, 184)',
                orange: 'rgb(255, 134, 26)'
            }

        function x(g) {
            // save reference to svg group (for highlight method)
            saveG = g;

            // get dimensions of parent
            var container = d3.select(g.node().parentNode);
            var width = +container.attr("width").replace("px", "");
            var height = +container.attr("height").replace("px", "");

            // remove all previous elements in group
            g.selectAll("*").remove();

            // set dimensions
            var chartWidth = width - 60;
            var chartHeight = height - 60;

            var xField = function (d) {
                return d.valueGDP;
            };
            var yField = function (d) {
                return yAccessor(d);
            };

            var yAccessor = function (d) {
                if (mode == "internet") return d.valueInternet;
                else return d.valueCellular;
            }

            dataYmax = d3.max(data, yField);
            var yScale = d3.scale.linear()
                .domain([0, d3.max(data, yField)])
                .range([chartHeight, 0]);

            dataXmax = d3.max(data, xField) + 10000;
            var xScale = d3.scale.log()
                .domain([d3.min(data, xField), d3.max(data, xField) + 10000])
                .range([0, chartWidth - 10]);

            // set colors for this mode
            colorFill = (mode === "internet" ? colors.orange : colors.green);
            colorStroke = (mode === "internet" ? colors.orange : colors.green);

            // set color scale for circle color --> not used at the moment
            var colorScale = d3.scale.linear()
                .domain([0, d3.max(data, function (d) {
                    return d.valueGDP
                })])
                .range(["#17D84D", "#FF1D1D"])
                .interpolate(d3.interpolateHsl);

            // create circles for scatter chart, and bind data
            var circles = g
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d, i) {
                    return xScale(xField(d));
                })
                .attr("cy", function (d, i) {
                    return yScale(yField(d));
                })
                .attr("r", radius)
                .style("fill", colorFill)
                .style("stroke", colorStroke)
                .style("stroke-width", strokeWidth)
                .style("fill-opacity", fillOpacity)
                .on("click", function (d) {
                    console.log(d.key);
                });

            // setup y axis
            var yaxis = d3.svg.axis()
                .scale(yScale)
                .orient("left") //left, right, top
                .ticks(4) //best guess

            // call y axis
            var yg = g.append("g")
                .call(yaxis)
                .attr("class", "axis");

            yg
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 10)
                .attr("x", -10)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Penetration per 100 people");

            // format y axis
            yg.selectAll("path").style({fill: "none", stroke: "gray"})
            //yg.selectAll(".tick text").attr("transform", "rotate(0)")
            yg.selectAll("line").style({stroke: "#000"});

            // setup x axis
            var xaxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom") //left, right, top
                .ticks(5) // doesn't really work on a log scale
                //.tickFormat(function(d) { return commasFormatter(d); })
                .tickFormat(function (d) {
                    return xScale.tickFormat(4, d3.format(",d"))(d)
                });

            // call x axis
            var xg = g.append("g")
                .call(xaxis)
                .attr("class", "axis");

            xg.append("text")
            //.attr("transform", "rotate(-90)")
                .attr("y", -20)
                .attr("x", chartWidth - 20)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("GDP per capita (curr $)");

            // format x axis
            xg.attr("transform", "translate(" + [0, chartHeight] + ")")
            xg.selectAll("path").style({fill: "none", stroke: "gray"})
            xg.selectAll("line").style({stroke: "#000"})
            //xg.selectAll(".tick text").attr("transform", "rotate(0)")

            // create brush
            var brush = d3.svg.brush()
                .x(xScale)
                .y(yScale)
                .extent([[2000, dataYmax * 0.3], [20000, dataYmax * 0.7]])
                .on("brush", brushed);

            // create brush group
            var brushg = g.append("g")
                .classed("brush", true)
                .call(brush);

            // set brush styles (after brush is created)
            //brushg.selectAll(".background").style({visibility: "visible"})
            brushg.selectAll(".background").style({visibility: "none"})
            brushg.selectAll(".extent").style({visibility: "visible"})
            //brushg.selectAll(".resize rect").style({visibility: "visible"})

            // initial invokation
            brushed();

            // brush handler
            function brushed() {
                var minext = brush.extent()[0];
                var xmin = minext[0];
                var ymin = minext[1];

                var maxext = brush.extent()[1];
                var xmax = maxext[0];
                var ymax = maxext[1];

                var filtered = data.filter(function (d) {
                    var x = xField(d);
                    var y = yField(d);
                    return x >= xmin
                        && x <= xmax
                        && y >= ymin
                        && y <= ymax;
                })

                g.selectAll("circle")
                    .style("stroke", colorStroke)
                    .style("fill-opacity", fillOpacity)

                g.selectAll("circle")
                    .data(filtered, function (d) {
                        return d.key
                    })
                    //.style("stroke", "#FFFFFF")
                    .style("stroke", "black")
                    .style("fill-opacity", 0.8)

                if (filtered.length == 0) filtered = data;
                dispatch.filter(filtered);

            } // end brush handler

        } // end x function

        x.data = function (_) {
            if (!arguments.length) return data;
            data = _;

            return x;
        }

        x.highlight = function (_) {
            saveG.selectAll("circle")
                .attr("r", radius)
                .style("stroke-width", strokeWidth)
                .style("fill", colorFill)
                .style("fill-opacity", fillOpacity)
                // matching data only
                .data(_, function (d) {
                    return d.key
                })
                .attr("r", radiusSelected)
                .style("stroke-width", 1)
                .style("fill", colors.red)
                .style("fill-opacity", 1);

            return x;
        }

        x.accessor = function (_) {
            if (!arguments.length) return mode;
            if (_ === "showInternet") mode = "internet";
            else mode = "cellular";

            return x;
        }

        x.forceBrushEvent = function () {
            //console.log('x.forceBrushEvent');

            return x;
        }

        return d3.rebind(x, dispatch, "on");

    } // end scatterView function


    // table function -----------------------------------------------------------------------------
    function tableView() {
        var dispatch = d3.dispatch(x, "hover");
        var data,
            sortColumn = "countryCode";

        function x(div) {
            div.select("#table").remove();

            var table = div.append("table")
                .attr("class", "table table-condensed table-bordered table-striped")
                .attr("id", "table")
                .style("background-color", "white");

            var columnWidths = ["10%", "30%", "20%", "20%", "20%"];
            table.selectAll("col")
                .data(columnWidths)
                .enter()
                .append("col")
                .style("width", function (d) {
                    return d;
                });

            var columnHead = ["Code", "Country", "Cellular use per 100 people", "Internet use per 100 people", "GDP per capita ($)"];
            var columnData = ["countryCode", "countryName", "valueCellular", "valueInternet", "valueGDP"];

            var thead = table.append("thead");
            var tbody = table.append("tbody");
            thead.append("tr")
                .selectAll("th")
                .data(columnHead)
                .enter()
                .append("th")
                .attr("id", function (d, i) {
                    return "head" + i;
                })
                .attr("class", "colHead")
                .style("background-color", function (d, i) {
                    return (columnData[i] === sortColumn) ? "rgb(220, 220, 220)" : "white";
                })
                .text(function (d) {
                    return d;
                })
                .on("click", function (d, i) {
                    sortColumn = columnData[i];
                    x.sort();
                    x(div);
                });

            // create table rows
            var rows = tbody.selectAll("tr")
                .data(data)
                .enter()
                .append("tr");

            // create cells
            rows.selectAll("td")
                .data(function (d) {
                    return columnData.map(function (column) {
                        var value = d[column];
                        if (typeof value == "number") {
                            if (column === "valueGDP") value = commasFormatter(value)
                            else value = value.toFixed(2);
                        }
                        return {value: value};
                    });
                })
                .enter()
                .append("td")
                .html(function (d) {
                    return d.value;
                });

            //rows.exit().remove();

            // handle hover events
            rows.on("mouseover", function (d, i) {
                dispatch.hover([d])
            })
            rows.on("mouseout", function (d, i) {
                dispatch.hover([])
            })
        }

        x.data = function (_) {
            if (!arguments.length) return data;
            data = _;
            x.sort();

            return x;
        }

        x.sort = function () {
            var result = 0;
            data.sort(function (a, b) {
                if (a[sortColumn] > b[sortColumn]) result = -1;
                if (a[sortColumn] < b[sortColumn]) result = 1;
                if (sortColumn === "countryCode" || sortColumn === "countryName") result *= -1;

                return result;
            });
        }

        return d3.rebind(x, dispatch, "on");

    } // end tableView function


    // controls -----------------------------------------------------------------------------------
    d3.selectAll("input").on("change", change);

    function change() {
        if (this.value === "internet") mode = "showInternet";
        else mode = "showCellular";
        //console.log(mode);

        // regenerate the chart
        chart
            .accessor(mode)
            .data(data);

        chart(svgGroup);
    }

    var helpBtn = d3.select("#helpBtn")
        .on("click", function () {

            // get current state of help div
            var helpDiv = d3.select("#helpDiv");
            if (helpDiv.style("display") == "none") helpDiv.style("display", "block");
            else helpDiv.style("display", "none");

            helpBtn[0][0].blur(); // remove focus
        });


}); // end d3.tsv ajax
