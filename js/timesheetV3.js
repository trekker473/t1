//var entriesDay1 = [1,2];
//var entriesDay2 = [1,2];
//var entriesDay3 = [1,2];
//var entriesDay4 = [1,2];
//var entriesDay5 = [1,2];
//var entriesDay6 = [1,2];
//var entriesDay7 = [1,2];

var workWeekStart = 1;
//var dateFormat = 'M,d,YYYY';

// var counter1 = 3;
// var counter2 = 3;
// var counter3 = 3;
// var counter4 = 3;
// var counter5 = 3;
// var counter6 = 3;
// var counter7 = 3;

function addRow(dayId){
  var counter = document.getElementById('counter' + dayId).innerHTML;
  var ident = dayId + '-' + counter;
  var newRow = $('<tr id="entry' + ident + '">');
  var cols = "";

     cols += '<td class="leftField"><button id="removeRow' + ident + '" onclick="removeRow(\'' + dayId + '\',\'' + ident + '\')">Remove ></button></td>';

     cols += '<td class="projectSelectT"><select class="projectSelect" name="project' + ident + '" id="project' + ident + '">\
         <option value="TLS" selected>TLS</option>\
         <option value="Other">Other</option>\
         </select>\
         </td>';
     cols += '<td class="payTypeSelectT"><select class="payTypeSelect" name="pay-type' + ident + '" id=pay-type' + ident + '">\
         <option value="Standard" selected>Standard</option>\
         <option value="Vacation">Vacation</option>\
         <option value="Sick">Sick</option>\
         <option value="Holiday">Holiday</option>\
         </select>\
         </td>';
     cols += '<td><input type="time" class="timeField" "name="timein' + ident + '" id="timein' + ident + '"\
             oninput="checkThenCalc('+ dayId +', \'timein' + ident +'\', \'timeout' + ident +'\', \'hrs' + ident +'\')"/></td>';

     cols += '<td><input type="time" class="timeField" name="timeout' + ident + '" id="timeout' + ident + '"\
             oninput="checkThenCalc(' + dayId +', \'timein' + ident +'\', \'timeout' + ident +'\', \'hrs' + ident +'\')"/></td>';

     cols += '<td class="timeDivs hrs"><div class="hrs" name="hrs' + ident + '" id="hrs' + ident + '">0.00</div></td>';
     cols += '<td class="timeDivs"><div class="calcHrs" name="reg' + ident + '" id="reg' + ident + '">0.00</div></td>';
     cols += '<td class="timeDivs"><div class="calcHrs" name="ot' + ident + '" id="ot' + ident + '">0.00</div></td>';
     cols += '<td class="timeDivs"><div class="calcHrs" name="dt' + ident + '" id="dt' + ident + '">0.00</div></td>';
     cols += '<td class="timeDivs"><div class="calcHrs" name="pto' + ident + '" id="pto' + ident + '">0.00</div></td>';
     cols += '<td class="noteTd"><img src="img/Empty-Note-icon-sm.png" name="note' + ident + '" id="note' + ident + '"/></td>';
     cols += '</tr>'

//Add row to Hours Lines Array
      newRow.append(cols);
      $('#dayTable' + dayId).append(newRow);
        document.getElementById('entriesDay' + dayId).innerHTML = document.getElementById('entriesDay' + dayId).innerHTML + ',' + ident;
        document.getElementById('counter' + dayId).innerHTML = + counter + 1;
        var entriesDayX = document.getElementById('entriesDay' + dayId).innerHTML.split(",");
        document.getElementById('whatIsIt').innerHTML = 'entriesDayX = ' + entriesDayX;
}

//Remove row from Hours Lines Array
function removeRow(dayId, ident){
       var entriesDayX = Array.from(document.getElementById('entriesDay' + dayId).innerHTML.split(","));
       var indxVal = entriesDayX.indexOf(ident);
       entriesDayX.splice(indxVal, 1);
       var entry = document.getElementById('entry' + ident);
       entry.remove();
       document.getElementById('entriesDay' + dayId).innerHTML = entriesDayX;
       getTotals('dayTotalWkHrs' + dayId, entriesDayX);
 }


