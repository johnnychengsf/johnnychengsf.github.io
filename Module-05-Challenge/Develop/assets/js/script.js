var today = moment();
var bussine_hour_start = 9;
var bussine_hour_end = 17;
var yyyymmdd = today.format('YYYY/MM/DD');
// localStorage.clear();
$(document).ready(function() {
    // console.log(allStorage());
    $("#currentDay").text(today.format("dddd, MMMM Do"));
    
    var now = moment().hour();

    for (var i = bussine_hour_start; bussine_hour_end >= i; i++) {
        add_time_block(i);
        set_time_block_textarea(now, i);

        $("#hour-text-" + i).val(localStorage.getItem(yyyymmdd + "-" + i));
        
        $("#save-" + i).click(function() {
            var current_hour = this.id.replace("save-", "");
            var btnSave = "#hour-text-" + current_hour;
            if (moment().hour() >= current_hour) {
                alert("only allow update future schedule.");
                $("#hour-text-" + current_hour).val(localStorage.getItem(yyyymmdd + "-" + current_hour));
            } else {
                localStorage.setItem(yyyymmdd + "-" + current_hour, $(btnSave).val());
            }
        });
    }
    setInterval(function() {
        var now = moment().hour();
        // console.log(now);
        for (var i = bussine_hour_start; bussine_hour_end >= i; i++) {
            set_time_block_textarea(now, i);
        }
    }, 1000 * 60);
});

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

function set_time_block_textarea(now, hour) {

    let time_status = "past";
    $("#hour-text-" + hour).prop("disabled", true);
    $("#time_status-" + hour).removeClass("past present future");
    if (now == hour) {
        time_status = "present";
    } else if (now < hour) {
        time_status = "future";
        $("#hour-text-" + hour).prop("disabled", false);
    }
    $("#time_status-" + hour).addClass(time_status);
    //console.log("time status: " + hour + ", " + time_status);
    return;
}

function add_time_block(hour) {

    let time_block_hour = moment().set('hour',hour).format("ha");

    let time_block = '<div class="row time-block">';

    time_block += '<div style="width: 7%;" class="hour"><div class="pt-3 t-1 float-right hour-text text-uppercase">' + time_block_hour + '</div></div>';
    time_block += '<div id="time_status-' + hour + '" style="width: 84%;" class="description-border"><textarea id="hour-text-' + hour + '"></textarea></div>';
    time_block += '<div style="width: 9%;" class="saveBtn"><div style="padding-top:30px;"><img id="save-'+hour+'" class="floppydisk" src="assets/images/floppydisk_unclick.png" /></div></div></div>';

    // i can't find right emoji
    //time_block += '<div style="width: 9%;" class="saveBtn"><div style="padding-top:25px;"><i class="align-middle">&#128190;</i></div></div></div>';

    $("#container").append(time_block);
    return;
}