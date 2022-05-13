var hrsDay1 = [0];
var workWeekStart = 1;
//var dateFormat = 'M,d,YYYY';

$(document).ready(function () {
 var counter1 = 2;
 var counter2 = 2;
 var counter3 = 2;
 var counter4 = 2;
 var counter5 = 2;
 var counter6 = 2;
 var counter7 = 2;

 $("#addrow1").on("click", function () {
     var newRow = $("<tr>");
     var cols = "";

     cols += '<td class="leftField"><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Remove >"></td>';

     cols += '<td class="projectSelectT"><select class="projectSelect" name="project1' + counter1 + '" id="project1' + counter1 + '">\
         <option value="TLS" selected>TLS</option>\
         <option value="Other">Other</option>\
         </select>\
         </td>';
     cols += '<td class="payTypeSelectT"><select class="payTypeSelect" name="pay-type1' + counter1 + '" id=pay-type1' + counter1 + '">\
         <option value="Standard" selected>Standard</option>\
         <option value="Vacation">Vacation</option>\
         <option value="Sick">Sick</option>\
         <option value="Holiday">Holiday</option>\
         <option value="Other">Other</option>\
         <option value="NH">No Hours</option>\
         </select>\
         </td>';
     cols += '<td><input type="time" class="timeField" "name="timein1-' + counter1 + '" id="timein1-' + counter1 + '"\
             oninput="checkThenCalc(\'0\', \'timein1-' + counter1 +'\', \'timeout1-' + counter1 +'\', \'hrs1-' + counter1 +'\')"/></td>';

     cols += '<td><input type="time" class="timeField" name="timeout1-' + counter1 + '" id="timeout1-' + counter1 + '"\
             oninput="checkThenCalc(\'0\', \'timein1-' + counter1 +'\', \'timeout1-' + counter1 +'\', \'hrs1-' + counter1 +'\')"/></td>';

     cols += '<td class="timeDivs hrs" border="1px" ><div class="hrs" name="hrs1-' + counter1 + '" id="hrs1-' + counter1 + '">0.00</div></td>';
     cols += '<td class="timeDivs" border="1px"><div class="calcHrs" name="reg1-' + counter1 + '" id="reg1-' + counter1 + '">0.00</div></td>';
     cols += '<td class="timeDivs"><div class="calcHrs" name="ot1-' + counter1 + '" id="ot1-' + counter1 + '">0.00</div></td>';
     cols += '<td class="timeDivs"><div class="calcHrs" name="dt1-' + counter1 + '" id="dt1-' + counter1 + '">0.00</div></td>';
     cols += '<td class="timeDivs"><div class="calcHrs" name="pto1-' + counter1 + '" id="pto1-' + counter1 + '">0.00</div></td>';
     cols += '<td class="noteTd"><img src="img/Empty-Note-icon-sm.png" name="note1-' + counter1 + '"/></td>';



//Add row to Hours Lines Array
     newRow.append(cols);
     $("#dayTable1").append(newRow);
     hrsDay1.push(counter1);
     counter1++;
 });

//Remove row from Hours Lines Array
 $("#dayTable1").on("click", ".ibtnDel", function (event) {
   var hrsVal = $(this).closest('tr').find('.hrs').attr("id");
   var indxVal = hrsDay1.indexOf(hrsVal);
   hrsDay1.splice(1, 1);
   $(this).closest("tr").remove();
   getTotals('dayTotalWkHrs', hrsDay1);
 });
});


//Add all hours
function getTotals(fieldd,arrayd){
 var array1 = arrayd;
 var sumValues = 0;
 array1.forEach(gtValues);
 document.getElementById(fieldd).innerHTML = sumValues;
 function gtValues(item){
     if (document.getElementById("hrs1-" + item).innerHTML == '') {
       sumValues = 0 + sumValues;
     } else {
       sumValues = sumValues + Number(document.getElementById("hrs1-" + item).innerHTML);
     }
   }
}




//get array values
function getArray(fieldd,arrayd){
 var array2 = arrayd;
 //var sumValues = 0;
 var valueArray = [];
 array2.forEach(gtArValues);
 //document.getElementById(fieldd).innerHTML = sumValues;
 document.getElementById(fieldd).innerHTML = valueArray;
   function gtArValues(item){
     if (document.getElementById("hrs1-" + item).innerHTML == '') {
       //sumValues = 0 + sumValues;
       valueArray.push("0");
     } else {
       //sumValues = sumValues + Number(document.getElementById(item).innerHTML);
       valueArray.push(document.getElementById("hrs1-" + item).innerHTML);
     }
   }
}



