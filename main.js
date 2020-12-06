var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');

var name;
var last_name;
var language;
var age;
var faculty;

function submit_data() {
    name = document.getElementById("name").value;
    console.log(name);
    last_name = document.getElementById("last_name").value;
    console.log(last_name);
    language =  document.getElementById("language").value;
    console.log(language);
    age = document.getElementById("age").value;
    console.log(age);
    faculty = document.getElementById("faculty").value;
    console.log(faculty);

    if (name === "" || last_name === "" || age === "" || faculty === "" || language === "" ) {
        document.getElementById("message").innerHTML = "Not all data filled";
    } else {
        document.querySelectorAll('.info').forEach(e => e.remove());
        document.getElementById("button_play").onclick = play_section; // prev button to be clikked again 
        document.getElementById('playing').style.display = "block";
    } 
}

// words 
var section = 0;
var C_k = 0; // 0 camel case, 1 kebab

var matrix = [];

// ---- camel-case ----
matrix[0] = ["eatGhost", "eadGhost", "eatGhast", "eatGhosh", "eatGhosts", "ateGhost"]
matrix[1] = ["eat-ghost", "ead-ghost", "eat-ghast", "eat-ghosh", "eat-ghosts", "ate-ghost"]
// 3 with 2 words camelCase 
matrix[2] = ["testCovid", "tastCovid", "testCovis", "tasteCovid", "testerCovid", "bestCovid", "restCovid" , "testsCovid"] 
matrix[3] = ["moveSouth", "moreSouth", "moveSuth", "moverSouth", "muveSouth", "moveSource", "moveSuoth", "moveSouht"] 
matrix[4] = ["screenSize", "screensSize", "screenSizes", "screamSize", "screenResize", "screnSize", "screemSize", "screemSyze"] 
matrix[5] = ["lystMist", "listMist", "lystMyst", "lystsMist", "lytsMist", "lystMists", "lystMits", "lystNist"] 
matrix[6] = ["acceptExcept", "aceptExcept", "accetExcept", "acceptExept", "acceptExcess", "acceptExcet", "accessExcept", "acceptConcept"] 
// 3 with 3 words camelCase 
matrix[7] = ["twoToToo", "twoTooTo", "toTwoToo", "toTooTwo", "twuToToo", "twToToo", "twoTooToo" ,"twoToTo"]
matrix[8] = ["makeStepForward", "makeStepsForward", "makeStepsForward", "makeStepForwards", "madeStepForwards", "makeStopForward", "makeStepFarward", "makeSthepForward"]
matrix[9] = ["moneyBuyHappiness", "moneyBuysHappiness", "moneyBuyHapiness", "moneyBuyHappines", "moneyBuyhandiness", "moneyGuyHappiness", "moneyBuyHappinness", "moureyBuyHappiness"]
matrix[10] = ["sunsetOnSouth", "sunsetOnSouths", "sunsetsOnSouth", "sunsetOnSouht", "sunsetToSouth", "sunetOnSouth", "subsetOnSouth", "sunsetOnSleuth"]
matrix[11] = ["tortuousTorturousTwo", "torturousTortuousTwo", "tortuosTorturousTwo", "tortuousTorturuosTwo", "tortuousTortorousTwo", "tortuousTortutorsTwo", "twoTortuousTorturous", "tortuouTorturouTwo"]

