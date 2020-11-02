function getTimeFromInputNode(inputNode) {
    return inputNode.getAttribute("id");
}

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
            currentTimeBlockEnd = 18; // hard-coded
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

function initApplication() {
    // Display today's date at top
    var currentMoment = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentMoment);
    refreshTimeBlockColors();
}

$(document).ready(initApplication);