function getDayDates() {
  var formdate = document.getElementById("maindate").value;
  document.getElementById("day1").innerHTML = moment(formdate).format('dddd');
  document.getElementById("date1").value = moment(formdate).format('M/D/YYYY');
  document.getElementById("day2").innerHTML = moment(formdate).add(1,'day').format('dddd');
  document.getElementById("date2").value = moment(formdate).add(1,'day').format('M/D/YYYY');
  /*document.getElementById("day3").innerHTML = moment(formdate).add(2,'day').format('dddd');
  document.getElementById("date3").value = moment(formdate).add(2,'day').format('M/D/YYYY');
  document.getElementById("day4").innerHTML = moment(formdate).add(3,'day').format('dddd');
  document.getElementById("date4").value = moment(formdate).add(3,'day').format('M/D/YYYY');
  document.getElementById("day5").innerHTML = moment(formdate).add(4,'day').format('dddd');
  document.getElementById("date5").value = moment(formdate).add(4,'day').format('M/D/YYYY');
  document.getElementById("day6").innerHTML = moment(formdate).add(5,'day').format('dddd');
  document.getElementById("date6").value = moment(formdate).add(5,'day').format('M/D/YYYY');
  document.getElementById("day7").innerHTML = moment(formdate).add(6,'day').format('dddd');
  document.getElementById("date7").value = moment(formdate).add(6,'day').format('M/D/YYYY');*/
}

function checkThenCalc(day, tI, tO, hrs){
  document.getElementById(hrs).innerHTML = "";
  var formdate = document.getElementById("maindate").value;
  var dday = moment(formdate).add(day, 'day').format('Y-MM-DD');
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
    var formatI = dday + "T" + timeIn +":00";
    var formatO = dday + "T" + timeOut +":00";
    var timeStart = new Date(formatI);
    var timeStop = new Date(formatO);
    var timeDiff = ((timeStop - timeStart) / 3600000).toFixed(2);
    document.getElementById(hrs).innerHTML = timeDiff;
    getTotals('dayTotalWkHrs' + day, document.getElementById('entriesDay' + day).innerHTML);
  }
}

//Add all hours
  function getTotals(fieldd,arrayd){
    var sumValues = 0;
    arrayd.forEach(gtValues);
    document.getElementById(fieldd).innerHTML = sumValues;
    function gtValues(item){
        if (document.getElementById("entriesDay-" + item).innerHTML == '') {
          sumValues = 0 + sumValues;
        } else {
          sumValues = sumValues + Number(document.getElementById("entriesDay-" + item).innerHTML);
        }
      }
  }

//weekPickerS
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
              $('#workWeek').text($.datepicker.formatDate('MM d', startDate, inst.settings) + ' - ' + $.datepicker.formatDate('MM d', endDate, inst.settings));

              selectCurrentWeek();
              document.getElementById('maindate').value = moment(startDate).format('YYYY-MM-DD');
              getDayDates();
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



