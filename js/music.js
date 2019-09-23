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
    
    show_stacked_chart(ndx);

    // music //
    /*show_bar_chart(ndx, 'Alternative', "#alternative", "Alternative");
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

    dc.utils.printSingleValue.fformat = d3.format('.0f'); */

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

function show_pie_chart(ndx, dimensionLabel, id) {
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
                return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            })
        })
}

function show_age_range(ndx) {
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

function show_stacked_chart(ndx) {
    
    function MusicByScore(dimension, score) {
        return dim.group().reduce(
            function (p, v) {
                p.total++;
                if(v.score == score) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.score == score) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    var dim = ndx.dimension(dc.pluck('Alternative'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    var scored1 = MusicByScore(dim, "1");
    var scored2 = MusicByScore(dim, "2");
    var scored3 = MusicByScore(dim, "3");
    var scored4 = MusicByScore(dim, "4");
    var scored5 = MusicByScore(dim, "5");

    dc.barChart("#test")
        .width(600)
        .height(300)
        .dimension(dim)
        .group(filtered_group, "1")
        .stack(filtered_group, "2")
        .stack(filtered_group, "3")
        .stack(filtered_group, "4")
        .stack(filtered_group, "5")
        .valueAccessor(function(d) {
            if(d.value.total > 0) {
                return (d.value.match / d.value.total) * 100;
            } else {
                return 0;
            }
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(520).y(20).itemHeight(15).gap(5))
        .margins({top: 10, right: 100, bottom: 30, left: 30});
}