//Calc hours California non-exempt
function calcDayHrsCalNE(wkCryOvr,dayArray){
 var carryOverD = 0;
 dayArray.forEach(calcDay);
 function calcDay(item){
   if (document.getElementById("pay-type1-" + item).innerHTML == "Sick"){
     document.getElementById("sick1-" + item).innerHTML = document.getElementById("hrs1-" + item).innerHTML;
   } else {
     if (carryOverD + document.getElementById("hrs-" + item).innerHTML <= 8){
       document.getElementById("reg1-" + item).innerHTML = document.getElementById("hrs1-" + item).innerHTML;
       carryOverD = carryOverD + Number(document.getElementById("hrs1-" + item).innerHTML);
     } else {
       if (carryOverD < 8) {
         document.getElementById("reg1-" + item).innerHTML = 8 - carryOverD;
         if (document.getElementById("hrs1-" + item).innerHTML - (8 - carryOverD) <= 4){
            document.getElementById("ot1-" + item).innerHTML = Number(document.getElementById("hrs1-" + item).innerHTML) - (8 - carryOverD);
         } else {

         }
       }
     }
   }
 }



}





//script for button
function showReg(){
 var regD1 = regDay1;
 document.getElementById("showRegHrs").innerHTML = regD1;
}



function GetDate1() {
 var formdate = document.getElementById("maindate").value;
 document.getElementById("day1").innerHTML = moment(formdate).format('dddd');
 document.getElementById("date1").value = moment(formdate).format('M/D/YYYY');
 //document.getElementById("day2").innerHTML = moment(formdate).add(1,'day').format('dddd');
 //document.getElementById("date2").value = moment(formdate).add(1,'day').format('M/D/YYYY');
 //document.getElementById("day3").innerHTML = moment(formdate).add(2,'day').format('dddd');
 //document.getElementById("date3").value = moment(formdate).add(2,'day').format('M/D/YYYY');
 //document.getElementById("day4").innerHTML = moment(formdate).add(3,'day').format('dddd');
 //document.getElementById("date4").value = moment(formdate).add(3,'day').format('M/D/YYYY');
 //document.getElementById("day5").innerHTML = moment(formdate).add(4,'day').format('dddd');
 //document.getElementById("date5").value = moment(formdate).add(4,'day').format('M/D/YYYY');
}




function checkThenCalc(day, tI, tO, hrs){
 document.getElementById(hrs).innerHTML = "";
 var formdate = document.getElementById("maindate").value;
 var day = moment(formdate).add(day, 'day').format('Y-MM-DD');
 var timeIn = document.getElementById(tI).value;
 var timeOut = document.getElementById(tO).value;
 if (formdate == ""){
   return;
 }
 else if (timeIn == "") {
   return;
 }
 else if (timeOut == "") {
   return;
 }
 else {
   var formatI = day + "T" + timeIn +":00";
   var formatO = day + "T" + timeOut +":00";
   var timeStart = new Date(formatI);
   var timeStop = new Date(formatO);
   var timeDiff = ((timeStop - timeStart) / 3600000).toFixed(2);
   document.getElementById(hrs).innerHTML = timeDiff;
   getTotals('dayTotalWkHrs', hrsDay1);
 }
}



$(function() {
   var startDate;
   var endDate;

   var selectCurrentWeek = function() {
       window.setTimeout(function () {
           $('.week-picker').find('.ui-datepicker-current-day a').addClass('ui-state-active')
       }, 1);

   }

   $('.week-picker').datepicker( {
       showOtherMonths: true,
       selectOtherMonths: true,
       firstDay: workWeekStart,
       onSelect: function(dateText, inst) {
           var date = $(this).datepicker('getDate');
           startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + workWeekStart);
           endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + workWeekStart + 6);
           var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
           $('#startDate').text($.datepicker.formatDate( 'MM dd', startDate, inst.settings ));
           $('#endDate').text($.datepicker.formatDate( 'MM dd', endDate, inst.settings ));
           selectCurrentWeek();
           document.getElementById('maindate').value = moment(startDate).format('YYYY-MM-DD');
           GetDate1();
       },
       beforeShowDay: function(date) {
           var cssClass = '';
           if(date >= startDate && date <= endDate)
               cssClass = 'ui-datepicker-current-day';
           return [true, cssClass];
       },
       onChangeMonthYear: function(year, month, inst) {
           selectCurrentWeek();
       }
   });

   var $calendarTR = $('.ui-weekpicker .ui-datepicker-calendar tr');
   $calendarTR.on('mousemove', function () {
       $(this).find('td a').addClass('ui-state-hover');
   });
   $calendarTR.on('mouseleave', function () {
       $(this).find('td a').removeClass('ui-state-hover');
   });


//          $('.week-picker .ui-datepicker-calendar tr').live('mousemove', function() { $(this).find('td a').addClass('ui-state-hover'); });
//          $('.week-picker .ui-datepicker-calendar tr').live('mouseleave', function() { $(this).find('td a').removeClass('ui-state-hover'); });
});
