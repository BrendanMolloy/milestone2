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
    show_dropdown(ndx, 'Age', "#age-filter");
    show_dropdown(ndx, 'Gender', "#gender-filter");
    show_dropdown(ndx, 'Village - town', "#city-village-filter");
    show_dropdown(ndx, 'Left - right handed', "#handedness-filter");
    
    // interests //
    show_bar_chart(ndx, 'Healthy eating', "#healthy", "I live a very healthy lifestyle");
    show_bar_chart(ndx, 'Alcohol', "#drinking", "Drinking Habits"); 
    show_bar_chart(ndx, 'Smoking', "#smoking", "Smoking Habits");
    
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

//-------------------------- Demographics ------------------------------------//

function show_dropdown(ndx, dimensionLabel, id) {
    var dim = ndx.dimension(dc.pluck(dimensionLabel));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)

    dc.selectMenu(id)
        .dimension(dim)
        .group(filtered_group);
}

//---------------------------- Main Graphs ----------------------------------//

function show_bar_chart(ndx, dimensionLabel, id, xlabel){
    var dim = ndx.dimension(dc.pluck(dimensionLabel)); //selects column from dataset
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart(id)
        /*.width(400)
        .height(300) */
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel(xlabel)
        .yAxis().ticks(5);
}
