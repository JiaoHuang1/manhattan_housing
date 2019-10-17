import './styles/index.scss';
var zipcode_coord_data = require('../data/zipcode_lat_lng.json');
var studio_z10001 = require('../data/studio_by_zip/studio_z10001.json');
var studio_z10002 = require('../data/studio_by_zip/studio_z10002.json');
var studio_z10003 = require('../data/studio_by_zip/studio_z10003.json');


//Bronx: central bronx
var studio_z10457 = require('../data/studio_by_zip/studio_z10457.json');
var onebed_z10457 = require('../data/onebed_by_zip/onebed_z10457.json');
var twobed_z10457 = require('../data/twobed_by_zip/twobed_z10457.json');
var threebed_z10457 = require('../data/threebed_by_zip/threebed_z10457.json');
//Brooklyn: central brooklyn
var studio_z11238 = require('../data/studio_by_zip/studio_z11238.json');
var onebed_z11238 = require('../data/onebed_by_zip/onebed_z11238.json');
var twobed_z11238 = require('../data/twobed_by_zip/twobed_z11238.json');
var threebed_z11238 = require('../data/threebed_by_zip/threebed_z11238.json');


window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('app').innerText = "Hello World!";
        // Width and Height of the whole visualiation
        var width = 1000;
        var height = 1100;

        // create SVG
        var svg = d3.select( "body" )
            .append( "svg" )
            .attr( "width", width )
            .attr( "height", height );

        // Append empty placeholder g element to the SVG
        // g will contain geometry elements
        var g = svg.append( "g" );

        // Width and Height of the whole visualization
        // Set Projection Parameters
        var albersProjection = d3.geoAlbers()
            .scale( 100000 )
            .rotate( [74.071, 0] )
            .center( [0, 40.783] )
            .translate( [width/2,height/2] );

        // Create GeoPath function that uses built-in D3 functionality to turn
        // lat/lon coordinates into screen coordinates
        var geoPath = d3.geoPath()
            .projection( albersProjection );

        // Conver zipcode to lat & lng
        let zipcodeConverter = {};
        zipcode_coord_data.records.forEach(zone => {
            zipcodeConverter[zone.fields.zip] = zone.fields.geopoint
        })


        function pinDataToMap(coord, apt_type, data) {
    
            // svg.selectAll()
            // .data(data)
            // .enter()
            // // .append("rect")
            // // .attr("height", function(d) {console.log(d[1]); return d[1]/100})
            // // .attr("width", 2)
            // // .attr("transform", function(d) {return "translate(" + albersProjection(coord) + ")";})
            // .append("circle")
            // .attr("cx", albersProjection(coord)[0])
            // .attr("cy", albersProjection(coord)[1])
            // .attr("r", "3px")
            // .attr("class", function(d) {return `Y${d[0]} ${apt_type}`})
            // .attr("fill", "red")
            // .append("line")
            // .attr("height", 10)

            var gg = svg.selectAll()
                        .data(data)
                        .enter()
                        .append("g")

            gg.append("circle")
            .attr("cx", albersProjection(coord)[0])
            .attr("cy", albersProjection(coord)[1])
            .attr("r", "3px")
            .attr("fill", "red")
            .attr("class", function(d) {return `Y${d[0]} ${apt_type}`})

            gg.append("line")
            .attr("x1", albersProjection(coord)[0])
            .attr("y1", albersProjection(coord)[1] - 3)
            .attr("x2", albersProjection(coord)[0])
            .attr("y2", function(d) {return albersProjection(coord)[1] - d[1]/25})
            .attr("stroke-width", 1)
            .attr("stroke", "black")
            .attr("class", function(d) {return `Y${d[0]} ${apt_type}`})

            gg.append("text")
            .text(function(d) {return `${d[0]} : ${Math.floor(d[1])}`})
            .attr("x", albersProjection(coord)[0])
            .attr("y", function(d) {return albersProjection(coord)[1] - d[1]/25})
            .attr("font-size", "10px")
            .attr("class", function(d) {return `Y${d[0]} ${apt_type}`})
        }

        function pinFile(jsonData) {
            let zip = jsonData.dataset.dataset_code.split("_")[0].slice(1);
            let coord = [zipcodeConverter[zip][1], zipcodeConverter[zip][0]];
            let apt_type = jsonData.dataset.dataset_code.split("_")[1]
            console.log(apt_type)
            let year_avg = {}
            let data = []
            jsonData.dataset.data.forEach(entry => {
                let year = entry[0].split("-")[0]
                let rent = entry[1]
                if (!year_avg[year]) {
                    year_avg[year] = [rent];
                } else {
                    year_avg[year].push(rent);
                }
            })

            Object.keys(year_avg).forEach(year => {
                let sum = year_avg[year].reduce((a, b) => a + b);
                let avg = sum / year_avg[year].length;
                data.push([year, avg])
            })
           
            pinDataToMap(coord, apt_type, data);
        }

        // Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes
        d3.json("data/new_york_map_by_zip.json", newyork_data => {
            // console.log(newyork_data);
            g.selectAll( "path" )
                .data( newyork_data.features )
                .enter()
                .append( "path" )
                .attr( "fill", "#ccc" )
                .attr( "stroke", "#333")
                .attr( "d", geoPath );
               
            // let zip1 = studio_z10001.dataset.dataset_code.split("_")[0].slice(1);
            // let second_coord = [zipcodeConverter[zip1][1], zipcodeConverter[zip1][0]]
            // pinDataToMap(second_coord, studio_z10001.dataset.data);  
            console.log("10001")
            pinFile(studio_z10001);
            console.log("10002")
            pinFile(studio_z10002);
            pinFile(studio_z10003);
            pinFile(studio_z10457);
            pinFile(onebed_z10457);
            pinFile(twobed_z10457);
            pinFile(threebed_z10457);
            pinFile(studio_z11238);
            pinFile(onebed_z11238);
            pinFile(twobed_z11238);
            pinFile(threebed_z11238);

        })


        // for time slider
        var inputValue = null;
        var inputType = null;
        var year = ["Year", "2012","2013","2014","2015","2016","2017","2018","2019"];
        var type = ["Type", "Studio", "One Bedroom", "Two Bedroom", "Three Bedroom"]

        d3.select("#yearslide").on("input", function() {
            update_year(+this.value);
        });

        d3.select("#typeslide").on("input", function() {
            update_type(+this.value);
        });
        
        // update the fill of each SVG of class "incident" with value
        function update_year(value) {
            document.getElementById("year-range").innerHTML=year[value];
            inputValue = year[value];
            console.log(`Y${inputValue}`)

            year.forEach(year => {
                let year_class = ".Y" + year
                console.log(year_class)
                d3.selectAll(year_class).style("visibility", function() {
                    console.log(inputValue)
                    console.log(year)
                    console.log(inputValue === year)
                    return (inputValue === year) ? "visible" : "hidden"
                })
            })
        
        }

        function update_type(value) {
            document.getElementById("type-range").innerHTML=type[value];
            inputType = type[value];

            type.forEach(type => {
                let type_class;
                if (type === "Studio") {
                    type_class = ".MRPST";
                } else if (type === "One Bedroom") {
                    type_class = ".MRP1B";
                } else if (type === "Two Bedroom") {
                    type_class = ".MRP2B";
                } else if (type === "Three Bedroom") {
                    type_class = ".MRP3B";
                }
                console.log(type_class)
                d3.selectAll(type_class).style("visibility", function() {
                    // console.log(inputType)
                    // console.log(type)
                    console.log(inputType === type)
                    return (inputType === type) ? "visible" : "hidden"
                })
            })
        
        }

});


        //    var xhr = new XMLHttpRequest();
        //      xhr.open('GET', 'https://www.quandl.com/api/v3/datasets/ZILLOW/Z11233_MRPST.json?api_key=3S4uJpQyP-sfH-N5gbY6');
        //      xhr.send(null);
          
        //      xhr.onreadystatechange = function () {
        //          var DONE = 4; // readyState 4 means the request is done.
        //          var OK = 200; // status 200 is a successful return.
        //          if (xhr.readyState === DONE) {
        //            if (xhr.status === OK) {
        //                let area1 = JSON.parse(xhr.responseText);
        //                let zip = area1.dataset.dataset_code.split("_")[0].slice(1);
        //                let first_coord = [zipcodeConverter[zip][1], zipcodeConverter[zip][0]]
        //                pinDataToMap(first_coord, area1.dataset.data);
        //            } else {
        //              console.log('Error: ' + xhr.status); // An error occurred during the request.
        //            }
        //          }
        //      };