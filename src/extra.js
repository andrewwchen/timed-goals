// file intended for misc functionality, only used it for this function
// turns UNIX time to readable time
export const timeConverter= (time) =>{
    // 1000 ms for a second
    // 60000 ms for a minute
    // 3600000 ms for an hour
    let hours = Math.floor(time/3600000);
    let minutes = Math.floor((time%3600000)/60000);
    let seconds = Math.floor((time%60000)/1000);
    if (hours > 0 ) return hours + " hour"+((hours!=1)? "s " : " ") + ((!minutes==0) ? (" and " + minutes + " minute"+((minutes!=1)? "s " : " ")) : "");
    else if (minutes > 0 ) return minutes + " minute"+((minutes!=1)? "s " : " ") + ((!seconds==0) ? (" and " + seconds + " second"+((seconds!=1)? "s " : " ")) : "");
    else if (seconds >= 0 ) return seconds + " second"+((seconds!=1)? "s " : " ");
    else "No Time";
}