'use strict';

// title div with label and button
var header = d3.select(".table_placeholder").append("div").attr("class", "well");


header.append("h3").text("Notable events relating to selected CCY " + ccyfilter)
		.attr("text-align", "left")
		.attr("class","h3class")
;

var taskLabel = header.append("label")
    .attr("id", "taskLabel")
    .html("&nbsp;");
header.append("br")
var currTask = 0;
  
var show_related_news = header.append("button")
    .attr("class", "btn btn-primary")
    .style("margin-bottom", "20px")
    .style("width", "200px")
    .style("text-align", "left")
		.style("margin-left", "1px")
    .text("Data Relations")
    .on("click", function() {
      this.blur();
      // execute the task
      showmatrix("interests.csv");
      // next task
//       currTask = ++currTask % tasks.length;
    })

var taskButton2 = header.append("button")
    .attr("class", "btn btn-primary")
    .style("margin-bottom", "20px")
    .style("width", "200px")
    .style("text-align", "left")
		.style("margin-left", "1px")

    .text("Show Matrix")
    .on("click", function() {
      this.blur();
      // execute the task
      showmatrix("matrix.csv");
      // next task
//       currTask = ++currTask % tasks.length;
    })
var button_clear = header.append("button")
    .attr("class", "btn btn-primary")
    .style("margin-bottom", "20px")
    .style("width", "200px")
    .style("text-align", "left")
		.style("margin-left", "1px")

    .text("Clear")
    .on("click", function() {
      this.blur();
      // execute the task
      task_delete_tables();
      // next task
//       currTask = ++currTask % tasks.length;
    })

// container for array of tables
var tableDiv = d3.select(".table_placeholder").append("div").attr("id", "tableDiv1");

// initial data
var data;
var initialData = [
  { table: "Notable Events", rows: [
      { col1: "abc", col2: "Row1", col3: "DataT1R1" },
	  { col1: "sdfasdf", col2: "Row1", col3: "DataT1R1" },
      { col1: "asdfasdf", col2: "Row2", col3: "DataT1R2" }
    ]
  }
]

// tasks
function task_delete_tables() {
  // clear any existing tables (by providing an empty array)
//   update([]);
// 	var table = d3.select("wells").select("table").selectAll("tr")
  var divs = tableDiv.selectAll("div");
  ccyfilter="";
  divs.remove();
//   taskLabel.html("Cleared any existing tables");
}


function task_initialize() {
  // load initial tables
  data = JSON.parse(JSON.stringify(initialData));
  update(data);
	console.log(data);
  taskLabel.text("Step 1: Initial tables loaded");
}

function task_initialize_csv() {
  data = JSON.parse(JSON.stringify(initialData));
  update(data);
  update([]);
  
  d3.text("interests.csv", function(csvdata) {

  var divs = tableDiv.selectAll("div")
      // after .data() is executed below, divs becomes a d3 update selection
      .data(data,                     // new data
        function(d) { return d.table  // "key" function to disable default by-index evaluation
      }) 
  
    var divsEnter = divs.enter().append("div")
    .attr("id", function(d) { return d.table + "Div"; })
    .attr("class", "well")

    // add title in new div(s)
    divsEnter.append("h5").text(function(d) { return d.table; });

    // add table in new div(s)
    var tableEnter = divsEnter.append("table")
    .attr("id", function(d) { return d.table })
    .attr("class", "table table-condensed table-striped table-bordered")

    // append table head in new table(s)
    tableEnter.append("thead")
      .append("tr")
      .selectAll("th")
      .data(["Currency Pair", "Time", "Related Information"]) // table column headers (here constant, but could be made dynamic)
      .enter().append("th")
      .text(function(d) { return d; })

    // append table body in new table(s)
    tableEnter.append("tbody");
    
    
    var parsedCSV = d3.csv.parseRows(csvdata);
    var tr = divs.select("table").select("tbody").selectAll("tr")
    .data(parsedCSV).enter()
    .append("tr")

    .selectAll("td")
    .data(function(d) { return d; }).enter()
    .append("td")
    .text(function(d) { return d; });

  });
}

function task_update_insert() {
  // add 4th row to table 2
  data[0].rows.push({ table: "Table2", row: "Row4", data: "DataT2R4" });
  update(data);
	
  taskLabel.text("Step 2: Added 4th row to Table 2");
}

