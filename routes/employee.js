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
    cCount = (income-18200)*19;
    incomeTax = (cCount/50);
  }
  else if(income <= 87000){
    // cCount = (37000-18200)*19;
    // incomeTax = (cCount/50);
    // cCount = cCount%50;
    cCount = (income-37000)*32.5;
    incomeTax = (cCount/50);
  }
  else if(income <= 180000){
    // cCount = (37000-18200)*19;
    // incomeTax = (cCount/50);
    // cCount = cCount%50;
    // cCount += (87000-37000)*32.5;
    // incomeTax += (cCount/50);
    // cCount = cCount%50;
    cCount = (income-87000)*37;
    incomeTax = (cCount/50);
  }
  else{
    // cCount = (37000-18200)*19;
    // incomeTax = (cCount/50);
    // cCount = cCount%50;
    // cCount += (87000-37000)*32.5;
    // incomeTax += (cCount/50);
    // cCount = cCount%50;
    // cCount += (180000-87000)*37;
    // incomeTax += (cCount/50);
    // cCount = cCount%50;
    cCount = (income-180000)*45;
    incomeTax = (cCount/50);
  }
  return incomeTax;
}

function getCalenderMonth(){

  const monthNames = ["january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december","january"
];

  let date = new Date(this['payment-start-date']);
  let date1 = new Date('01-'+monthNames[date.getMonth()+1]+'-'+date.getFullYear());
  return this['payment-start-date'].substr(0,2) + ' ' + monthNames[date.getMonth()] + ' , ' +date.getFullYear()+ '  -  ' +
         date1.getUTCDate() + ' ' + monthNames[date.getMonth()] + ' , ' +date.getFullYear();

}

router.post('/', function(req, res, next) {
  let response={};
  
  response['name'] = getName.call(req.body);
  response['pay-period'] = getCalenderMonth.call(req.body);
  response['gross-income'] = getGrossIncome.call(req.body);
  response['income-tax'] = getIncomeTax.call(req.body);
  response['net-income'] = response['gross-income'] - response['income-tax'];
  response['super-amount'] = response['gross-income'] * req.body['super-rate']/100;
  res.send(response);
});

module.exports = router;
