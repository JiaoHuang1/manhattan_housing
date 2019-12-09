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

        var myColor = d3.scaleLinear().domain([1, 20]).range(["#04c8f9", "#032b86"]);

        function convertPriceToColor(price) {
            if (!price) {return "#c7c7c7"}
            let colorCode = Math.ceil((price - 1000) / 250)
            return myColor(colorCode);  
        }

         //price-to-color box
        var priceRange1 = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000];
        var priceRange2 = [4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000];
        //[1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000, 5250, 5500, 5750, 6000, 6250, 6500, 6750, 7000, 7250, 7500, 7750, 8000];
        var svgColor = d3.select( "#color-box" )
        .append( "svg" )
        .attr( "width", "100%" )
        .attr( "height", "60px" )
        .attr( "class", "color-box")

        svgColor.selectAll("rect.color-box-color1")
        .data(priceRange1)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return 120 * i + 5
        })
        .attr("y", "10px")  
        .attr("height", "15px")  
        .attr("width", "15px")
        .style("fill", function(d) { return convertPriceToColor(d)})

        svgColor.selectAll("rect.color-box-color2")
        .data(priceRange2)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return 120 * i + 5
        })
        .attr("y", "35px")  
        .attr("height", "15px")  
        .attr("width", "15px")
        .style("fill", function(d) { return convertPriceToColor(d)})

        svgColor.selectAll("text.color-box-text1")
                .data(priceRange1)
                .enter()
                .append("text")
                .text(function(d) {return `${d} - ${d + 499}`})
                .attr("y", 23)
                .attr("x", function(d, i) {
                    return 120 * i + 25
                })
                .attr("fill", "white")

        svgColor.selectAll("text.color-box-text2")
                .data(priceRange2)
                .enter()
                .append("text")
                .text(function(d) {return `${d} - ${d + 499}`})
                .attr("y", 48)
                .attr("x", function(d, i) {
                    return 120 * i + 25
                })
                .attr("fill", "white")
            
        var price_with_zipcode_for_year1 = {};
        function pinDataToMap(coord, apt_type, data) {
            
            var gg = svg.selectAll()
                        .data(data)
                        .enter()
                        .append("g")
                        .attr("class", function(d) {return `Y${d[0]} ${apt_type}`})
                        .style("visibility", function(d) {
                            if (d[0] === "2010" && apt_type === "MRPST") {
                                price_with_zipcode_for_year1[d[2]] = d[1];
                                return "visible"
                            } else {
                                return "hidden"
                            }
                        })
                        .attr("value", function(d) {
                            // console.log(d[1])
                            return Math.floor(d[1])
                        })
                        .attr("id", function(d) {
                            return d[2]
                        })
                        .attr("tag", function(d) {
                            // console.log(d[3])
                            return d[3]
                        })
           
            d3.selectAll('path')
            .attr("fill", function(d) {
                return convertPriceToColor(price_with_zipcode_for_year1[d.properties.zcta])
            })

            // gg.append("circle")
            // .attr("cx", albersProjection(coord)[0])
            // .attr("cy", albersProjection(coord)[1])
            // .attr("r", "2px")
            // .attr("fill", "#ffffff")
            // .attr("class", function(d) {return `Y${d[0]} ${apt_type}`})
            // .style("visibility", function(d) {
            //   if (d[0] === "2010" && apt_type === "MRPST") {
            //       return "visible"
            //   } else {
            //       return "hidden"
            //   }
            // })

            // let aptChart = {"MRPST": "studio", "MRP1B": "OneBedroom", "MRP2B": "TwoBedroom", "MRP3B": "ThreeBedroom"}
    
            // gg.append("text")
            // .text(function(d) {return Math.floor(d[1])})
            // .attr("x", albersProjection(coord)[0] - 5)
            // .attr("y", albersProjection(coord)[1] - 5)
            // .attr("font-size", "10px")
            // .style("fill", "white")

            // .on("click", function(d) {
            //     console.log("click")
            //     d3.select(this)
            //     .style("fill", "red")

                // var svgPriceCompare = d3.select("#price-compare")
                //     .append("svg")
                //     .attr("id", `Y${d[0]}-${aptChart[apt_type]}-${d[2]}`)
                //     .attr("width", "100%")
                //     .attr("height", "90px")
                //     .attr("class", "price-compare")
                //     .style("background-color", convertPriceToColor(d[1]))
                    
                
            //     var closingButtonContainer = svgPriceCompare.selectAll("rect")
            //     .data([1])
            //     .enter()
            //     .append("rect")
            //     .attr("x", "90%")
            //     .attr("y", "5px")  
            //     .attr("height", "15px")  
            //     .attr("width", "15px")  
            //     .attr("class", "closing-button")
            //     .style("stroke", "white")

            //     svgPriceCompare.append("text")
            //     .text('x')
            //     .attr("y", 17)
            //     .attr("x", "91%")
            //     .attr("fill", "white")
            //     .attr("class", "closing-button-text")
            //     .attr("font-family", "sans-serif")
            //     .on("click", function() {
            //         d3.select(`#Y${d[0]}-${aptChart[apt_type]}-${d[2]}`).remove();
            //     })


            //     svgPriceCompare.append("text")
            //     .text(`Year: ${d[0]}`)
            //     .attr("y", 20)
            //     .attr("x", 10)
            //     .attr("fill", "white")
            //     .attr("font-size", "14px")
            //     .attr("font-family", "sans-serif")
            //     .attr("class", "compare-inividual-box")

            //     svgPriceCompare.append("text")
            //     .text(`Apartment type: ${aptChart[apt_type]}`)
            //     .attr("y", 40)
            //     .attr("x", 10)
            //     .attr("fill", "white")
            //     .attr("font-size", "14px")
            //     .attr("font-family", "sans-serif")
            //     .attr("class", "compare-inividual-box")

            //     svgPriceCompare.append("text")
            //     .text(`ZipCode: ${d[2]}`)
            //     .attr("y", 60)
            //     .attr("x", 10)
            //     .attr("fill", "white")
            //     .attr("font-size", "14px")
            //     .attr("font-family", "sans-serif")
            //     .attr("class", "compare-inividual-box")


            //     svgPriceCompare.append("text")
            //     .text(`Rental Price: $${Math.floor(d[1])}`)
            //     .attr("y", 80)
            //     .attr("x", 10)
            //     .attr("fill", "white")
            //     .attr("font-size", "14px")
            //     .attr("font-family", "sans-serif")
        
            // })

            // .on("mouseover", function(d) {
            //     d3.select(this)
            //         .transition()
            //         .duration('200')
            //         .attr("font-size", "20px")
            //         .style("fill", "#efb85e")
            //         .attr("font-weight", "bold")

            //     var svg1 = d3.select( "#chart" )
            //         .append( "svg" )
            //         .attr( "width", "350px" )
            //         .attr( "height", "220px" )
            //         .attr( "class", "bar-chart")
          
            //     var dataset = d[3]
            //     var barPadding = 5;  
            //     var barWidth = (350 / 12);
                
            //     var barChart = svg1.selectAll("rect")  
            //         .data(dataset)  
            //         .enter()  
            //         .append("rect")  
            //         .attr("y", function(d) {
            //             return 220 - d[1] / 40 
            //         })  
        //             .attr("height", function(d) {  
        //                 return d[1] / 40;  
        //             })  
        //             .attr("width", barWidth - barPadding)  
        //             .attr("transform", function (d, i) {  
        //                  var translate = [barWidth * i, 0];  
        //                  return "translate("+ translate +")";
        //             })
        //             .attr("fill", function(d) {
        //                 return convertPriceToColor(d[1])
        //             })
                   
        //             svg1.selectAll(".price")  		
        //             .data(dataset)
        //             .enter()
        //             .append("text")
        //             .attr("class","price-label")
        //             .attr("x", function (d, i) {  
        //                 return barWidth * i  
        //            })
        //             .attr("y", function(d) {
        //                 return 220 - d[1] / 40
        //             })
        //             .attr("dy", "1em")
        //             .text(function(d) { return Math.floor(d[1]); })
        //             .attr("font-size", "10px")
        //             .attr("font-weight", "bold")
        //             .attr("fill", "white")

        //             svg1.selectAll(".month")  		
        //             .data(dataset)
        //             .enter()
        //             .append("text")
        //             .attr("class","month-label")
        //             .attr("x", function (d, i) {  
        //                 return barWidth * i  
        //             })
        //             .attr("y", function(d) {
        //                 return "215px"
        //             })
        //             .text(function(d) {
        //                 let monthChart = {"01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"}
        //                 return monthChart[d[0]]
        //             })
        //             .attr("font-size", "12px")
        //             .attr("font-weight", "bold")
        //             .attr("fill", "white")
                     
        //             svg1.append("text")
        //             .attr("class", "bar-chart-title")
        //             .attr("x", "10px")
        //             .attr("y", "25px")
        //             .text(`${d[0]} monthly rental for ${aptChart[apt_type]} at ${d[2]}`)
        //             .attr("font-size", "15px")
        //             .attr("font-weight", "bold")
                
        //     })
        //     .on("mouseout", function(d) {
        //         d3.select(this)
        //             .transition()
        //             .duration("200")
        //             .attr("font-size", "12px")
        //             .style("fill", "#ffffff")

        //         d3.select(".bar-chart").remove();
        //     })
        }
        
        let monthlyRentalData = {};
        let aptTypeForZipHover = "MRPST";
        
        function pinFile(jsonData) {
            let zip = jsonData.dataset.dataset_code.split("_")[0].slice(1);
            let coord = [zipcodeConverter[zip][1], zipcodeConverter[zip][0]];
            let apt_type = jsonData.dataset.dataset_code.split("_")[1]
            let year_avg = {}
            let data = []
            if (!monthlyRentalData[zip]) {
                monthlyRentalData[zip] = {};
            } 


            
            jsonData.dataset.data.forEach(entry => {
                let year = entry[0].split("-")[0]
                let month = entry[0].split("-")[1]
                let rent = entry[1]
                if (!year_avg[year]) {
                    year_avg[year] = [[month, rent]];    
                } else {
                    year_avg[year].unshift([month, rent]);
                }
              
            })

            Object.keys(year_avg).forEach(year => {
                let sum = 0;
                year_avg[year].forEach(monthPricePair => {
                    sum += monthPricePair[1];
                })
          
                let avg = sum / year_avg[year].length;
                data.push([year, avg, zip, year_avg[year]])
                if (!monthlyRentalData[zip][apt_type]) {
                    monthlyRentalData[zip][apt_type] = [[year, Math.floor(avg)]];
                } else {
                    monthlyRentalData[zip][apt_type].push([year, Math.floor(avg)])
                }
        
                
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
                    return d.properties.zcta;
                })
                .on("click", function(d) {
                    console.log(monthlyRentalData)
                    console.log(convertType(inputType).slice(1))
                    let avgRentalPriceAtZip = monthlyRentalData[this.getAttribute("id")][convertType(inputType).slice(1)]
                    let avgRentalPriceHashAtZip = {};
                    avgRentalPriceAtZip.forEach(yearRentPair => {
                        avgRentalPriceHashAtZip[yearRentPair[0]] = yearRentPair[1]
                    })
console.log("click")
console.log(`Y${inputYear}${convertType(inputType).slice(1)}${this.getAttribute("id")}`)

                    if (avgRentalPriceHashAtZip[inputYear] != undefined) {

                    
                        var svgPriceCompare = d3.select("#price-compare")
                        .append("svg")
                        .attr("id", `Y${inputYear}${convertType(inputType).slice(1)}${this.getAttribute("id")}`)
                        .attr("width", "100%")
                        .attr("height", "90px")
                        .attr("class", "price-compare")
                        .style("background-color", convertPriceToColor(avgRentalPriceHashAtZip[inputYear]))

                        var closingButtonContainer = svgPriceCompare.selectAll("rect")
                        .data([1])
                        .enter()
                        .append("rect")
                        .attr("x", "90%")
                        .attr("y", "5px")  
                        .attr("height", "15px")  
                        .attr("width", "15px")  
                        .attr("class", "closing-button")
                        .style("stroke", "white")
                        
                        let zipForPriceCompare = this.getAttribute("id");
                        
                        svgPriceCompare.append("text")
                        .text('x')
                        .attr("y", 17)
                        .attr("x", "91%")
                        .attr("fill", "white")
                        .attr("class", "closing-button-text")
                        .attr("font-family", "sans-serif")
                        .attr("id", `${inputYear}${convertType(inputType).slice(1)}${this.getAttribute("id")}`)
                        .on("click", function() {
                            console.log("close")
                            console.log(`#Y${inputYear}${convertType(inputType).slice(1)}${zipForPriceCompare}`)
                            console.log(this)
                            console.log(this.getAttribute("id"))
                            d3.select(`#Y${this.getAttribute("id")}`).remove();
                        })
                    
                        svgPriceCompare.append("text")
                        .text(`Year: ${inputYear}`)
                        .attr("y", 20)
                        .attr("x", 10)
                        .attr("fill", "white")
                        .attr("font-size", "14px")
                        .attr("font-family", "sans-serif")
                        .attr("class", "compare-inividual-box")
                    
                        svgPriceCompare.append("text")
                        .text(`Apartment type: ${inputType}`)
                        .attr("y", 40)
                        .attr("x", 10)
                        .attr("fill", "white")
                        .attr("font-size", "14px")
                        .attr("font-family", "sans-serif")
                        .attr("class", "compare-inividual-box")
                    
                        svgPriceCompare.append("text")
                        .text(`ZipCode: ${this.getAttribute("id")}`)
                        .attr("y", 60)
                        .attr("x", 10)
                        .attr("fill", "white")
                        .attr("font-size", "14px")
                        .attr("font-family", "sans-serif")
                        .attr("class", "compare-inividual-box")
                    
                        svgPriceCompare.append("text")
                        .text(`Rental Price: $${avgRentalPriceHashAtZip[inputYear]}`)
                        .attr("y", 80)
                        .attr("x", 10)
                        .attr("fill", "white")
                        .attr("font-size", "14px")
                        .attr("font-family", "sans-serif")
                    }
                })
                .on("mouseover", function(d) {
                    d3.select(this)
                        .attr("stroke", function() {
                            if (this.getAttribute("fill") !== "#c7c7c7") {
                                return "red"
                            }
                        })
                       
                        .attr("stroke-width", function() {
                            if (this.getAttribute("fill") !== "#c7c7c7") {
                                return "5%";
                            }
                        })
                        
                        .style("fill", function() {
                            if (this.getAttribute("fill") !== "#c7c7c7") {
                                return "red"
                            }
                        })

                        if (this.getAttribute("fill") !== "#c7c7c7") {

                            var svg2 = d3.select( "#chart" )
                            .append( "svg" )
                            .attr( "width", "350px" )
                            .attr( "height", "220px" )
                            .attr( "class", "bar-chart")

                            let avgRentalPriceByZip = monthlyRentalData[this.getAttribute("id")][aptTypeForZipHover]
                            var barPadding = 5;  
                            var barWidth = (350 / 12);
                            
                            var barChart = svg2.selectAll("rect")  
                            .data(avgRentalPriceByZip)  
                            .enter()  
                            .append("rect")  
                            .attr("y", function(d) {
                                return 220 - d[1] / 40 
                            })  
                            .attr("height", function(d) {
                                return d[1] / 40;  
                            })  
                            .attr("width", barWidth - barPadding)  
                            .attr("transform", function (d, i) {  
                                 var translate = [barWidth * i, 0];  
                                 return "translate("+ translate +")";
                            })
                            .attr("fill", function(d) {
                                return convertPriceToColor(d[1])
                            })
                            
                            svg2.selectAll(".price")  		
                            .data(avgRentalPriceByZip)
                            .enter()
                            .append("text")
                            .attr("class","price-label")
                            .attr("x", function (d, i) {  
                                return barWidth * i  
                            })
                            .attr("y", function(d) {
                                return 220 - d[1] / 40
                            })
                            .attr("dy", "1em")
                            .text(function(d) { return Math.floor(d[1]); })
                            .attr("font-size", "10px")
                            .attr("font-weight", "bold")
                            .attr("fill", "white")

                            svg2.selectAll(".year")  		
                            .data(avgRentalPriceByZip)
                            .enter()
                            .append("text")
                            .attr("class","year-label")
                            .attr("x", function (d, i) {  
                                return barWidth * i  
                            })
                            .attr("y", function(d) {
                                return "215px"
                            })
                            .text(function(d) {
                                return d[0]
                            })
                            .attr("font-size", "12px")
                            .attr("font-weight", "bold")
                            .attr("fill", "white")

                            svg2.append("text")
                            .attr("class", "bar-chart-title")
                            .attr("x", "10px")
                            .attr("y", "25px")
                            .text(`Average rental price over the years at ${this.getAttribute("id")}`)
                            .attr("font-size", "15px")
                            .attr("font-weight", "bold")
                        }

                            
                })  
                .on("mouseout", function(d) {
                    d3.select(this)
                        .attr("stroke", "#ffffff")
                        .attr("stroke-width", "1px")
                        .style("fill", function() {
                            if (this.getAttribute("fill") !== "#c7c7c7") {
                            return this.getAttribute("fill");
                        }
                    })

                    d3.select(".bar-chart").remove();
                    
                })
       
            zipcodeForStudio.forEach(zip => {
                pinFile(require(`../data/studio_by_zip/studio_z${zip}.json`));
            })

            zipcodeForOneBed.forEach(zip => {
                pinFile(require(`../data/onebed_by_zip/onebed_z${zip}.json`));
            })

            zipcodeForTwoBed.forEach(zip => {
                pinFile(require(`../data/twobed_by_zip/twobed_z${zip}.json`));
            })

            zipcodeForThreeBed.forEach(zip => {
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
            var price_with_zipcode_for_year = {};

            year.forEach(year => {
                let year_class = ".Y" + year

                d3.selectAll(year_class)
                  .style("visibility", function() {
                    currentType = `.${this.className.baseVal.split(" ")[1]}`
                    if (inputYear === year && currentType === convertType(inputType)) {
                        price_with_zipcode_for_year[this.getAttribute("id")] = this.getAttribute("value");
                        return "visible"
                    } else {
                        return "hidden"
                    }
                })
            })

            d3.selectAll('path')
            .attr("fill", function(d) {
                return convertPriceToColor(price_with_zipcode_for_year[this.id])
            })
        }
        
        function update_type(value) {
            document.getElementById("type-range").innerHTML=type[value];
            inputType = type[value];
            aptTypeForZipHover = convertType(type[value]).slice(1);
            var price_with_zipcode_for_type = {};

            type.forEach(type => {
                d3.selectAll(convertType(type)).style("visibility", function() {
                    currentYear = this.className.baseVal.split(" ")[0];
                                    
                    if (inputType === type && currentYear === `Y${inputYear}`) {                  
                        price_with_zipcode_for_type[this.getAttribute("id")] = this.getAttribute("value");
                        return "visible"
                    } else {
                        return "hidden"
                    }
                })
            })
          
            d3.selectAll('path')
            .attr("fill", function(d) {
                return convertPriceToColor(price_with_zipcode_for_type[this.id])
            })
        }
       
});


      