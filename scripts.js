$(document).ready(function() {
  //hides them logo when the page loads
  $("#myImage").hide();
});

$(document).scroll(function() {
  var y = $(document).scrollTop(),
    image = $("#myImage"),
    header = $("#cover");


  if (y >= 100) {
    //show the image and make the header fixed
    header.addClass('fixed');
    header.addClass('fixed');
    image.show();
  } else {
    //put the header in original position and hide image
    header.removeClass('fixed');
    image.hide();
  }
});


function selectSection(id) {
  d3.selectAll('body>section').style('display', 'none');
  d3.select(id).style('display', 'block');
  window.scrollTo(0, 0);
}
selectSection('#home')

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/12ansgKMcs6e1gsfu5O00AtRdyQCxdO__r8c9Sc3miow/edit?usp=sharing';
// var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1uKLFKf_ZIci6eTLRvzQnbBHc5h0cz2Q48PA_A2emtEE/edit#gid=998515236';

var globalData;

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: function(data) {
      globalData = data

      let options  = data["cases2"].elements.map(d=>d.ciclo.split(", ")).flat()
      options = d3.nest().key(d=>d).entries(options).map(d=>d.key)
      // console.log(options)

        //dropdown filters
        var allGroup = options
        // var allGroup = d3.map(data["cases2"].elements, function(d) {
        //   return (d.ciclo)
        // }).keys()

        //  Create a select element
        d3.select("#selectButton")
          .selectAll('myOptions')
          .data(allGroup)
          .enter()
          .append('option')
          .text(function(d) {
            return d;
          })

        // A function that update the chart
        function update(selectedOption) {
          // console.log(selectedOption)
          showInfo(globalData, selectedOption)
        }

        // When the button is changed, run the updateChart function
        d3.select("#selectButton").on("change", function(d) {

          // recover the option that has been chosen
          var selectedOption = d3.select(this).property("value")

          // run the updateChart function with this selected option
          update(selectedOption)
        });


      showInfo(data);
    },
    simpleSheet: false
  })
}

let projectList = d3.select('#projects-list').selectAll('.project')

function showInfo(data, filter) {

  console.log(data, filter)

  let localData;

  if (filter) {
    localData = data["cases2"].elements.filter((d) => d.ciclo.includes(filter))
  } else {
    localData = data["cases2"].elements
  }

  console.log(localData)


  projectList = projectList.data(localData, d=>d.id)

  projectList.exit().remove();

  projectList = projectList.enter().append('li')
    .classed('project', true)
    .merge(projectList);

  projectList.selectAll("*").remove()

  let preview = projectList.append('div')
    .classed('preview', true)
    .on("click", showFullContent);

  //preview content

  preview.append('h3')
    .classed('title', true)
    .text(function(d) {
      return d.title
    });

  preview.append("p")
    .classed("year", true)
    .text(function(d) {
      return d.anno
    });


  //full content

  let full = projectList.append("div")
    .classed("full", true)
    .classed("close", true);


  full.append('div')
    .classed('project-image', true)
    .classed('responsive-img', true)
    .style('background-image', function(d) {
      let imagename = d.image
      return `url("https://raw.githubusercontent.com/bea92/Prode/master/img/${imagename}.jpg")`;
    });

  full.append('p')
    .classed('text-left', true)
    .text(function(d) {
      return "Categoria — " + d.categoria
    })

  full.append('p')
    .classed('text-left', true)
    .text(function(d) {
      return "Tiplogogia — " + d.tipologia
    })

  full.append('p')
    .classed('text-left', true)
    .text(function(d) {
      return "Ambito — " + d.ambito
    })


  full.append('p')
    .classed('text-left', true)
    .text(function(d) {
      return "Accreditamento — " + d.accreditamento
    })


  full.append('p')
    .classed('description', true)
    .text(function(d) {
      return d.description
    });



  projectList.append('p')
    .classed('link', true)
    .append('a')
    .attr('href', function(d) {
      return d.link
    })
    .text('→ Visita il sito web')
    .attr('target', '_blank');



  //show full content

  // condizione ? seVera : seFalsa

  function showFullContent() {
    d3.select(this.parentNode).select(".full")
      .classed("close", d3.select(this.parentNode).select(".full").classed("close") ? false : true);
  }




  ///NEWS////

  let news = d3.select('#news-list').selectAll('.news').data(data["news"].elements, function(d) {
    return d.id
  })
  news.exit().remove();
  news = news.enter().append('li')
    .classed('news', true)
    .merge(news)

  news.append('p')
    .classed('year', true)
    .text(function(d) {
      return d.date
    })

  news.append('h3')
    .classed('title', true)
    .text(function(d) {
      return d.title
    })

  news.append('p')
    .classed('subtitle', true)
    .text(function(d) {
      return d.subtitle
    })

  news.append('p')
    .text(function(d) {
      return d.testo
    })

  news.append('p')
    .classed('author', true)
    .text(function(d) {
      return d.author
    })

}

window.addEventListener('DOMContentLoaded', init)
