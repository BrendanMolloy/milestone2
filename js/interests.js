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

    // interests //
    show_bar_chart(ndx, 'Art exhibitions', "#art", "Art");
    show_bar_chart(ndx, 'Biology', "#biology", "Biology");
    show_bar_chart(ndx, 'Cars', "#cars", "Cars");
    show_bar_chart(ndx, 'Celebrities', "#celebrities", "Celebrities");
    show_bar_chart(ndx, 'Chemistry', "#chemistry", "Chemistry");
    show_bar_chart(ndx, 'PC', "#computers", "Computers");
    show_bar_chart(ndx, 'Dancing', "#dancing", "Dancing");
    show_bar_chart(ndx, 'Economy Management', "#economics", "Economics");
    show_bar_chart(ndx, 'Foreign languages', "#languages", "Languages");
    show_bar_chart(ndx, 'Gardening', "#gardening", "Gardening");
    show_bar_chart(ndx, 'Geography', "#geography", "Geography");
    show_bar_chart(ndx, 'History', "#history", "History");
    show_bar_chart(ndx, 'Internet', "#internet", "Internet");
    show_bar_chart(ndx, 'Law', "#law", "Law");
    show_bar_chart(ndx, 'Mathematics', "#mathematics", "Mathematics");
    show_bar_chart(ndx, 'Medicine', "#medicine", "Medicine");
    show_bar_chart(ndx, 'Pets', "#pets", "Pets");
    show_bar_chart(ndx, 'Physics', "#physics", "Physics");
    show_bar_chart(ndx, 'Musical instruments', "#playing-instruments", "Playing Musical Instruments");
    show_bar_chart(ndx, 'Reading', "#poetry-reading", "Poetry (reading)");
    show_bar_chart(ndx, 'Writing', "#poetry-writing", "Poetry (writing)");
    show_bar_chart(ndx, 'Politics', "#politics", "Politics");
    show_bar_chart(ndx, 'Psychology', "#psychology", "Psychology");
    show_bar_chart(ndx, 'Religion', "#religion", "Religion");
    show_bar_chart(ndx, 'Science and technology', "#science-tech", "Science and Technology");
    show_bar_chart(ndx, 'Shopping', "#shopping", "Shopping");
    show_bar_chart(ndx, 'Fun with friends', "#socializing", "Socializing");
    show_bar_chart(ndx, 'Passive sport', "#sport-casual", "Sport");

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

    dc.barChart(id) //finds the id of the div the graph will attach to
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
