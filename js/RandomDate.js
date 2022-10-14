//#region languages & date lists

const languages = ["ca", "es", "en"]

var selectedLanguage = languages[0];


const months = {
    "ca": [ "gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre" ],
    "es": [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ],
    "en": [ "January", "February", "March", "April", "May", "June", "July", "August", "Septembre", "October", "November", "December" ]
}

const weekDays = { //Comencem amb diumenge pel mètode getDay() de Date, que veu 0 == diumege a 6 == dissabte
    "ca": [ "diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte" ], 
    "es": [ "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado" ],
    "en": [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
}

//#endregion

var dates;
var shown = false;

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomDates() {
                                        // dd/mm/yyyy
    var start = new Date(2022, 0, 1);   // 01/01/2022
    var end = new Date(2022, 11, 31);   // 31/12/2022

    dates = [0,0,0,0,0];
    for (let i = 0; i < 5; i++) {
        dates[i] = randomDate(start, end);
    }

    showDates(bubbleSort(dates));

}

function bubbleSort(array) {
    var len = array.length -1
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i; j++) {
            if(array[j] > array[j+1]) { // Els comparados > i < funcionen, sorprenentment. Els comparadors == i === no, s'hauria de fer .toString() o .valueOf().
                var aux = array[j];
                array[j] = array[j+1];
                array[j+1] = aux;
            }
        }
    }
    return array;

}

function showDates() {
    var dateStr;
    switch (selectedLanguage) {
        case 'ca':  dateStr="Data"; break;
        case 'es': dateStr="Fecha"; break;
        case 'en':  dateStr="Date"; break;
        default: dateStr = "Error"; break;
    }

    for (let i = 0; i < dates.length; i++) {
        var date = dates[i], htmlString = "";
        
        
        htmlString = `${dateStr} ${i+1}: ${getDateName(date)}`;
        
        document.getElementById("date"+(i+1)).innerHTML = htmlString;
        
    }
    shown=true;
}

function getDateName(date) {
    var year, month, day, dayWeek;
    year = date.getFullYear();
    day = date.getDate();
    
    month = (months[`${selectedLanguage}`])[date.getMonth()];
    dayWeek = (weekDays[`${selectedLanguage}`])[date.getDay()];

    var result;
    switch (selectedLanguage) {
        case "ca":
            var de = isVowel(month.toLowerCase().charAt(0)) ? "d'" : "de ";
            result = `${dayWeek}, ${day} ${de}${month} de ${year}`;
            break;
        case "es":
            result = `${dayWeek}, ${day} de ${month} de ${year}`;
            break;
        case "en":
            var suffix;
            switch (day) {
                case 1: case 21: case 31:
                    suffix = 'st';
                    break;
                case 2: case 22:
                    suffix = 'nd';
                    break;
                case 3: case 23:
                    suffix = 'rd';
                    break;
                default:
                    suffix = 'th';
                    break;
            }
            result = `${dayWeek}, ${month} ${day}${suffix}, ${year}`;
            break;
        default:
            result="error :(";
            break;
    }
    return result;

}

function isVowel(c) {
    var vowels = "aeiouàèéíòóú";
    return vowels.includes(c);
}

function changeLanguage(newLang) {
    if(!languages.includes(newLang)) {
        console.log("Error!");
        return;
    }

    selectedLanguage = newLang;
    languages.forEach(l => {
        document.getElementById(l).style.border = '0';
    });
    document.getElementById(selectedLanguage).style.border = '2px solid black';
    if(shown) 
        showDates();
}