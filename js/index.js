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
    
    dc.utils.printSingleValue.fformat = d3.format('.0f');
    
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
        .externalRadiusPadding(0)
        .innerRadius(0)
        .dimension(dim)
        .group(filtered_group)
        .legend(dc.legend())
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

