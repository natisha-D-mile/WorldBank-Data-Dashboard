//Fetch the population data for the representative countries
const selectedCountry = document.getElementById("selectCountryPopn");
selectedCountry.addEventListener("change", function () {
  fetchPopnData(selectedCountry.value);
});
fetchPopnData("SY"); //Population of the defaultly selected country
function fetchPopnData(Input) {
  //selected value
  fetch(
    `https://api.worldbank.org/v2/country/${Input}/indicator/SP.POP.TOTL?date=2002:2022&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      let country = data[1][0].country.value;
      
      const population = data[1].map((d) => d.value);
      const years = data[1].map((d) => d.date);
      population.reverse();
      years.reverse();
      drawChart(population, years, country);
    });
}

function drawChart(popnArray, yearsArray,country) {
  //Code for the chart
  Highcharts.chart("container", {
    chart: {
      type: "cylinder",
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25,
      },
    },
    title: {
      text: `20-Year Trend: Total Population in ${country} (2002-2022)`,
    },
    subtitle: {
      text:
        "Source: " +
        '<a href="https://www.worldbank.org/en/home"' +
        'target="_blank">World Bank</a>',
    },
    xAxis: {
      categories: yearsArray,
      title: {
        text: "Year",
      },
    },
    yAxis: {
      title: {
        margin: 20,
        text: "Population (millions)",
      },
    },
    tooltip: {
      headerFormat: "<b>Year: {point.x}</b><br>",
    },
    plotOptions: {
      series: {
        depth: 25,
        colorByPoint: true,
      },
    },
    series: [
      {
        // data: [
        //   11195321, 169339, 121105, 136046, 106800, 58041, 26766, 14291, 7065,
        //   3283,
        // ]
        data: popnArray,
        name: "Population",
        showInLegend: false,
      },
    ],
  });
}



// let yearRange = [];
document.getElementById('compareBtn').addEventListener('click', function(){
  let population1 = [];
  let population2 = [];
  let c1;
  let c2;
  var country1 = document.getElementById('country-1').value;
  var country2 = document.getElementById('country-2').value;
  fetch(
    `https://api.worldbank.org/v2/country/${country1};${country2}/indicator/SP.POP.TOTL?date=2017:2022&format=json`
  ).then((response) => response.json())
  .then((data) => {
   
 let k = data[1].map((d) => d.value);
 console.log(k);
 console.log(data);
  c1 = data[1][1].country?.value
  c2 = data[1][11].country?.value
    for (let i=0;i<k.length/2; i++){
      population1[i] =  k[i]
      // yearRange[i] =   data[1].date;
      population2[i] = k[k.length / 2 + i];
      
    }
    console.log(c1, c2);
    console.log(population1);
    console.log(population2);

    drawCompareChart(population1, population2,c1,c2);
    // console.log(yearRange);
  })
  
})

function drawCompareChart(population1, population2, c1, c2) {
  // Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
  Highcharts.chart('container-compare', {
    chart: {
      type: 'bar',
      // backgroundColor: '#282626',
    },
    title: {
      text: 'Monthly Average Temperature',
    },
    subtitle: {
      text:
        'Source: ' +
        '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
        'target="_blank">Wikipedia.com</a>',
    },
    xAxis: {
      categories: [2022, 2021, 2020, 2019, 2018, 2017],
    },
    yAxis: {
      title: {
        text: 'Population',
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: [
      {
        name: `Population of ${c1}`,
        data: population1,
      },
      {
        name: `Population of ${c2}`,
        data: population2,
      },
    ],
  });
}
 drawCompareChart([123379924, 120283026, 117190911, 114120594, 111129438, 108197950],[54027487, 53005614, 51985780, 50951450, 49953304, 48948137],'Ethiopia','Kenya');




fetch(
  'https://api.worldbank.org/v2/country/et/indicator/NY.GDP.MKTP.CD?date=2018:2022&format=json&pages=1000'
).then(res=>res.json())
.then(data=>{
  let value = data[1].map(d=> d.value);
  let years = data[1].map(d => d.date);
  console.log(value);
  console.log(years);
  drawChart3(value,years);
})



 // Data retrieved from https://gs.statcounter.com/browser-market-share#monthly-202201-202201-bar

// Create the chart
function drawChart3(x,y){
  Highcharts.chart('containerGdp', {
    chart: {
      type: 'column',
    },
    title: {
      align: 'left',
      text: 'Browser market shares. January, 2022',
    },
    subtitle: {
      align: 'left',
      text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: 'category',
      categories: y,
    },
    yAxis: {
      
      title: {
        text: 'Total percent market share',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '',
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> <br/>',
    },

    series: [
      {
        name: 'GDP',
        colorByPoint: true,
        data: x,
      },
    ],
  });

}
