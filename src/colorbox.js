//color box
        // d3.select("#colorbox").selectAll("input")
        //     .data(["blue", "red"])
        //     .enter()
        //     .append('label')
        //     .attr('for',function(d,i){ return 'a'+i; })
        //     .text(function(d) { return d; })
        //     .append("input")
        //     .attr("checked", true)
        //     .attr("type", "checkbox")
        //     .attr("id", function(d,i) { return 'a'+i; })
        //     .attr("onClick", function(d) {
        //         if (d === "blue") {
        //             myColor = d3.scaleLinear().domain([1, 20]).range(["#fafeff", "#16316d"])
        //         } else if (d === "red") {
        //             myColor = d3.scaleLinear().domain([1, 20]).range(["white", "red"])
        //         }
                
        //     })

        // var colorData = ["red", "blue", "yellow", "green"], 
        // j = 3;  // Choose the rectangle as default

        // // Create the shape selectors
        // var form = d3.select("body").append("form");

        // labels = form.selectAll("label")
        //     .data(colorData)
        //     .enter()
        //     .append("label")
        //     .text(function(d) {return d;})
        //     .insert("input")
        //     .attr({
        //         type: "radio",
        //         class: "color-selection",
        //         name: "mode",
        //         value: function(d, i) {return i;}
        //     })
        //     .property("checked", function(d, i) {return i===j;});