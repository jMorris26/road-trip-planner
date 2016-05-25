if you get
  30 MILES PER GALLON
and your tank carries
  17 GALLONS TOTAL -- NEED TO GET THIS INFO FROM USER VIA ICONS OR INPUT

assuming you fill up at 1/4 of a tank

17 / 4 = 4.25
sizeOfTank / 4 = quarterTank

4.25 * 3 = 12.75
quarterTank * 3 = threeQuartersTank

30 * 12.75 = 382.5 MILES PER TANK
mpg * threeQuartersTank = milesPerTank

New York City to Seattle is 2,861 mi

if you travel 2861 mi
and you can get 382.5 mi on one tank before filling up

2861 / 382.5 = 7.5
noMilesInteger / milesPerTank = fillUp

then you need to fill up 7.5 --> 8 TIMES TOTAL

show them fillUp :)



Stretch Goal:
if they have to fill up 8 times, then add 15 minutes per fill up to the trip.
fillUp * 15 = fillTime
fillTime = 120
It will add 120 minutes.

var hours = Math.floor( fillTime / 60); //this will get the hours (2)
var minutes = fillTime % 60; //this will get the minutes (0)

  if hours === 0, then innerHTML = a statement without the word/variables for hours in it
  else innerHTML = a statement with the word/variables for hours in it

  if minutes === 0, then innerHTML = a statement without the word/variables for minutes in it
  else innerHTML = a statement with the word/variables for minutes in it  

//this is for the icon selectors:
var car = document.getElementById('car');
var truck = document.getElementById('truck');
var rv = document.getElementById('rv');

car.addEventListener('click', function() {
  car.style.opacity = '1';
  console.log('Car select');
  truck.style.opacity = '0.5';
  rv.style.opacity = '0.5';
});

truck.addEventListener('click', function() {
  truck.style.opacity = '1';
  console.log('Truck select');
  car.style.opacity = '0.5';
  rv.style.opacity = '0.5';
});

rv.addEventListener('click', function() {
  rv.style.opacity = '1';
  console.log('Rv select');
  car.style.opacity = '0.5';
  truck.style.opacity = '0.5';
});
