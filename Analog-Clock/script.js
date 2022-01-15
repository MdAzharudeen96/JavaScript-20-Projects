//Repeat every given time interval
setInterval(() => {

    //get hours,minutes,seconds from current date
    date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();

    //Conver to Rotation
    hrotation = 30 * hours + minutes / 2;
    mrotation = 6 * minutes;
    srotation = 6 * seconds;

    //Apply style property for H,M & S
    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`;
    second.style.transform = `rotate(${srotation}deg)`;
    
}, 1000)//every 1 sec call the function