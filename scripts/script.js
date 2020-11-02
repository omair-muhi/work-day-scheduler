function getTimeFromInputNode(inputNode) {
    return inputNode.getAttribute("id");
}

function refreshTimeBlockColors() {
    // Colour code based on current time
    var currentHour = parseInt(moment().format('H'));
    var calendarBegin = parseInt($("input:first").attr("id"));
    var calendarEnd =
        if (currentHour < calendarBegin) {
            // color all time-blocks as green
            $("input").addClass("bg-success");
            return;
        } else
    if (currentHour >= parseInt($("input:last").attr("id"))) {
        // color all time-blocks as gray and inactive
        $("input").attr("disabled", "1");
        return;
    }
    var inputTagArray = $("input");
    var numTimeBlocks = inputTagArray.length;
    console.log($(inputTagArray[0]).attr("id"));
    console.log($(inputTagArray[1]).attr("id"));
    console.log($(inputTagArray[2]).attr("id"));
    for (var i = 0; i < numTimeBlocks - 1; i++) {
        var currentTimeBlockBegin = parseInt($(inputTagArray[i]).attr("id"));
        var currentTimeBlockEnd = parseInt($(inputTagArray[i + 1]).attr("id"));
        if (currentHour >= currentTimeBlockBegin && currentHour < currentTimeBlockEnd) {
            // Set background colour to red
            $(inputTagArray[i]).addClass("bg-danger");
        } else if (currentHour < currentTimeBlockBegin) {
            // Set background colour to green
            $(inputTagArray[i]).addClass("bg-success");
        } else if (currentHour > currentTimeBlockEnd) {
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