// 3 with 4 words camelCase
matrix[12] = ["howOldYouAre", "howOldAreYou", "howOldYuoAre", "howColdYouAre", "howsOldYouAre", "howOldYouCare", "howYouAreOld", "howlOldYouAre"]
matrix[13] = ["nurseryRhymesSongsKids", "nurseryRhymeSongsKids", "nurseryRhymesSongKids", "nurseryRhymesSongsKid", "nurseriRhymesSongsKids", "nurseryRhymesSongsKeeps", "nurseryRymesSongsKids", "nurseyRhymesSongsKids"]
matrix[14] = ["tigersVersusTigerFight", "tigerVersusTigerFight", "tigerVersusTigersFight", "tygersVersusTigerFight", "tigersVersusTygerFight", "tigersVersusTigerFights", "tigersVerusTigerFight", "tigersVersusTigerFought"]
matrix[15] = ["coarseCourseToCourts", "coarseCurseToCourts", "coarseCourseToCurts", "coarseCoursesToCourts",  "coarseCourseToCourt", "coraseCourseToCourts", "coarseToCourseCourts", "coarseToCourseCourus"]
matrix[16] = ["tortuousTorusTorturousTwo", "tortousTorusTorturousTwo", "torusTortuousTorturousTwo", "tortuousTorusTortorousTwo" , "tortuousTorusTorturusTwo", "tortuousTorusTorturousTo", "tortuousTwoTorusTorturous", "tortuousTorusTwoTorturous"]
// 3 with 5 words camelCase 
matrix[17] = ["buyByMeOrBye",   "buyByMeOrBie", "byBuyMeOrBye", "buyMeByOrBye", "buysByMeOrBye", "buyByMeOrEye", "bustByMeOrBye", "buyByMoreBye"]
matrix[18] = ["fistOfTheNorthStar", "fistsOfTheNorthStar", "fistOfTheNorthStars", "fistOfTheNorhtStar", "fistOfTheNorthChar", "fitsOfTheNorthStar", "fistOfTheSuothStar", "fistOffTheNorthStar"]
matrix[19] = ["lastButNotLeastTest", "lastButNotLaestTest", "lostButNotLeastTest", "lustButNotLeastTest", "lastButNotLeastTests", "lastNotButLeastTest", "leastButNotLastTest", "lastButNotLeastTost"]
matrix[20] = ["sunsetSouthSouthwardLouth", "sunsetSuothSouthwardLouth", "sunsetSouthSouthwardLoth", "sunsetSoutSouthwardLouth", "sunsetSouthSuothwardLouth", "sunsetSouhtSouthwardLouth", "sunsetBouthSouthwardLouth", "sunsetSouthSouthwardBouth"]
matrix[21] = ["tortuousTorusToTorturousTwo", "tortuousTorusToTortorousTwo", "tortuosusTorusToTorturousTwo", "tortuousTorusToTorturousTo", "tortuousTorusTwoTorturousTo", "tortuousTarusToTorturousTwo", "tortuousTorusTutorsTwo", "tortuousTorusToTorturousTwd"]

