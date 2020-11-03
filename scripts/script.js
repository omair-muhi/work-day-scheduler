function saveBtnHandler(event) {
    // 1. Get the text and id of the event
    var timeBlockEventText = $(event.target).parent().prev().val();
    var timeBlockId = parseInt($(event.target).parent().prev().attr("id") - 9);
    // 2. Read localDB
    var calendarEvtsLclDb = JSON.parse(localStorage.getItem("calendarEvents"));
    if (calendarEvtsLclDb !== null) {
        calendarEvents = calendarEvtsLclDb;
    }
    // 3. Modify contents
    calendarEvents.timeBlocksArray[timeBlockId].push(timeBlockEventText);
    // 4. Write back to localDb
    localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));
}
/**
 * This function updates the time-blocks based on current time
 * (runs upon browser refresh)
 */
function refreshTimeBlockColors() {
    // Colour code based on current time
    var currentHour = parseInt(moment().format('H'));
    var calendarBegin = parseInt($("input:first").attr("id"));
    var calendarEnd = parseInt($("input:last").attr("id"));
    if (currentHour < calendarBegin) {
        // color all time-blocks as green
        $("input").addClass("bg-success");
        return;
    } else if (currentHour > calendarEnd + 1) {
        // disable all time-blocks
        $("input").attr("disabled", "1");
        return;
    }
    var inputTagArray = $("input");
    var numTimeBlocks = inputTagArray.length;
    for (var i = 0; i < numTimeBlocks; i++) {
        var currentTimeBlockBegin = parseInt($(inputTagArray[i]).attr("id"));
        var currentTimeBlockEnd;
        if (i < numTimeBlocks - 1) {
            currentTimeBlockEnd = parseInt($(inputTagArray[i + 1]).attr("id"));
        } else {
            currentTimeBlockEnd = 18; // last business-hour hard-coded
        }
        if ((currentHour >= currentTimeBlockBegin) && (currentHour < currentTimeBlockEnd)) {
            // Set background colour to red
            $(inputTagArray[i]).addClass("bg-danger");
        } else if (currentHour < currentTimeBlockBegin) {
            // Set background colour to green
            $(inputTagArray[i]).addClass("bg-success");
        } else if (currentHour > currentTimeBlockBegin) {
            $(inputTagArray[i]).attr("disabled", "1");
        }
    }

}
var calendarEvents = {
    timeBlocksArray: [
        [], // 0900
        [], // 1000
        [], // 1100
        [], // 1200
        [], // 1300
        [], // 1400
        [], // 1500
        [], // 1600
        [] // 1700
    ]
}

function loadEventsFromLocalDb() {
    var calendarEvtsLclDb = JSON.parse(localStorage.getItem("calendarEvents"));
    if (calendarEvtsLclDb !== null) {
        // 1. Read from localDb
        calendarEvents = calendarEvtsLclDb;
        // 2. Loop through events
        var numTimeBlocks = calendarEvents.timeBlocksArray.length;
        for (var i = 0; i < numTimeBlocks; i++) {
            // 2.1 Pick an event in LIFO order from each time-block
            var eventString = calendarEvents.timeBlocksArray[i].pop();
            // 2.2 Update corresponding time-block on calendar
            var currentTimeBlock = i + 9;
            $("#" + currentTimeBlock + ".form-control").val(eventString);
        }
    }
}

function initApplication() {
    // Display today's date at top
    var currentMoment = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentMoment);
    $("button").click(saveBtnHandler);
    // initialize colors for time-blocks
    refreshTimeBlockColors();
    // clear and re-initialize time-block text
    $("input").attr("placeholder", "Create an event...");
    $("input").val("");
    loadEventsFromLocalDb();
}

$(document).ready(initApplication);