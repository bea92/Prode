let homeIndex = ["1", "0", "0"];
let lecturesIndex = ["1", "0", "1"];
let assignmentsIndex = ["2", "0", "1"];
let caseIndex = ["3", "0", "1"];
let code = [];
let page = location.hash;

let home;
let lectures;
let assignments;

function setup() {
  home = select("#home");
  news = select("#news");
  lectures = select("#lectures");
  assignments = select("#assignments");
  caseStudies = select("#case-studies");
  allChannels = select("#guide");

}


function keyTyped() {
  append(code, key);
  $(".channel").html(code);
  print(code);

  if ( JSON.stringify(code) == JSON.stringify(homeIndex) ) {
    history.pushState(null, null, '#');
    print("HOME");
    code = [];
    print(code);

    selectSection("#home")
    return true;
  } else if ( JSON.stringify(code) == JSON.stringify(lecturesIndex) ) {
    history.pushState(null, null, '#lectures');
    print("LECTURES");
    code = [];
    print(code);

    selectSection("#lectures")
    return true;
  } else if ( JSON.stringify(code) == JSON.stringify(assignmentsIndex) ) {
    history.pushState(null, null, '#assignments');
    print("ASSIGNMENTS");
    code = [];
    print(code);

    selectSection("#assignments")
    return true;
  } else if ( JSON.stringify(code) == JSON.stringify(caseIndex) ) {

    history.pushState(null, null, '#case-studies');
    print("CASE STUDIES");
    code = [];
    print(code);

    selectSection("#case-studies")
    return true;

  } else if ( code.length > 2 ){
    history.pushState(null, null, '#tv-guide');
    print("404 Not found");
    code = [];
    print(code);

    selectSection("#tv-guide")
    return true;
  }

  if ( code.length > 2 ) {
    code = [];
  }
}
