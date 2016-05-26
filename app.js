'use strict';

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

// var start = 'MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073'; these are examples of the way the location is read in the URL for Google Maps
// var destination = '902+teal+dr+fort+collins,+CO';

var start = document.getElementById('begin');   //this grabs the start input div
var destination = document.getElementById('end');   //this grabs the destination input div

var images = document.getElementsByTagName('img');  //this grabs the vehicle icons on the page
var allImages;    //this variable is waiting to contain all the images after they've been looped through
for(var i = 0; i < images.length; i++) {   //this loops through all 3 images...
  allImages = images[i];
  //console.log(allImages);
  allImages.addEventListener('click', opacitySelect);    //... and adds an eventlistener to each
}

var tank = document.getElementById('tanksize'); //targets the input bar referring to gas tank size

function opacitySelect(event) {     //this function is referring to when the icons are selected, they hold the full opacity, otherwise they sit at half opacity

  function changeInput(vehicle) {   //this function assigns a value (vehicle) to each icon, depending on which one is selected
    tank.value = vehicle;   //the value of the input bar will be equal to the parameter set in (vehicle)
  }

  var car = document.getElementById('car');           //grabs the car icon
  var truck = document.getElementById('truck');       //grabs the truck icon
  var rv = document.getElementById('rv');             //grabs the rv icon
  var selected = '1';   //1 is full opacity
  var original = '0.5'; //0.5 is half opacity

  if(event.target === car) {              //if you click on the car
    car.style.opacity = selected;         //the car will be equal to the variable selected, or full opacity
    truck.style.opacity = original;       //the truck will be equal to the variable original, or half opacity
    rv.style.opacity = original;          //the rv will be equal to the variable original, or half opacity
    changeInput('15');                    //size of the average car's tank will be placed into the input for the tank size
  } else if(event.target === truck) {
    truck.style.opacity = '1';
    car.style.opacity = original;
    rv.style.opacity = original;
    changeInput('20');                    //size of the average large car's tank
  } else if(event.target === rv) {
    rv.style.opacity = '1';
    car.style.opacity = original;
    truck.style.opacity = original;
    changeInput('50');
  }
}

var button = document.querySelector('button');      //this selects the button
var distance;
//var duration;

button.addEventListener('click', function() {      //an event listener is added to the button


  console.log('Start: ' + start.value);           //
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

    var noMilesInteger;

    //console.log(data);
    // distance = data.routes[0].legs[0].distance.text; //returns the distance in miles!

    var planets = {
      'mercury' : 0.39,
      'venus' : 0.72,
      'earth' : 1,
      'mars' : 1.52,
      'jupiter' : 5.2,
      'saturn' : 9.58,
      'uranus' : 19.2,
      'neptune' : 30.05,
      'pluto' : 39.48
    };
    //console.log('Planet start value: ' + start.value.toLowerCase());
    if(planets[start.value.toLowerCase()] && planets[destination.value.toLowerCase()]) {
      console.log('Planet start value: ' + planets[start.value.toLowerCase()]);
      var toMilesStart = planets[start.value.toLowerCase()] * 93000000;
        console.log('Miles from sun starting value: ' + toMilesStart);
      var toMilesEnd = planets[destination.value.toLowerCase()] * 93000000;
        console.log('Miles from sun ending value: ' + toMilesEnd);
      if(toMilesStart > toMilesEnd) {
        distance = toMilesStart - toMilesEnd;
      } else if(toMilesStart < toMilesEnd) {
        distance = toMilesEnd - toMilesStart;
      }
      noMilesInteger = distance;

    } else if(data) {

      distance = data.routes[0].legs[0].distance.text;
      var distanceStr = distance;
      //console.log('Distance equal to a new variable: ' + distanceStr);
      var noMiles = distanceStr.substring(0, distanceStr.length - 3);
      noMilesInteger = parseInt(noMiles.replace(/,/,''));
      //console.log('Should return distance without mi: ' + noMilesInteger);
    }
    console.log(distance);
    console.log('Distance: ' + distance);

    var mpg = document.getElementById('mpg').value;
    console.log('Miles per gallon: ' + mpg);
    mpg = parseInt(mpg); //changes value to an integer

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


    var tryStyle = fillStyle.toLocaleString();
    var fillTime = fillStyle * 15;
    console.log('This is how many minutes each fill up will add to your trip: ' + fillTime);
    var mathHours = Math.floor(fillTime / 60);
    var mathMinutes = fillTime % 60;
    var hours = mathHours.toLocaleString();
    var minutes = mathMinutes.toLocaleString();
    console.log('This is the fillup time in hours/minutes: ' + hours + ' hours, ' + minutes + ' minutes');

    var hword;
    var mword;

    if(hours === '1') {
      hword = 'hour ';
    } else {
      hword = 'hours ';
    }

    if(minutes === '1') {
      mword = 'minute ';
    } else {
      mword = 'minutes ';
    }

    newContent.style.fontFamily = 'Quicksand,sans-serif';
    var fillUp2 = document.getElementById('fillUp2');
    fillUp2.style.fontFamily = 'Quicksand,sans-serif';

    if(tryStyle === '0') {
      newContent.innerHTML = 'You do not have to stop for gas!';
    } else if(tryStyle === '1') {
      newContent.innerHTML = 'You will need to stop for gas ' + '<span style =\"font-family:Lobster,cursive\">' + '1' + '</span>' + ' time!';
      fillUp2.innerHTML = 'This will add approximately ' + '<span style =\"font-family:Lobster,cursive\">' + minutes + '</span>' + ' ' + mword + ' to your trip.';
      asterisk.innerHTML = '*Assuming you fill up at a quarter tank.';
    } else if(tryStyle !== '1' && hours === '0') {
      newContent.innerHTML = 'You will need to stop for gas ' + '<span style =\"font-family:Lobster,cursive\">' + tryStyle + '</span>' + ' times!*';
      fillUp2.innerHTML = 'This will add approximately ' + '<span style =\"font-family:Lobster,cursive\">' + minutes + '</span>' + ' ' + mword + ' to your trip.';
      asterisk.innerHTML = '*Assuming you fill up at a quarter tank.';
    } else if(tryStyle !== '1' && hours !== '0' && minutes !== '0') {
      newContent.innerHTML = 'You will need to stop for gas ' + '<span style =\"font-family:Lobster,cursive\">' + tryStyle + '</span>' + ' times!*';
      fillUp2.innerHTML = 'This will add approximately ' + '<span style =\"font-family:Lobster,cursive\">' + hours + '</span>' + ' ' + hword + ' and ' + '<span style =\"font-family:Lobster,cursive\">' + minutes + '</span>' + ' ' + mword + ' to your trip.';
      asterisk.innerHTML = '*Assuming you fill up at a quarter tank.';
    } else if(tryStyle !== '1' && hours !== '0' && minutes === '0') {
      newContent.innerHTML = 'You will need to stop for gas ' + '<span style =\"font-family:Lobster,cursive\">' + tryStyle + '</span>' + ' times!*';
      fillUp2.innerHTML = 'This will add approximately ' + '<span style =\"font-family:Lobster,cursive\">' + hours + '</span>' + ' ' + hword + ' to your trip.';
      asterisk.innerHTML = '*Assuming you fill up at a quarter tank.';
    }


    // duration = data.routes[0].legs[0].duration.text;
    // console.log(duration);

  }


} );
