
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/14ElF367q6QKVW_j98CCM1rU4IR2FB2BryVvMHOPFWdE/edit?usp=sharing';
// var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1uKLFKf_ZIci6eTLRvzQnbBHc5h0cz2Q48PA_A2emtEE/edit#gid=998515236';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: false
  })
}

function showInfo(data, tabletop) {

  let project = d3.select('#projects-list').selectAll('.project').data(data["news"].elements, function(d) {
    return d.id
  })
  project.exit().remove();
  project = project.enter().append('li')
    .classed('project', true)
    .merge(project)

  project.append('h3')
  .text(function(d) {
    return d.date
  })

  // project.append('h2')
  // .text(function(d) {
  //   return d.title
  // })
  //
  // project.append('h3')
  // .text(function(d) {
  //   return d.subtitle
  // })


  // project.append('div')
  //   .classed('project-image', true)
  //   .classed('responsive-img', true)
  //   .style('background-image', function(d) {
  //     let imagename = d.image
  //     return `url("https://raw.githubusercontent.com/bea92/Prode/prova-interfaccia-diversa/img/${imagename}.jpg")`;
  //   })

  project.append('p')
  .classed('text-left', true)
  .text(function(d) {
    return d.testo
  })

  // project.append('p')
  //   .classed('text-right', true)
  //   .classed('go-to-website', true)
  //   .append('a')
  //   .attr('href', function(d) {
  //     return d.link // qua mettere il link al sito e basta
  //   })
  //   .attr('target', '_blank')
  //   .text('visita il sito web')




}
window.addEventListener('DOMContentLoaded', init)
