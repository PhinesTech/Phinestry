// const fetch = require("node-fetch");

// (function() {
//   var Aladdin = new blk.API();
//   Aladdin.portfolioAnalysis(
//     {
//       positions: "MSFT~50|AAPL~50|",
//       filter: "countryCode:US"
//     },
//     function(data) {
//       var portfolio = data.resultMap.PORTFOLIOS[0].portfolios[0];
//       $("#holdings").DataTable({
//         data: portfolio.holdings.map(function(holding) {
//           return [
//             holding.ticker,
//             holding.description,
//             holding.assetType,
//             holding.weight
//           ];
//         }),
//         columns: [
//           {
//             title: "Ticker"
//           },
//           {
//             title: "Description"
//           },
//           {
//             title: "Asset Type"
//           },
//           {
//             title: "Weight"
//           }
//         ],
//         order: [[0, "desc"]]
//       });

//       $("#returns").highcharts("StockChart", {
//         rangeSelector: {
//           selected: 5
//         },
//         series: [
//           {
//             name: "Portfolio",
//             data: portfolio.returns.performanceChart.map(function(point) {
//               return [point[0], point[1] * 10000];
//             }),
//             tooltip: {
//               valueDecimals: 2
//             }
//           }
//         ]
//       });
//     }
//   );
// });

const request = require("request");

var companies = [
  "https://www.blackrock.com/tools/hackathon/performance?identifiers=AAPL",

]

request(
  "https://www.blackrock.com/tools/hackathon/performance?identifiers=AAPL",
  { json: true },
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body.resultMap); //body.whatever we need
  }
);