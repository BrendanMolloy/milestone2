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

    // movies //
    //show_enjoyment(ndx, 'Movies', "#movie-enjoyment", "I enjoy watching Movies"); 
    show_bar_chart(ndx, 'Action', "#action", "Action");
    show_bar_chart(ndx, 'Animated', "#animated", "Animated");
    show_bar_chart(ndx, 'Comedy', "#comedy", "Comedy");
    show_bar_chart(ndx, 'Documentary', "#documentary", "Documentary");
    show_bar_chart(ndx, 'Fantasy/Fairy tales', "#fantasy", "Fantasy");
    show_bar_chart(ndx, 'Horror', "#horror", "Horror");
    show_bar_chart(ndx, 'Romantic', "#romantic", "Romantic");
    show_bar_chart(ndx, 'Sci-fi', "#scifi", "Sci-Fi");
    show_bar_chart(ndx, 'Thriller', "#thriller", "Thriller");
    show_bar_chart(ndx, 'War', "#war", "War");
    show_bar_chart(ndx, 'Western', "#western", "Western");

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

function show_enjoyment(ndx, dimensionLabel, id, xlabel) {
    var dim = ndx.dimension(dc.pluck(dimensionLabel));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)

    dc.barChart(id)
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel(xlabel)
        .yAxis().ticks(10);
}

function show_bar_chart(ndx, dimensionLabel, id, xlabel) {
    var dim = ndx.dimension(dc.pluck(dimensionLabel)); //selects column from dataset
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    /*var w = 400; //adjust graph dimensions
    var h = 300; */

    dc.barChart(id)
        /*.width(w)
        .height(h) */
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel(xlabel)
        .yAxis().ticks(10);
}
