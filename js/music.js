/* global queue */
/* global d3 */
/* global crossfilter */
/* global dc */

queue()
    .defer(d3.csv, "data/young-people.csv")
    .await(makeGraphs);

function makeGraphs(error, ypData) {
    var ndx = crossfilter(ypData);

    // demographics // 
    show_dropdown(ndx, 'Age', "#age-filter");
    show_dropdown(ndx, 'Gender', "#gender-filter");
    show_dropdown(ndx, 'Village - town', "#city-village-filter");
    show_dropdown(ndx, 'Left - right handed', "#handedness-filter");

    // music //
    show_bar_chart(ndx, 'Alternative', "#alternative", "Alternative");
    show_bar_chart(ndx, 'Classical music', "#classical", "Classical");
    show_bar_chart(ndx, 'Country', "#country", "Country");
    show_bar_chart(ndx, 'Dance', "#dance", "Dance");
    show_bar_chart(ndx, 'Folk', "#folk", "Folk");
    show_bar_chart(ndx, 'Hiphop, Rap', "#hiphop", "Hip hop");
    show_bar_chart(ndx, 'Swing, Jazz', "#jazz", "Jazz");
    show_bar_chart(ndx, 'Latino', "#latin", "Latin");
    show_bar_chart(ndx, 'Metal or Hardrock', "#metal", "Metal");
    show_bar_chart(ndx, 'Musical', "#musicals", "Musicals");
    show_bar_chart(ndx, 'Opera', "#opera", "Opera");
    show_bar_chart(ndx, 'Pop', "#pop", "Pop");
    show_bar_chart(ndx, 'Punk', "#punk", "Punk");
    show_bar_chart(ndx, 'Reggae, Ska', "#reggae", "Reggae");
    show_bar_chart(ndx, 'Rock', "#rock", "Rock");
    show_bar_chart(ndx, 'Techno, Trance', "#techno", "Techno");

    dc.utils.printSingleValue.fformat = d3.format('.0f'); 

    dc.renderAll();
}

function remove_empty_bins(source_group) { //eliminates empty or null values from the dataset, so graphs can render unimpeded//
    return {
        all: function() {
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

function show_bar_chart(ndx, dimensionLabel, id, xlabel) {
    var dim = ndx.dimension(dc.pluck(dimensionLabel)); //selects column from dataset
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    /*var w = 240; //adjust graph dimensions
    var h = 180; */

    dc.barChart(id)
        /*.width(w)
        .height(h) */
        .useViewBoxResizing(true)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel(xlabel)
        .yAxis().ticks(5);
}

