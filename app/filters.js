//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here


  var filters = {}

  var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
  var deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

  filters.stringifyNumber = function (n) {
    if (n < 20) return special[n];
    if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
    return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
  }

  filters.capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  filters.numberMonth = function (i) {

    if (i == '1' || i == '01') {
      return "January"
    } else if (i == '2' || i == '02') {
      return "February"
    } else if (i == '3' || i == '03') {
      return "March"
    } else if (i == '4' || i == '04') {
      return "April"
    } else if (i == '5' || i == '05') {
      return "May"
    } else if (i == '6' || i == '06') {
      return "June"
    } else if (i == '7' || i == '07') {
      return "July"
    } else if (i == '8' || i == '08') {
      return "August"
    } else if (i == '9' || i == '09') {
      return "September"
    } else if (i == '10') {
      return "October"
    } else if (i == '11') {
      return "November"
    } else if (i == '12') {
      return "December"
    } else {
      return i
    }
  }

  filters.weekDay = function(day,month,year) {

    var days = new Array(7);
    days[0] = "Sunday";
    days[1] = "Monday";
    days[2] = "Tuesday";
    days[3] = "Wednesday";
    days[4] = "Thursday";
    days[5] = "Friday";
    days[6] = "Saturday";

    var a = new Date(year, month - 1, day);
    var r = days[a.getDay()];

    return r + " " + day

  }

  filters.dayLetters = function(day) {
    if (day > 3 && day < 21) return day+"th";
    switch (day % 10) {
      case 1:  return day+"st";
      case 2:  return day+"nd";
      case 3:  return day+"rd";
      default: return day+"th";
    }
  }

  filters.sortBy = function (arr, prop) {
    const isNum = val => val == +val;
    const sorter = (a, b) => isNum(a[prop]) && isNum(b[prop]) ? +a[prop] - b[prop] : a[prop] < b[prop];
    arr.sort(sorter);
    return arr;
  }
  filters.sortByDate = function (arr, prefix) {
    const sorter = (a, b) => new Date(a[prefix + 'year'], a[prefix + 'month'], a[prefix + 'day']) - new Date(b[prefix + 'year'], b[prefix + 'month'], b[prefix + 'day'])
    arr.sort(sorter);
    return arr;
  }
  
  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */

// Add the filters using the addFilter function
Object.entries(filters).forEach(([name, fn]) => addFilter(name, fn))