// ---- kebab case ----
// 3 with 2 words camelCase 
matrix[22] = ["test-covid", "tast-covid", "test-covis", "taste-covid", "tester-covid", "best-covid", "rest-covid" , "tests-covid"]
matrix[23] = ["move-south", "more-south", "move-suth", "mover-south", "muve-south", "move-source", "move-suoth", "move-souht"] 
matrix[24] = ["screen-size", "screens-size", "screen-sizes", "scream-size", "screen-resize", "scren-size", "screem-size", "screen-syze"] 
matrix[25] = ["lyst-mist", "list-mist", "lyst-myst", "lysts-mist", "lyts-mist", "lyst-mists", "lyst-mits", "lyst-nist"] 
matrix[26] = ["accept-except", "acept-except", "accet-except", "accept-exept", "accept-excess", "accept-excet", "access-except", "accept-concept"] 
// 3 with 3 words camelCase 
matrix[27] = ["two-to-too", "two-too-to", "to-two-too", "to-too-two", "twu-to-too", "tow-to-too", "two-too-too" ,"two-to-to"]
matrix[28] = ["make-step-forward", "make-steps-forward", "make-steps-forward", "make-step-forwards", "made-step-forwards", "make-stop-forward", "make-step-farward", "make-sthep-forward"]
matrix[29] = ["money-buy-happiness", "money-buys-happiness", "money-buy-hapiness", "money-buy-happines", "money-buy-handiness", "money-guy-happiness", "money-buy-happinness", "mourey-buy-happiness"]
matrix[30] = ["sunset-on-south", "sunset-on-souths", "sunsets-on-south", "sunset-on-souht", "sunset-to-south", "sunet-on-south", "subset-on-south", "sunset-on-sleuth"]
matrix[31] = ["tortuous-torturous-two", "torturous-tortuous-two", "tortuos-torturous-two", "tortuous-torturuos-two", "tortuous-tortorous-two", "tortuous-tortutors-two", "two-tortuous-torturous", "tortuou-Torturou-two"]
// 3 with 4 words camelCase
matrix[32] = ["how-old-you-are", "how-old-are-you", "how-old-yuo-are", "how-cold-you-are", "hows-old-you-are", "how-old-you-care", "how-you-are-old", "howl-old-you-are"]
matrix[33] = ["nursery-rhymes-songs-kids", "nursery-rhyme-songs-kids", "nursery-rhymes-song-kids", "nursery-rhymes-songs-kid", "nurseri-rhymes-songs-kids", "nursery-rhymes-songs-keeps", "nursery-rymes-songs-kids", "nursey-rhymes-songs-kids"]
matrix[34] = ["tigers-versus-tiger-fight", "tiger-versus-tiger-fight", "tiger-versus-tigers-fight", "tygers-versus-tiger-fight", "tigers-versus-tyger-fight", "tigers-versus-tiger-fights", "tigers-verus-tiger-fight", "tigers-versus-tiger-fought"]
matrix[35] = ["coarse-course-to-courts", "coarse-curse-to-courts", "coarse-course-to-curts", "coarse-courses-to-courts",  "coarse-course-to-court", "corase-course-to-courts", "coarse-to-course-courts", "coarse-to-course-courus"]
matrix[36] = ["tortuous-torus-torturous-two", "tortous-torus-torturous-two", "torus-tortuous-torturous-two", "tortuous-torus-tortorous-two" , "tortuous-torus-torturus-two", "tortuous-torus-torturous-to", "tortuous-two-torus-torturous", "tortuous-torus-two-torturous"]
// 3 with 5 words camelCase 
matrix[37] = ["buy-by-me-or-bye", "buy-by-me-or-bie", "by-buy-me-or-bye", "buy-me-by-or-bye", "buys-by-me-or-bye", "buy-by-me-or-eye", "bust-by-me-or-bye", "buy-by-more-Bye"]
matrix[38] = ["fist-of-the-north-star", "fists-of-the-north-star", "fist-of-the-north-stars", "fist-of-the-norht-star", "fist-of-the-north-char", "fits-of-the-north-star", "fist-of-the-suoth-star", "fist-off-the-north-star"]
matrix[39] = ["last-but-not-least-test", "last-but-not-laest-test", "lost-but-not-least-test", "lust-but-not-least-test", "last-but-not-least-tests", "last-not-but-least-test", "least-but-not-last-test", "last-but-not-least-tost"]
matrix[40] = ["sunset-south-southward-louth", "sunset-suoth-southward-louth", "sunset-south-southward-loth", "sunset-sout-southward-louth", "sunset-south-suothward-louth", "sunset-souht-southward-louth" , "sunset-bouth-southward-louth", "sunset-south-southward-bouth"]
matrix[41] = ["tortuous-torus-to-torturous-two", "tortuous-torus-to-tortorous-two", "tortuosus-torus-to-torturous-two", "tortuous-torus-to-torturous-to", "tortuous-torus-two-torturous-to", "tortuous-tarus-to-torturous-two", "tortuous-torus-tutors-two", "tortuous-torus-to-torturous-twd"]

var correct = []
correct[0] = "eatGhost";
correct[1] = "eat-ghost";

// camelcase 
correct[2] = "testCovid";
correct[3] = "moveSouth";
correct[4] = "screenSize"; 
correct[5] = "lystMist";
correct[6] = "acceptExcept";
// 6 with 3 words camelCase 
correct[7] = "twoToToo";
correct[8] = "makeStepForward";
correct[9] = "moneyBuyHappiness";
correct[10] = "sunsetOnSouth";
correct[11] = "tortuousTorturousTwo";
// 6 with 4 words camelCase
correct[12] = "howOldYouAre";
correct[13] = "nurseryRhymesSongsKids";
correct[14] = "tigersVersusTigerFight";
correct[15] = "coarseCourseToCourts";
correct[16] = "tortuousTorusTorturousTwo"
// 6 with 5 words camelCase
correct[17] = "buyByMeOrBye";
correct[18] = "fistOfTheNorthStar";
correct[19] = "lastButNotLeastTest";
correct[20] = "sunsetSouthSouthwardLouth";
correct[21] = "tortuousTorusToTorturousTwo";


