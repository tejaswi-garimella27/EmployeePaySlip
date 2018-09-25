var express = require('express');
var router = express.Router();

function getName(){
  return this['first-name'] + ' ' + this['last-name'];
}

function getGrossIncome(){
  return this['annual-salary']/12;
}

function getIncomeTax(){
  let incomeTax = 0;
  let cCount = 0;
  let income = this['annual-salary'];
  if(income <= 18200){
     incomeTax = 0;
  }
  else if(income <= 37000){
    income = income - 18200;
    cCount = (income*0.19);
    incomeTax = Math.round(cCount/12);
  }
  else if(income <= 87000){
    income = income - 37000;
    cCount = (income*0.325) + 3572;
    incomeTax = Math.round(cCount/12);
  }
  else if(income <= 180000){
    income = income - 87000;
    cCount = (income*0.37) + 19822;
    incomeTax = Math.round(cCount/12);
  }
  else{
    income = income - 180000;
    cCount = (income*0.45) + 54232;
    incomeTax = Math.round(cCount/12);
  }
  return incomeTax;
}

function getCalenderMonth(){

//   const monthNames = ["january", "february", "march", "april", "may", "june",
//   "july", "august", "september", "october", "november", "december","january"
// ];

//   let date = new Date(this['payment-start-date']);
//   let date1 = new Date('01-'+monthNames[date.getMonth()+1]+'-'+date.getFullYear());
//   return this['payment-start-date'].substr(0,2) + ' ' + monthNames[date.getMonth()] + ' , ' +date.getFullYear()+ '  -  ' +
//          date1.getUTCDate() + ' ' + monthNames[date.getMonth()] + ' , ' +date.getFullYear();
      return this['payment-start-date'];
}

router.post('/', function(req, res, next) {
  let response={};
  
  response['name'] = getName.call(req.body);
  response['pay-period'] = getCalenderMonth.call(req.body);
  response['gross-income'] = parseInt(getGrossIncome.call(req.body));
  response['income-tax'] = parseInt(getIncomeTax.call(req.body));
  response['net-income'] = parseInt(response['gross-income'] - response['income-tax']);
  response['super-amount'] = parseInt(Math.round(response['gross-income'] * req.body['super-rate']/100));
  res.send(response);
});

module.exports = router;
