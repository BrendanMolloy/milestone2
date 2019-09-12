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
    /*show_bar_chart(ndx, 'Active sport', "#sport-competitive", "Sport (competitive)"); Cannot render these last three graphs as crossfilter can only render a maximum of 32 graphs at once.
    show_bar_chart(ndx, 'Adrenaline sports', "#sport-extreme", "Sport (extreme)"); 
    show_bar_chart(ndx, 'Theatre', "#theatre", "Theatre"); */
    
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