// kebab case 
correct[22] = "test-covid";
correct[23] = "move-south";
correct[24] = "screen-size"; 
correct[25] = "lyst-mist";
correct[26] = "accept-except";
// 6 with 3 words camelCase 
correct[27] = "two-to-too";
correct[28] = "make-step-forward";
correct[29] = "money-buy-happiness";
correct[30] = "sunset-on-south";
correct[31] = "tortuous-torturous-two";
// 6 with 4 words camelCase
correct[32] = "how-old-you-are";
correct[33] = "nursery-rhymes-songs-kids";
correct[34] = "tigers-versus-tiger-fight";
correct[35] = "coarse-course-to-courts"; //error 
correct[36] = "tortuous-torus-torturous-two";
// 6 with 5 words camelCase
correct[37] = "buy-by-me-or-bye";
correct[38] = "fist-of-the-north-star";
correct[39] = "last-but-not-least-test";
correct[40] = "sunset-south-southward-louth";
correct[41] = "tortuous-torus-to-torturous-two";


var correct_styless = []
correct_styless[0] = "eat ghost";
correct_styless[1] = "eat ghost";

// CamelCase 
correct_styless[2] = "test covid";
correct_styless[3] = "move south";
correct_styless[4] = "screen size";
correct_styless[5] = "lyst mist";
correct_styless[6] = "accept except";
// 6 with 3 words camelCase 
correct_styless[7] = "two to too";
correct_styless[8] = "make step forward";
correct_styless[9] = "money buy happiness";
correct_styless[10] = "sunset on south";
correct_styless[11] = "tortuous torturous two";
// 6 with 4 words camelCase
correct_styless[12] = "how old you are";
correct_styless[13] = "nursery rhymes songs kids";
correct_styless[14] = "tigers versus tiger fight";
correct_styless[15] = "coarse course to courts";
correct_styless[16] = "tortuous torus torturous two";
// 6 with 5 words camelCase
correct_styless[17] = "buy by me or bye";
correct_styless[18] = "fist of the north star";
correct_styless[19] = "last but not least test";
correct_styless[20] = "sunset south southward louth";
correct_styless[21] = "tortuous torus to torturous two";

// kebak 
correct_styless[22] = "test covid";
correct_styless[23] = "move south";
correct_styless[24] = "screen size";
correct_styless[25] = "lyst mist";
correct_styless[26] = "accept except";
// 6 with 3 words camelCase 
correct_styless[27] = "two to too";
correct_styless[28] = "make step forward";
correct_styless[29] = "money buy happiness";
correct_styless[30] = "sunset on south";
correct_styless[31] = "tortuous torturous two";
// 6 with 4 words camelCase
correct_styless[32] = "how old you are";
correct_styless[33] = "nursery rhymes songs kids";
correct_styless[34] = "tigers versus tiger fight";
correct_styless[35] = "coarse course to courts";
correct_styless[36] = "tortuous torus torturous two";
// 6 with 5 words camelCase
correct_styless[37] = "buy by me or bye";
correct_styless[38] = "fist of the north star";
correct_styless[39] = "last but not least test";
correct_styless[40] = "sunset south southward louth";
correct_styless[41] = "tortuous torus to torturous two";


var times = []
var errors = []

// times 
var t0;
var t1;
var error_curr_section = 0;

function remove_all_button() {
    document.querySelectorAll('.to_find_error').forEach(e => e.remove());
    document.querySelectorAll('.to_find_correct').forEach(e => e.remove());
    document.querySelectorAll('.empty').forEach(e => e.remove());
}

function section_handler() {
    if (section == 1) {
        C_k = 1;
    } else if (section > 21){
        C_k = 1;
    } else {
        C_k = 0;
    }

}

function section_modifier() {
    if (section == 1) {
        document.getElementById("section_indent").innerHTML = "Test section " + section +")";
    } else {
        document.getElementById("section_indent").innerHTML = "Section " + section +")"; 
    }
    document.getElementById("to_find").innerHTML = correct_styless[section];

    var style = "camelCase"
    if (C_k == 1) {
        style = "kebab-case"
    }
    document.getElementById("style_c_k").innerHTML = style;
   
}

function add_error() {
    error_curr_section++;
    console.log(error_curr_section);
}

