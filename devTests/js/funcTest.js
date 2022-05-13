
function addDay1(){
  var div = document.createElement('div');
  div.setAttribute('class', 'daydiv');
  var dayBlock = '<tr>\
                      <td>\
                        <div class="dayContainer">\
                          <table id="dayTable1" class="dayTable">\
                            <thead>\
                              <tr>\
                                <td class="leftField"><div class="dayOfWeek" id="day1"></div></td>\
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
                                  <input class="dayDate" id="date1" type="text" size="4"/>\
                                </td>\
                                <td class="projectSelectT"><select name="project1-0" id="project1-0" class="projectSelect" />\
                                  <option value="TLS" selected>TLS</option>\
                                  <option value="Other">Other</option>\
                                </select>\
                                </td>\
                                <td class="payTypeSelectT"><select name="pay-type1-0" id="pay-type1-0" class="payTypeSelect" />\
                                  <option value="Standard" selected>Standard</option>\
                                  <option value="Vacation">Vacation</option>\
                                  <option value="Sick">Sick</option>\
                                  <option value="Holiday">Holiday</option>\
                                  <option value="Other">Other</option>\
                                  <option value="NH">No Hours</option>\
                                </select>\
                                </td>\
                                <td class="col-sm-4"><input type="time" name="timein1" id="timein1" class="timeField" oninput="checkThenCalc(\'0\', \'timein1\',\'timeout1\', \'hrs1-0\')"/></td>\
                                <td class="col-sm-4"><input type="time" name="timeout1" id="timeout1" class="timeField" oninput="checkThenCalc(\'0\', \'timein1\',\'timeout1\', \'hrs1-0\')"/></td>\
                                <td class="timeDivs hrs"><div class="hrs" name="hrs1-0" id="hrs1-0">0.00</div></td>\
                                <td class="timeDivs"><div class="calcHrs" name="reg1-0" id="reg1-0">0.00</div></td>\
                                <td class="timeDivs"><div class="calcHrs" name="ot1-0" id="ot1-0">0.00</div></td>\
                                <td class="timeDivs"><div class="calcHrs" name="dt1-0" id="dt1-0">0.00</div></td>\
                                <td class="timeDivs"><div class="calcHrs" name="pto1-0" id="pto1-0">0.00</div></td>\
                                <td class="noteTd"><img src="img/Note-icon-sm.png" name="note1"  class="note1"/></td>\
                              </tr>\
                            </tbody>\
                            <tfoot>\
                              <tr>\
                                <td class="col-sm-4"></td>\
                                <td colspan="3">\
                                <button name="addrow" onclick="addrow(1,1)">Add Additional Time-in / Time-out</button>\
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
    pageReady();
  }

//Add Additional timein/timeout
function pageReady(){
$(document).ready(function () {
    var counter1 = 2;
    var counter2 = 2;
    var counter3 = 2;
    var counter4 = 2;
    var counter5 = 2;
    var counter6 = 2;
    var counter7 = 2;

    function addrow(identifier) {
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td class="leftField"><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Remove >"></td>';
        cols += '<td class="projectSelectT"><select class="projectSelect" name="project' + identifier '" id="project' + identifier + '">\
            <option value="TLS" selected>TLS</option>\
            <option value="Other">Other</option>\
            </select>\
            </td>';
        cols += '<td class="payTypeSelectT"><select class="payTypeSelect" name="pay-type' + identifier + '" id=pay-type' + identifier + '">\
            <option value="Standard" selected>Standard</option>\
            <option value="Vacation">Vacation</option>\
            <option value="Sick">Sick</option>\
            <option value="Holiday">Holiday</option>\
            <option value="NH">No Hours</option>\
            </select>\
            </td>';
        cols += '<td><input type="time" class="timeField" "name="timein' + identifier + '" id="timein' + identifier + '"\
                oninput="checkThenCalc(\'0\', \'timein' + identifier +'\', \'timeout' + identifier +'\', \'hrs' + identifier +'\')"/></td>';
        cols += '<td><input type="time" class="timeField" name="timeout' + identifier + '" id="timeout' + identifier + '"\
                oninput="checkThenCalc(\'0\', \'timein' + identifier +'\', \'timeout' + identifier +'\', \'hrs' + identifier +'\')"/></td>';
        cols += '<td class="timeDivs hrs" border="1px" ><div class="hrs" name="hrs' + identifier + '" id="hrs' + identifier + '">0.00</div></td>';
        cols += '<td class="timeDivs" border="1px"><div class="calcHrs" name="reg' + identifier + '" id="reg' + identifier + '">0.00</div></td>';
        cols += '<td class="timeDivs"><div class="calcHrs" name="ot' + identifier + '" id="ot' + identifier + '">0.00</div></td>';
        cols += '<td class="timeDivs"><div class="calcHrs" name="dt' + identifier + '" id="dt' + identifier + '">0.00</div></td>';
        cols += '<td class="timeDivs"><div class="calcHrs" name="pto' + identifier + '" id="pto' + identifier + '">0.00</div></td>';
        cols += '<td class="noteTd"><img src="img/Empty-Note-icon-sm.png" name="note' + identifier + '" id="note' + identifier + '"/></td>';


//Add additional timein/timeout row
        newRow.append(cols);
        $("#dayTable1").append(newRow);
        hrsDay1.push(countergiven);
        countergiven++;
    });

//Remove timein/timeout row
    $("#dayTable1").on("click", ".ibtnDel", function (event) {
      var hrsVal = $(this).closest('tr').find('.hrs').attr("id");
      var indxVal = hrsDay1.indexOf(hrsVal);
      hrsDay1.splice(1, 1);
      $(this).closest("tr").remove();
      getTotals('dayTotalWkHrs', hrsDay1);
    });
  });
};
//Add Days
function addCode(){
  var div = document.createElement('div');
  div.setAttribute('class', 'daydiv');
  div.innerHTML = document.getElementById('stuffToAdd').innerHTML;
  document.getElementById('timesheetTable').appendChild(div);
  pageReady();
}