function showmatrix(filename){
  
  header.select('h3').text("Notable events relating to selected CCY " + ccyfilter);

  
  data = JSON.parse(JSON.stringify(initialData));
  update(data);
  update([]);
  

  
  d3.text(filename, function(csvdata) {

  var divs = tableDiv.selectAll("div")
      // after .data() is executed below, divs becomes a d3 update selection
      .data(data,                     // new data
        function(d) { return d.table  // "key" function to disable default by-index evaluation
      }) 
  
    var divsEnter = divs.enter().append("div")
    .attr("id", function(d) { return d.table + "Div"; })
    .attr("class", "well")

    // add title in new div(s)
    divsEnter.append("h5").text(function(d) { return d.table; });
    var parsedCSV = d3.csv.parseRows(csvdata);

    // add table in new div(s)
    var tableEnter = divsEnter.append("table")
    .attr("id", function(d) { return d.table })
    .attr("class", "table table-condensed table-striped table-bordered")
		
    
    // append table head in new table(s)
    tableEnter.append("thead") 
      .append("tr")
      .selectAll("th")
      .data((parsedCSV[0])) // table column headers (here constant, but could be made dynamic)
      .enter().append("th")
      .text(function(d) { return d; })
		
    // append table body in new table(s)
    tableEnter.append("tbody");
    parsedCSV.splice(0,1);
    
    // Filter
    if ( filename.includes('interest')){
      for (var i = parsedCSV.length - 1; i >= 0; i--) {
				
        // Filter on year and currency
        if ( (!parsedCSV[i][1].includes(csvfilter)) || (!parsedCSV[i][0].includes(ccyfilter) )  )  { 
          console.log(parsedCSV.splice(i,1));
        }   
		
        // if ( (!parsedCSV[i][1].includes(csvfilter))  and  (!parsedCSV[i][0].includes(ccyfilter) ) )  { 
          // console.log(parsedCSV.splice(i,1));
        // }
      }
    }

    
    var tr = divs.select("table").select("tbody").selectAll("tr")
      .data(parsedCSV).enter()
      .append("tr")
      .selectAll("td")
      .data(function(d) { return d; }).enter()
      .append("td")
      .text(function(d) { return d; })
    // .html(function(d) { return d; })
    ;
  });
}

function task_updated() {
  // change the content of row 1 of table 1
  var item = data[0].rows[0].data;
  data[0].rows[0].data = item + " - Updated";
  update(data);

  taskLabel.text("About To restart");
  taskButton.text("Restart") ;  
}

// task list (array of functions)
var tasks = [task_delete_tables,task_initialize,task_update_insert,task_updated]




// function in charge of the array of tables
function update(data) {

  // select all divs in the table div, and then apply new data 
  var divs = tableDiv.selectAll("div")
      // after .data() is executed below, divs becomes a d3 update selection
      .data(data,                     // new data
        function(d) { return d.table  // "key" function to disable default by-index evaluation
      }) 

  // use the exit method of the d3 update selection to remove any deleted table div and contents (which would be absent in the data array just applied)
  divs.exit().remove();

  // use the enter metod of the d3 update selection to add new ("entering") items present in the data array just applied
  var divsEnter = divs.enter().append("div")
      .attr("id", function(d) { return d.table + "Div"; })
      .attr("class", "well")

  // add title in new div(s)
  divsEnter.append("h5").text(function(d) { return d.table; });

  // add table in new div(s)
  var tableEnter = divsEnter.append("table")
      .attr("id", function(d) { return d.table })
      .attr("class", "table table-condensed table-striped table-bordered")

  // append table head in new table(s)
  tableEnter.append("thead")
    .append("tr")
      .selectAll("th")
      .data(["Currency Pair", "Time", "Related Information"]) // table column headers (here constant, but could be made dynamic)
    .enter().append("th")
      .text(function(d) { return d; })

  // append table body in new table(s)
  tableEnter.append("tbody");

  // select all tr elements in the divs update selection
  var tr = divs.select("table").select("tbody").selectAll("tr")
      // after the .data() is executed below, tr becomes a d3 update selection
      .data(
        function(d) { return d.rows; }, // return inherited data item
        function(d) { return d.row }    // "key" function to disable default by-index evaluation
      ); 

  // use the exit method of the update selection to remove table rows without associated data
  tr.exit().remove();

  // use the enter method to add table rows corresponding to new data
  tr.enter().append("tr");

  // bind data to table cells
  var td = tr.selectAll("td")
      // after the .data() is executed below, the td becomes a d3 update selection
      .data(function(d) { return d3.values(d); });   // return inherited data item

  // use the enter method to add td elements 
  td.enter().append("td")               // add the table cell
      .text(function(d) { return d; })  // add text to the table cell
}