function add_correct() {
    t1 = performance.now()

    times[section] = t1 - t0;
    errors[section] = error_curr_section;

    console.log("correct");
    console.log("timer it tooks:" + (t1 - t0) + " milliseconds.")

    // increase the section 
    // reset values 
    t0 = 0;
    t1 = 0;
    error_curr_section = 0;
    section += 1; 

    section_handler();
    // remove  
    remove_all_button();
    section_modifier()
    document.getElementById("button_play").onclick = play_section; // prev button to be clikked again 

    if (section == 42) {
        terminate();
    }

}

function terminate() {
    document.getElementById('playing').style.display = "none";
    document.getElementById('download').style.display = "block";
}

function play_section() {
    console.log(section);
    play(matrix[section], correct[section]);
    document.getElementById("button_play").onclick = null; // prev button to be clikked again 
    t0 = performance.now() // start time 
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // you'll find more details about that syntax in later chapters
        // same can be written as:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function play(arr, correct) {
    shuffle(arr);
    var i = 0;
    for (var k = 0; k < (arr.length * 2); k++) {
        if (k % 2 == 0) {
            if (arr[i] == correct) {
                var elem = document.createElement("a");
                elem.textContent = arr[i];
                elem.style.textAlign = "left";
                elem.classList.add("to_find_correct");
                elem.onclick = add_correct;
                document.getElementById("wrap").appendChild(elem);
            } else {
                var elem = document.createElement("a");
                elem.textContent = arr[i];
                elem.style.textAlign = "left";
                elem.classList.add("to_find_error");
                elem.onclick = add_error;
                document.getElementById("wrap").appendChild(elem);
            }
            i++;
        } else {
            var elem = document.createElement("a");
            var rand = Math.round(Math.random() * 400) + "px"
            elem.style.width = rand;
            elem.style.textAlign = "left";
            elem.classList.add("empty");
            document.getElementById("wrap").appendChild(elem);
        }
    }
};

let saveFile = () => {
    
    // This variable stores all the data.
    let data =  name +" "+ last_name +" "+ age + " " +  language + " " + faculty +'\n';

    data += "2camel_words: "
    for (i = 2; i < 7; i++) {
        data += times[i] + " "
    }
    data += '\n';
    data += "3camel_words: "
    for (i = 7; i < 12; i++) {
        data += times[i] + " "
    }
    data += '\n';
    data += "4camel_words: "
    for (i = 12; i < 17; i++) {
        data += times[i] + " "
    }
    data += '\n';
    data += "5camel_words: " 
    for (i = 17; i < 22; i++) {
        data += times[i] + " "
    }
    data += '\n';
    data += '\n';
    data += "2kebab_words: " 
    for (i = 22; i < 27; i++) {
        data += times[i] + " "
    }
    data += '\n';
    data += "3kebab_words: " 
    for (i = 27; i < 32; i++) {
        data += times[i] + " "
    }
    data += '\n';
    data += "4kebab_words: " 
    for (i = 32; i < 37; i++) {
        data += times[i] + " "
    }
    data += '\n';
    data += "5kebab_words: " 
    for (i = 37; i < 42; i++) {
        data += times[i] + " "
    }

    data += '\n';
    data += '\n';

    data += "Error_2camel: "
    for (i = 2; i < 7; i++) {
        data += errors[i] + " "
    }
    data += '\n';
    data += "Error_3camel: "
    for (i = 7; i < 12; i++) {
        data += errors[i] + " "
    }
    data += '\n';
    data += "Error_4camel: "
    for (i = 12; i < 17; i++) {
        data += errors[i] + " "
    }
    data += '\n';
    data += "Error_5camel: " 
    for (i = 17; i < 22; i++) {
        data += errors[i] + " "
    }
    data += '\n';
    data += '\n';
    data += "Error_2kebab: " 
    for (i = 22; i < 27; i++) {
        data += errors[i] + " "
    }
    data += '\n';
    data += "Error_3kebab: " 
    for (i = 27; i < 32; i++) {
        data += errors[i] + " "
    }
    data += '\n';
    data += "Error_4kebab: " 
    for (i = 32; i < 37; i++) {
        data += errors[i] + " "
    }
    data += '\n';
    data += "Error_5kebab: " 
    for (i = 37; i < 42; i++) {
        data += errors[i] + " "
    }

    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = name + last_name +".txt";	   // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click(); 
}