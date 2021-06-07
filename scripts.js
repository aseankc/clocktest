/** time variables as hours, minutes and seconds to simulate 12 hours run of clock */
let seconds =0;
let minutes =0;
let hours =0;

/** length varibles for length of clock hands*/
let hourlen=2;
let minutelen=4;
let secondlen=6;


/**  variable for angle between  hour and minute hand */
let hourMinuteAnge=0;
/**  variable for angle between  hour and second hand*/
let hourSecondAngle=0;
/**  variable for angle between  minute and minute hand*/
let minuteSecondAngle=0;
/** array to store the test results exact time */
let atTimes = [];

/**
 * Method calculates angle of hour hand with reference of 12'o clock position
 * @param  hour 
 * @param  minute 
 * @returns angle in degrees
 */
const hourAngle = (hour,minute) =>{
    let rAngle= ((hour * 30) + (minute * 0.5));
    return rAngle;
}

/**
 * Method calculates angle of minute hand with reference of 12'o clock position
 * @param  minute 
 * @returns angle on degrees
 */
const minuteAngle = (minute) => minute*6;


/**
 * Method calculates angle of second hand with reference of 12'o clock position
 * @param {*} second 
 * @returns angle on degrees
 */
const secondAngle = (second) => second*6;


/**
 * Method calculates difference in angle
 * @param {*} angle1 
 * @param {*} angle2 
 * @returns angle on degrees
 */
const betweenAngle = (angle1,angle2) =>{
    let angle = Math.abs(angle1-angle2);
    return Math.min(angle, 360 - angle);
}

/**
 * Method calculates and checks angle between hours, minutes, seconds hands at given time.
 * Checks angles 
 * @param {*} hours 
 * @param {*} minutes 
 * @param {*} seconds 
 * @returns 
 */
const angleCheck = (hours,minutes,seconds)=>{
    
    // console.log("Time log =="+hours+":"+minutes+":"+seconds);
    let hAngle = hourAngle(hours,minutes);
    let mAngle = minuteAngle(minutes);
    let sAngle = secondAngle(seconds);
    
    hourMinuteAngel=betweenAngle(hAngle,mAngle);
    hourSecondAngle=betweenAngle(hAngle,sAngle);
    minuteSecondAngle=betweenAngle(mAngle,sAngle);

    if(hourMinuteAngel == hourSecondAngle && hourMinuteAngel == minuteSecondAngle){
        console.log("true value detected:"+hourMinuteAngel);
        atTimes = [...atTimes,{
            'time':hours+":"+minutes+":"+seconds,
            'hourlen':hourlen,
            'secondlen':secondlen,
            'minutelen':minutelen,
            'distance':hourMinuteAngel+" degrees"
        }];
        
    }

   
}

/**
 * Method simulates the clock hands rotations for 12 hours. 
 * checks if there can be possibile combination that three hand of the clock 
 * are in equal angles.
 * @returns 
 */
 function run12Hours(){
    status("Running Simulation");
    for(hours=0;hours<12;hours++){
        for(minutes=0;minutes<60;minutes++){
            for(seconds = 1;seconds<60;seconds++){
                
                angleCheck(hours,minutes,seconds);
                distanceCheck();
            }
        }
        
    }
    for (const ans of atTimes){
        console.log(ans);
    }
    status("Run completed");
    addResultRow();
    
}

const distanceCheck = () => {
    readlengths();
    let hourMinuteDist = distanceEndPoints(hourlen,minutelen,hourMinuteAngel).toFixed(2);
    let hourSecondDist = distanceEndPoints(hourlen,secondlen,hourSecondAngle).toFixed(2);
    let minuteSecondDist = distanceEndPoints(minutelen,secondlen,minuteSecondAngle).toFixed(2);
    if(hourMinuteDist == hourSecondDist && hourMinuteDist == minuteSecondDist){
        console.log("Equal value detected:"+hourMinuteDist);
        atTimes = [...atTimes,{
            'time':hours+":"+minutes+":"+seconds,
            'hourlen':hourlen,
            'secondlen':secondlen,
            'minutelen':minutelen,
            'distance':hourMinuteDist+" units"
        }];
    }
    
}

const readlengths = () =>{
    hourlen = document.getElementById('inhours').value;
    minutelen = document.getElementById('inminutes').value;
    secondlen = document.getElementById('inseconds').value;
}
/**
 * Method applies cosine rule to calculate the distance between tip of hand
 * @param {*} length1 
 * @param {*} length2 
 * @param {*} angle 
 * @returns 
 */
const distanceEndPoints =(length1, length2, angle) => {
    var cosVal = Math.cos(angle*Math.PI/180.0);
    var disVal = Math.sqrt((length1*length1)+(length2*length2)-(2*length1*length2*cosVal));
    return disVal;
}

const addResultRow = () => {
    var tbodyvar = document.getElementById('resultTbody');
    atTimes.map(data=>{
        var row = tbodyvar.insertRow();
        var time =row.insertCell(0);
        var hourlen =row.insertCell(1);
        var minutelen =row.insertCell(2);
        var secondlen =row.insertCell(3);
        var distance =row.insertCell(4);
         
        time.innerHTML = data.time;
        hourlen.innerHTML = data.hourlen;
        minutelen.innerHTML = data.minutelen;
        secondlen.innerHTML = data.secondlen;
        distance.innerHTML = data.distance;

    });

} 
    
    

const status = (text)=>{
    var btn = document.getElementById('timedisplay');
    btn.innerHTML= text;
}
