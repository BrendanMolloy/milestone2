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
    show_gender_balance(ndx);
    show_age_range(ndx); 
    show_handedness(ndx); 
    show_city_village(ndx); 
    
    // music //
    show_enjoyment(ndx);
    show_alternative(ndx);
    show_classical(ndx);
    show_country(ndx);
    show_dance(ndx);
    show_folk(ndx);
    show_hiphop(ndx);
    show_jazz(ndx);
    show_latin(ndx);
    show_metal(ndx);
    show_musicals(ndx);
    show_opera(ndx);
    show_pop(ndx);
    show_punk(ndx);
    show_reggae(ndx);
    show_rock(ndx);
    show_techno(ndx); 
    
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

/* function scale_graphs(){
    var w = parent(width);
    var h = w;
} */

//---------------------- Demographics Graphs ---------------------------------//

function show_gender_balance(ndx){
    var dim = ndx.dimension(dc.pluck('Gender'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.pieChart("#gender-balance")
        .height(200)
        .width(300)
        .externalRadiusPadding(20)
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
        .width(300)
        .height(200)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Age")
        .yAxis().ticks(10);
}

function show_handedness(ndx){
    var dim = ndx.dimension(dc.pluck('Left - right handed'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.pieChart("#handedness")
        .width(300)
        .height(200)
        .externalRadiusPadding(20)
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

function show_city_village(ndx){
    var dim = ndx.dimension(dc.pluck('Village - town'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.pieChart("#city-village")
        .width(300)
        .height(200)
        .externalRadiusPadding(20)
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

//---------------------------- Music Graphs ----------------------------------//

function show_enjoyment(ndx){
    var dim = ndx.dimension(dc.pluck('Music'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#music-enjoyment")
        .width(400)
        .height(300)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("I enjoy listening to music")
        .yAxis().ticks(10);
}

function show_alternative(ndx){
    var dim = ndx.dimension(dc.pluck('Alternative'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#alternative")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Alternative")
        .yAxis().ticks(10);
}

function show_classical(ndx){
    var dim = ndx.dimension(dc.pluck('Classical music'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#classical")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Classical")
        .yAxis().ticks(10);
}

function show_country(ndx){
    var dim = ndx.dimension(dc.pluck('Country'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#country")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Country")
        .yAxis().ticks(10);
}

function show_dance(ndx){
    var dim = ndx.dimension(dc.pluck('Dance'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#dance")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Dance")
        .yAxis().ticks(10);
}

function show_folk(ndx){
    var dim = ndx.dimension(dc.pluck('Folk'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#folk")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Folk")
        .yAxis().ticks(10);
}

function show_hiphop(ndx){
    var dim = ndx.dimension(dc.pluck('Hiphop, Rap'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#hiphop")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Hip hop")
        .yAxis().ticks(10);
}

function show_jazz(ndx){
    var dim = ndx.dimension(dc.pluck('Swing, Jazz'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#jazz")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Jazz")
        .yAxis().ticks(10);
}

function show_latin(ndx){
    var dim = ndx.dimension(dc.pluck('Latino'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#latin")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Latin")
        .yAxis().ticks(10);
}

function show_metal(ndx){
    var dim = ndx.dimension(dc.pluck('Metal or Hardrock'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#metal")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Metal")
        .yAxis().ticks(10);
}

function show_musicals(ndx){
    var dim = ndx.dimension(dc.pluck('Musical'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#musicals")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Musicals")
        .yAxis().ticks(10);
}

function show_opera(ndx){
    var dim = ndx.dimension(dc.pluck('Opera'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#opera")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Opera")
        .yAxis().ticks(10);
}

function show_pop(ndx){
    var dim = ndx.dimension(dc.pluck('Pop'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#pop")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Pop")
        .yAxis().ticks(10);
}

function show_punk(ndx){
    var dim = ndx.dimension(dc.pluck('Punk'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#punk")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Punk")
        .yAxis().ticks(10);
}

function show_reggae(ndx){
    var dim = ndx.dimension(dc.pluck('Reggae, Ska'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#reggae")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Reggae")
        .yAxis().ticks(10);
}

function show_rock(ndx){
    var dim = ndx.dimension(dc.pluck('Rock'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#rock")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Rock")
        .yAxis().ticks(10);
}

function show_techno(ndx){
    var dim = ndx.dimension(dc.pluck('Techno, Trance'));
    var group = dim.group();
    var filtered_group = remove_empty_bins(group)
    
    dc.barChart("#techno")
        .width(300)
        .height(225)
        .margins({top:10, right:50, bottom:30, left:50})
        .dimension(dim)
        .group(filtered_group)
        .transitionDuration(500) 
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Techno")
        .yAxis().ticks(10);
}
