import './styles/index.scss';
var zipcode_coord_data = require('../data/zipcode_lat_lng.json');
var zipcodeForStudio = [10001, 10002, 10003, 10005, 10006, 10007, 10009, 10010, 10011, 10012, 10013, 10014, 
    10016, 10017, 10018, 10019, 10021, 10022, 10023, 10024, 10025, 10026, 10027, 10028, 10029, 10030, 10031, 
    10032, 10035, 10036, 10037, 10038, 10128, 10280
]
var zipcodeForOneBed = [10001, 10002, 10003, 10005, 10006, 10007, 10009, 10010, 10011, 10012, 10013, 10014, 
    10016, 10017, 10018, 10019, 10021, 10022, 10023, 10024, 10025, 10026, 10027, 10028, 10029, 10030, 10031, 
    10032, 10033, 10034, 10035, 10036, 10037, 10038, 10039, 10040, 10044, 10128, 10280
]
var zipcodeForTwoBed = [10001, 10002, 10003, 10005, 10006, 10007, 10009, 10010, 10011, 10012, 10013, 10014, 
    10016, 10017, 10018, 10019, 10021, 10022, 10023, 10024, 10025, 10026, 10027, 10028, 10029, 10030, 10031, 
    10032, 10033, 10034, 10035, 10036, 10037, 10038, 10039, 10040, 10128
]
var zipcodeForThreeBed = [10001, 10002, 10003, 10009, 10010, 10011, 10012, 10013, 10014, 10016, 10019, 10021,
    10022, 10023, 10024, 10025, 10027, 10028, 10029, 10030, 10031, 10032, 10033, 10036, 10128
]