//  function addDay(){
//    var div = document.createElement('div');
//    div.setAttribute('class', 'daydiv');
//    var dayBlock = 'This is a Test';
//    div.innerHTML = dayBlock;
//    document.getElementById('timesheetTable').appendChild(div);
//    pageReady();
//  }
//function addDay(){
/*$(document).ready(function (){
  var dayCounter = 1;
  for (dayCounter = 1; dayCounter < 8; dayCounter++){
  var div = document.createElement('div');
  div.setAttribute('class', 'daydiv');
  var dayBlock = '<tr>\
                      <td>\
                        <div class="dayContainer">\
                          <table id="dayTable' + dayCounter + '" class="dayTable">\
                            <thead>\
                              <tr>\
                                <td class="leftField"><div class="dayOfWeek" id="day' + dayCounter + '">Day&nbsp' + dayCounter + '</div></td>\
                                <td class="headding">Project</td>\
                                <td class="headding">Pay Type</td>\
                                <td class="headding">Time in</td>\
                                <td class="headding">Time out</td>\
                                <td class="headding hrs"><div class="timeDivsH">Hours</div></td>\
                                <td class="headding"><div class="timeDivsH">REG</div></td>\
                                <td class="headding"> <div class="timeDivsH">OT</div></td>\
                                <td class="headding"><div class="timeDivsH">DT</div></td>\
                                <td class="headding"><div class="timeDivsH">PTO</div></td>\
                                <td class="headding">Notes</td>\
                              </tr>\
                            </thead>\
                            <tbody>\
                              <tr>\
                                <td class="leftField">\
                                  <input class="dayDate" id="date' + dayCounter + '" type="text" size="4"/>\
                                </td>\
                                <td class="projectSelectT"><select name="project' + dayCounter + '-1" id="project' + dayCounter + '-1" class="projectSelect" />\
                                  <option value="TLS" selected>TLS</option>\
                                  <option value="Other">Other</option>\
                                </select>\
                                </td>\
                                <td class="payTypeSelectT"><select name="pay-type' + dayCounter + '-1" id="pay-type' + dayCounter + '-1" class="payTypeSelect" />\
                                  <option value="Standard" selected>Standard</option>\
                                  <option value="Vacation">Vacation</option>\
                                  <option value="Sick">Sick</option>\
                                  <option value="Holiday">Holiday</option>\
                                  <option value="NH">No Hours</option>\
                                </select>\
                                </td>\
                                <td class="col-sm-4"><input type="time" name="timein' + dayCounter + '-1" id="timein' + dayCounter + '-1" class="timeField" oninput="checkThenCalc(\'0\', \'timein1\',\'timeout1\', \'hrs1-0\')"/></td>\
                                <td class="col-sm-4"><input type="time" name="timeout' + dayCounter + '-1" id="timeout' + dayCounter + '-1" class="timeField" oninput="checkThenCalc(\'0\', \'timein1\',\'timeout1\', \'hrs1-0\')"/></td>\
                                <td class="timeDivs hrs"><div class="hrs" name="hrs' + dayCounter + '-1" id="hrs' + dayCounter + '-1">0.00</div></td>\
                                <td class="timeDivs"><div class="calcHrs" name="reg' + dayCounter + '-1" id="reg' + dayCounter + '-1">0.00</div></td>\
                                <td class="timeDivs"><div class="calcHrs" name="ot' + dayCounter + '-1" id="ot' + dayCounter + '-1">0.00</div></td>\
                                <td class="timeDivs"><div class="calcHrs" name="dt' + dayCounter + '-1" id="dt' + dayCounter + '-1">0.00</div></td>\
                                <td class="timeDivs"><div class="calcHrs" name="pto' + dayCounter + '-1" id="pto' + dayCounter + '-1">0.00</div></td>\
                                <td class="noteTd"><img src="img/Note-icon-sm.png" name="note' + dayCounter + '-1"  class="note"/></td>\
                              </tr>\
                            </tbody>\
                            <tfoot>\
                              <tr>\
                                <td class="col-sm-4"></td>\
                                <td colspan="3">\
                                <button name="addrows" id="addrows" onclick="addRow('+ dayCounter +')">Add Additional Time-in / Time-out</button>\
                                </td>\
                                  <td class="headding dayTotal">Total: </td>\
                                  <td class="timeDivsT hrs"><div class="timeDivsT" id="dayTotalWkHrs">0.00</div></td>\
                                  <td class="timeDivsT"><div class="timeDivsT" id="dayRegTotal1">0.00</div></td>\
                                  <td class="timeDivsT"><div class="timeDivsT" id="dayOTTotal1">0.00</div></td>\
                                  <td class="timeDivsT"><div class="timeDivsT" id="dayDTTotal1">0.00</div></td>\
                                  <td class="timeDivsT"><div class="timeDivsT" id="dayPTO">0.00</div></td></td>\
                              </tr>\
                            </tfoot>\
                          </table>\
                        </div>\
                          </td>\
                        </tr>';
    div.innerHTML = dayBlock;
    document.getElementById('timesheetTable').appendChild(div);
    //addRowFunct1();
  }
});*/
