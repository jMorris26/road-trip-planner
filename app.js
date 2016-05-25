'use strict';

//ex destination: MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073
//ex start: 902+teal+dr+fort+collins,+CO
// var url = 'https%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fdirections%2Fjson%3Forigin%3D902%2Bteal%2Bdr%2Bfort%2Bcollins%2C%2BCO%26destination%3DMetLife%2BStadium%2B1%2BMetLife%2BStadium%2BDr%2BEast%2BRutherford%2C%2BNJ%2B07073';

function ajax(verb, url, handler) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(req.readyState === 4) {
      if(req.status === 200) {
        handler(null, JSON.parse(req.responseText));
      } else {
        handler(req.status, null);
      }
    }
  };
  req.open(verb, url);
  req.send();
}

// var start = 'MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073';
// var destination = '902+teal+dr+fort+collins,+CO';

var start = document.getElementById('begin');
var destination = document.getElementById('end');

var images = document.getElementsByTagName('img');
var allImages;
for(var i = 0; i < images.length; i++) {
  allImages = images[i];
  //console.log(allImages);
  allImages.addEventListener('click', opacitySelect);
}

var tank = document.getElementById('tanksize'); //target your new input bar here

function opacitySelect(event) {

  function changeInput(vehicle) {
    tank.value = vehicle;
  }

  var car = document.getElementById('car');
  var truck = document.getElementById('truck');
  var rv = document.getElementById('rv');
  var selected = '1';
  var original = '0.5';

  if(event.target === car) {
    car.style.opacity = selected;
    truck.style.opacity = original;
    rv.style.opacity = original;
    changeInput('15'); //size of the average car's tank
  } else if(event.target === truck) {
    truck.style.opacity = '1';
    car.style.opacity = original;
    rv.style.opacity = original;
    changeInput('20'); //size of the average large car's tank
  } else if(event.target === rv) {
    rv.style.opacity = '1';
    car.style.opacity = original;
    truck.style.opacity = original;
    changeInput('50');
  }
}

var button = document.querySelector('button');
var distance;
var duration;

button.addEventListener('click', function() {


  console.log('Start: ' + start.value);
  console.log('End: ' + destination.value);
  console.log('Size of gas tank: ' + tank.value);

  var quarterTank = parseInt(tank.value) /4;
  console.log('A quarter of the inputted tank is: '+ quarterTank);
  var threeQuartersTank = quarterTank * 3;
  console.log('3 quarters of this tank is: ' + threeQuartersTank);


  var jsonp = 'https://jsonp.afeld.me/?url=';
  var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + start.value + '&destination=' + destination.value;
  var finalurl = jsonp + encodeURIComponent(url);

  //console.log(finalurl);

  ajax('GET', finalurl, miles);

  function miles(err, data) {
    //console.log(data);
    distance = data.routes[0].legs[0].distance.text; //returns the distance in miles!
    console.log('Distance: ' + distance);

    var mpg = document.getElementById('mpg').value;
    console.log('Miles per gallon: ' + mpg);
    mpg = parseInt(mpg); //changes value to an integer

    var distanceStr = distance;
    //console.log('Distance equal to a new variable: ' + distanceStr);
    var noMiles = distanceStr.substring(0, distanceStr.length - 3);
    var noMilesInteger = parseInt(noMiles.replace(/,/,''));
    //console.log('Should return distance without mi: ' + noMilesInteger);

    var equation = noMilesInteger / mpg;
    console.log('How many gallons you need to get here: ' + Math.round(equation));

    var milesPerTank = mpg * threeQuartersTank;
    console.log('This is how many miles per tank you get: ' + milesPerTank);

    var fillUp = noMilesInteger / milesPerTank;
    console.log('HOW MANY TIMES YOU NEED TO FILL UP: ' + Math.round(fillUp));
    console.log('Assuming you fill up when your tank drops to a quarter, you will need to fill up ' + Math.round(fillUp) + ' times on your road trip!');

    var newContent = document.getElementById('fillUp');
    var fillStyle = Math.round(fillUp);
    var asterisk = document.getElementById('asterisk');


    var tryStyle = fillStyle.toString();
    var fillTime = fillStyle * 15;
    console.log('This is how many minutes each fill up will add to your trip: ' + fillTime);
    var hours = Math.floor(fillTime / 60);
    var minutes = fillTime % 60;
    console.log('This is the fillup time in hours/minutes: ' + hours + ' hours, ' + minutes + ' minutes');

    var hword;
    var mword;

    if(hours === 1) {
      hword = 'hour ';
    } else {
      hword = 'hours ';
    }

    if(minutes === 1) {
      mword = 'minute ';
    } else {
      mword = 'minutes ';
    }

    newContent.style.fontFamily = 'Quicksand,sans-serif';
    var fillUp2 = document.getElementById('fillUp2');
    fillUp2.style.fontFamily = 'Quicksand,sans-serif';

    if(fillStyle === 0) {
      newContent.innerHTML = 'You do not have to stop for gas!';
    } else if(fillStyle === 1) {
      newContent.innerHTML = 'You will need to stop for gas ' + '<span style =\"font-family:Lobster,cursive\">' + '1' + '</span>' + ' time!';
      fillUp2.innerHTML = 'This will add approximately ' + '<span style =\"font-family:Lobster,cursive\">' + minutes + '</span>' + ' ' + mword + ' to your trip.';
      asterisk.innerHTML = '*Assuming you fill up at a quarter tank.';
    } else if(fillStyle > 1 && hours === 0) {
      newContent.innerHTML = 'You will need to stop for gas ' + '<span style =\"font-family:Lobster,cursive\">' + tryStyle + '</span>' + ' times!*';
      fillUp2.innerHTML = 'This will add approximately ' + '<span style =\"font-family:Lobster,cursive\">' + minutes + '</span>' + ' ' + mword + ' to your trip.';
      asterisk.innerHTML = '*Assuming you fill up at a quarter tank.';
    } else if(fillStyle > 1 && hours > 0 && minutes > 0) {
      newContent.innerHTML = 'You will need to stop for gas ' + '<span style =\"font-family:Lobster,cursive\">' + tryStyle + '</span>' + ' times!*';
      fillUp2.innerHTML = 'This will add approximately ' + '<span style =\"font-family:Lobster,cursive\">' + hours + '</span>' + ' ' + hword + ' and ' + '<span style =\"font-family:Lobster,cursive\">' + minutes + '</span>' + ' ' + mword + ' to your trip.';
      asterisk.innerHTML = '*Assuming you fill up at a quarter tank.';
    } else if(fillStyle > 1 && hours > 0 && minutes === 0) {
      newContent.innerHTML = 'You will need to stop for gas ' + '<span style =\"font-family:Lobster,cursive\">' + tryStyle + '</span>' + ' times!*';
      fillUp2.innerHTML = 'This will add approximately ' + '<span style =\"font-family:Lobster,cursive\">' + hours + '</span>' + ' ' + hword + ' to your trip.';
      asterisk.innerHTML = '*Assuming you fill up at a quarter tank.';
    }


    duration = data.routes[0].legs[0].duration.text;
    console.log(duration);

  }



  // var str = distance;
  // console.log('This is the distance pulled from the API: ' + distance);
  // str = str.substring(0, -3);
  // console.log('This is the distance minus mi: ' + str);
  // str = parseInt(str.replace(/,/, ''));
  // console.log('This is distance as an integer: '+ str);
  //
  // var equation = str / mpg;
  // console.log('This is the distance in miles divided by the mpg: ' + equation);
  // var round = Math.round(equation);
  // console.log(round);

} );