window.addEventListener('DOMContentLoaded', () => {
    // document.getElementById('app').innerText = "Hello World!";
        // Width and Height of the whole visualiation
        var width = 1000;
        var height = 450;

        // create SVG
        var svg = d3.select( "#app" )
            .append( "svg" )
            .attr( "width", width )
            .attr( "height", height );

        // Append empty placeholder g element to the SVG
        // g will contain geometry elements
        var g = svg.append( "g" );

        // Width and Height of the whole visualization
        // Set Projection Parameters
        var albersProjection = d3.geoAlbers()
            .scale( 250000 )
            .rotate( [0, 0] )
            .center( [-73.971, 40.775] )
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

        function covertPriceToColor(price) {
            if (price >= 4000) {
                return "#2a0502"
            } else if (price >= 3500 && price < 4000) {
                return "#64160d"
            } else if (price >= 3000 && price < 3500) {
                return "#a12a1b"
            } else if (price >= 2500 && price < 3000) {
                return "#c63523"
            } else if (price >= 2000 && price < 2500) {
                return "#e43f2a"
            } else if (price >= 1500 && price < 2000) {
                return "#e66445"
            } else if (price >= 1000 && price < 1500) {
                return "#e98c6e"
            } else if (price >= 500 && price < 1000) {
                return "#eeb59d"
            } else {
                return "#f3dacc"
            }
        }

        function pinDataToMap(coord, apt_type, data) {
            var gg = svg.selectAll()
                        .data(data)
                        .enter()
                        .append("g")
                        .attr("class", function(d) {return `Y${d[0]} ${apt_type}`})
                        .style("visibility", "hidden")
                        .attr("value", function(d) {
                            return Math.floor(d[1])
                        })
                        .attr("id", function(d) {
                            return d[2]
                        })

            gg.append("circle")
            .attr("cx", albersProjection(coord)[0])
            .attr("cy", albersProjection(coord)[1])
            .attr("r", "3px")
            .attr("fill", function(d) {
                return covertPriceToColor(d[1])
            })
            // .attr("class", function(d) {return `Y${d[0]} ${apt_type}`})
            // .style("visibility", "hidden")

            gg.append("line")
            .attr("x1", albersProjection(coord)[0])
            .attr("y1", albersProjection(coord)[1] - 3)
            .attr("x2", albersProjection(coord)[0])
            .attr("y2", function(d) {return albersProjection(coord)[1] - d[1]/50})
            .attr("stroke-width", 1)
            .attr("stroke", function(d) {
                return covertPriceToColor(d[1])
            })
            // .attr("class", function(d) {return `Y${d[0]} ${apt_type}`})
            // .style("visibility", "hidden")

            gg.append("text")
            .text(function(d) {return `${apt_type} : ${d[0]} : ${Math.floor(d[1])}`})
            .attr("x", albersProjection(coord)[0])
            .attr("y", function(d) {return albersProjection(coord)[1] - d[1]/50})
            .attr("font-size", "10px")
            .style("fill", function(d) {
                return covertPriceToColor(d[1])
            })
            // .attr("class", function(d) {return `Y${d[0]} ${apt_type}`})
            // .style("visibility", "hidden")
            .on("mouseover", function() {
                d3.select(this)
                    .transition()
                    .duration('200')
                    .attr("font-size", "20px")
                    .style("fill", "blue")
            })
            .on("mouseout", function(d) {
                d3.select(this)
                    .transition()
                    .duration("200")
                    .attr("font-size", "10px")
                    .style("fill", covertPriceToColor(d[1]))
            })
        }

        function pinFile(jsonData) {
            let zip = jsonData.dataset.dataset_code.split("_")[0].slice(1);
            let coord = [zipcodeConverter[zip][1], zipcodeConverter[zip][0]];
            let apt_type = jsonData.dataset.dataset_code.split("_")[1]
            // console.log(apt_type)
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
                data.push([year, avg, zip])
            })
           
            pinDataToMap(coord, apt_type, data);
        }

        // Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes
        d3.json("data/manhattan_by_zip.json", newyork_data => {
            g.selectAll( "path" )
                .data( newyork_data.features )
                .enter()
                .append( "path" )
                .attr( "fill", "#a9a9aa" )
                .attr( "stroke", "#ffffff")
                .attr( "d", geoPath )
                .attr( "id", function(d) {
                    console.log('find zip')
                    console.log(d.properties.zcta)
                    return d.properties.zcta;
                })
               
       
            zipcodeForStudio.forEach(zip => {
                console.log(zip)
                pinFile(require(`../data/studio_by_zip/studio_z${zip}.json`));
            })

            zipcodeForOneBed.forEach(zip => {
                console.log(zip)
                pinFile(require(`../data/onebed_by_zip/onebed_z${zip}.json`));
            })

            zipcodeForTwoBed.forEach(zip => {
                console.log(zip)
                pinFile(require(`../data/twobed_by_zip/twobed_z${zip}.json`));
            })

            zipcodeForThreeBed.forEach(zip => {
                console.log(zip)
                pinFile(require(`../data/threebed_by_zip/threebed_z${zip}.json`));
            })
        })

        // for slider
        var inputYear = "2010";
        var inputType = "Studio";
        var currentYear = "2010";
        var currentType = "Studio";
        var year = ["2010", "2011", "2012","2013","2014","2015","2016","2017","2018","2019"];
        var type = ["Studio", "One Bedroom", "Two Bedroom", "Three Bedroom"]

        function convertType(type) {
            if (type === "Studio") {
                return ".MRPST";
            } else if (type === "One Bedroom") {
                return ".MRP1B";
            } else if (type === "Two Bedroom") {
                return ".MRP2B";
            } else if (type === "Three Bedroom") {
                return ".MRP3B";
            } else {
                return "Type";
            }
        }

        d3.select("#yearslide").on("input", function() {
            update_year(+this.value);
        });

        d3.select("#typeslide").on("input", function() {
            update_type(+this.value);
        });
        
        function update_year(value) {
            document.getElementById("year-range").innerHTML=year[value];
            inputYear = year[value];
            console.log(`Y${inputYear}`)

            year.forEach(year => {
                let year_class = ".Y" + year

                d3.selectAll(year_class)
                  .style("visibility", function() {
                    currentType = `.${this.className.baseVal.split(" ")[1]}`
                    return (inputYear === year && currentType === convertType(inputType)) ? "visible" : "hidden"
                })
            })
        }
        var price_with_zipcode = [];
        function update_type(value) {
            document.getElementById("type-range").innerHTML=type[value];
            inputType = type[value];

            type.forEach(type => {
                d3.selectAll(convertType(type)).style("visibility", function() {
                    currentYear = this.className.baseVal.split(" ")[0];
                    
                    // d3.selectAll("text").select(.inputType)
                    // return (inputType === type && currentYear === `Y${inputYear}`) ? "visible" : "hidden"
                    if (inputType === type && currentYear === `Y${inputYear}`) {
                        // console.log(d3.select(this).getAttribute("id"))
                        console.log(this)
                        console.log(this.getAttribute("id"))
                        console.log(this.getAttribute("value"))
                        price_with_zipcode.push([this.getAttribute("id"), this.getAttribute("value")])
                        d3.selectAll('path')
                        .data(price_with_zipcode)
                        .attr("fill", function(d) {
                            console.log(this)
                            console.log(this.id)
                
                        })
                        return "visible"
                    } else {
                        return "hidden"
                    }
                })
            })
            console.log(price_with_zipcode)
        }

        
        
});


      