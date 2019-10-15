## Manhattan_housing: A data visualization of rental price in Manhattan changing over the years

### Overview
This data reflects the rental price of different types of apartments changing over the years in Manhattan. It can be used to predict the future trends of the housing price in manhattan region.

### Functionality & MVP
Manhattan_housing users are able to:
- [ ] See a 3d map of the rental prices of different types of housing at different zipcode in manhattan
- [ ] drag the time axis to review the specific time of the rental prices
- [ ] check/uncheck the apartment type to view a specific time of the rental prices.

In addition, this project contains:
- [ ] A production README

### Data & APIs
rental price data is freely available through APIs.

### Wireframe
This visualization consists of a single screen (a) containing a map with rental price graph (b), which is interative by years through the time bar (c) or the apartment type selection (e). It also have a block (d) to display the range of prices represented by colors.

![alt text](Homepage.png)

### Design
Bar height changes dynamically based on year and location of the rental apartment. On dragging the time bar, the rental price of the corresponding year on the location will be displayed at correct height and color.

### Architecture & Technologies
* `JavaScript` for data retrieval and computation
* `D3.JS` + `HTML5` + `CSS` for interactive visualization
* `Webpack` + `Babel` to bundle js files



