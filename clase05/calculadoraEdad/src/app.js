import moment from "moment";
let todayIs = moment();
let birthDate = moment("1989-10-05");

function isValidDate(date) {
  return date.isValid();
}

function ageCalculator(today, birthday) {
  return today.diff(birthday, "days");
}
console.log(isValidDate(birthDate));
console.log(ageCalculator(todayIs, birthDate));
//console.log(moment()); // Oct 5th 21
