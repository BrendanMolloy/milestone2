/* global queue */
/* global d3 */
/* global crossfilter */
/* global dc */

queue()
    .defer(d3.csv, "data/young-people.csv")
    .await(makeGraphs);
    
function makeGraphs(error, ypData){
    var ndx = crossfilter(ypData);
    
    // demographics // 
    show_age_range(ndx); 
    show_pie_chart(ndx, 'Gender', "#gender-balance");
    show_pie_chart(ndx, 'Village - town', "#city-village");
    show_pie_chart(ndx, 'Left - right handed', "#handedness")
    
    // interests //
    show_bar_chart(ndx, 'Healthy eating', "#healthy", "I live a very healthy lifestyle");
    show_bar_chart(ndx, 'Alcohol', "#drinking", "Drinking Habits"); 
    show_bar_chart(ndx, 'Smoking', "#smoking", "Smoking Habits");
    
    dc.renderAll();
}

function remove_empty_bins(source_group) { //eliminates empty or null values from the dataset, so graphs can render unimpeded//
    return {
        all:function () {
            return source_group.all().filter(function(d) {
                //return Math.abs(d.value) > 0.00001; // if using floating-point numbers
                return d.key !== ""; // if integers only
            });
        }
    };
}

    

//---------------------- Demographics Graphs ---------------------------------//

function show_pie_chart(ndx, dimensionLabel, id){
    var dim = ndx.dimension(dc.pluck(dimensionLabel));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.pieChart(id)
        .useViewBoxResizing(true)
        .externalRadiusPadding(10)
        .innerRadius(0)
        .dimension(dim)
        .group(filtered_group)
        .legend(dc.legend())
        .xAxis().tickFormat(d3.format('.0f'))
        .on('pretransition', function(chart) {
        chart.selectAll('text.pie-slice').text(function(d) {
            return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        })
    })
} 

function show_age_range(ndx){
    var dim = ndx.dimension(dc.pluck('Age'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#age")
        .useViewBoxResizing(true)
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Age")
        .yAxis().ticks(10);
} 

/*function show_age_range(ndx){ //displays age distribution in pie chart form
    var dim = ndx.dimension(dc.pluck('Age'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.pieChart("#age")
        .useViewBoxResizing(true)
        .externalRadiusPadding(10)
        .innerRadius(0)
        .dimension(dim)
        .group(filtered_group)
        .legend(dc.legend())
        .on('pretransition', function(chart) {
        chart.selectAll('text.pie-slice').text(function(d) {
            return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        })
    })
} */

//---------------------------- Main Graphs ----------------------------------//

function show_bar_chart(ndx, dimensionLabel, id, xlabel){
    var dim = ndx.dimension(dc.pluck(dimensionLabel)); //selects column from dataset
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart(id)
        .width(400)
        .height(300)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel(xlabel)
        .yAxis().ticks(10);
}
