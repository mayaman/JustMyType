google.load("feeds", "1");

var theLinks = [];
var theHeadlines = [];

function topicHeadlines(topic) {

    var searchTopic = topic;
    //================
    function removeBold(aString) {
        aString = aString.replace('<b>', '');
        aString = aString.replace('</b>', '');
        aString = aString.replace('<b>', '');
        aString = aString.replace('</b>', '');
        aString = aString.replace('<b>', '');
        aString = aString.replace('</b>', '');
        aString = aString.replace('<b>', '');
        aString = aString.replace('</b>', '');

        aString = aString.replace('&#39;', "'");
        aString = aString.replace('&#39;', "'");
        aString = aString.replace('&#39;', "'");
        aString = aString.replace('&#39;', "'");

        aString = aString.replace('&amp;', '&');

        aString = aString.replace(' ...', '');
        aString = aString.replace('...', '');
        aString = aString.replace(' . . .', '');

        aString = aString.replace(' - The New York Times', '');
        aString = aString.replace(' - New York Times', '');
        aString = aString.replace(' - The New York', '');
        aString = aString.replace(' - New York', '');
        aString = aString.replace(' - New', '');
        aString = aString.replace(' - NYTimes', '');
        aString = aString.replace('.com', '');

        return aString;
    }

    function OnLoad() {
        // Query for president feeds on cnn.com
        var query = 'site:http://www.nytimes.com/' + ' ' + searchTopic;
        google.feeds.findFeeds(query, findDone);
    }

    function findDone(result) {
        // Make sure we didn't get an error.
        if (!result.error) {
            // Get content div
            var content = document.getElementById('title');
            var html = '';

            // Loop through the results and print out the title of the feed and link to
            // the url.
            for (var i = 0; i < result.entries.length; i++) {
                var entry = result.entries[i];
                theLinks[i] = entry.link;
                theHeadlines[i] = removeBold(entry.title);
            }
        }
    }



    google.setOnLoadCallback(OnLoad);

    return [theHeadlines, theLinks];
    //console.log(theHeadlines);
    //return theHeadlines;
}

var x = document.getElementById("theWord").innerHTML;

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas, context, toggle;
var curIndex = 0;
var x1 = 10;
var y1 = 10;
var newsArray = newsArray;
//records total keystrokes for wpm calculation
var keyStrokes = 0;
var startTime;
var wpm = 0;
var secondsElapsed;
var outOfBounds = 0;
var xCoords = [];
var yCoords = [10];
var strings = ["Milo"];
var curKey;
var justHitKey = false;
var results;
var words = [];
var curWords = [];
var keyCorrect = false;
var finishedWord = false;
var min = 90;
var range = 50;
var speed = 1;
var canvasWidth;
var canvasHeight;
var curDifficulty = "EASY";
var curState = "GAME";
var currentHeadline = 0;
var progress = 0;
var headlineArray = [];
var linkArray = [];
var keyboardMap = [
    "", // [0]
"", // [1]
"", // [2]
"CANCEL", // [3]
"", // [4]
"", // [5]
"HELP", // [6]
"", // [7]
"BACK_SPACE", // [8]
"TAB", // [9]
"", // [10]
"", // [11]
"CLEAR", // [12]
"ENTER", // [13]
"ENTER_SPECIAL", // [14]
"", // [15]
"SHIFT", // [16]
"CONTROL", // [17]
"ALT", // [18]
"PAUSE", // [19]
"CAPS_LOCK", // [20]
"KANA", // [21]
"EISU", // [22]
"JUNJA", // [23]
"FINAL", // [24]
"HANJA", // [25]
"", // [26]
"ESCAPE", // [27]
"CONVERT", // [28]
"NONCONVERT", // [29]
"ACCEPT", // [30]
"MODECHANGE", // [31]
"SPACE", // [32]
"PAGE_UP", // [33]
"PAGE_DOWN", // [34]
"END", // [35]
"HOME", // [36]
"LEFT", // [37]
"UP", // [38]
"RIGHT", // [39]
"DOWN", // [40]
"SELECT", // [41]
"PRINT", // [42]
"EXECUTE", // [43]
"PRINTSCREEN", // [44]
"INSERT", // [45]
"DELETE", // [46]
"", // [47]
"0", // [48]
"1", // [49]
"2", // [50]
"3", // [51]
"4", // [52]
"5", // [53]
"6", // [54]
"7", // [55]
"8", // [56]
"9", // [57]
"COLON", // [58]
"SEMICOLON", // [59]
"LESS_THAN", // [60]
"EQUALS", // [61]
"GREATER_THAN", // [62]
"QUESTION_MARK", // [63]
"AT", // [64]
"A", // [65]
"B", // [66]
"C", // [67]
"D", // [68]
"E", // [69]
"F", // [70]
"G", // [71]
"H", // [72]
"I", // [73]
"J", // [74]
"K", // [75]
"L", // [76]
"M", // [77]
"N", // [78]
"O", // [79]
"P", // [80]
"Q", // [81]
"R", // [82]
"S", // [83]
"T", // [84]
"U", // [85]
"V", // [86]
"W", // [87]
"X", // [88]
"Y", // [89]
"Z", // [90]
"WIN", // [91]
"", // [92]
"CONTEXT_MENU", // [93]
"", // [94]
"SLEEP", // [95]
"NUMPAD0", // [96]
"NUMPAD1", // [97]
"NUMPAD2", // [98]
"NUMPAD3", // [99]
"NUMPAD4", // [100]
"NUMPAD5", // [101]
"NUMPAD6", // [102]
"NUMPAD7", // [103]
"NUMPAD8", // [104]
"NUMPAD9", // [105]
"MULTIPLY", // [106]
"ADD", // [107]
"SEPARATOR", // [108]
"SUBTRACT", // [109]
"DECIMAL", // [110]
"DIVIDE", // [111]
"F1", // [112]
"F2", // [113]
"F3", // [114]
"F4", // [115]
"F5", // [116]
"F6", // [117]
"F7", // [118]
"F8", // [119]
"F9", // [120]
"F10", // [121]
"F11", // [122]
"F12", // [123]
"F13", // [124]
"F14", // [125]
"F15", // [126]
"F16", // [127]
"F17", // [128]
"F18", // [129]
"F19", // [130]
"F20", // [131]
"F21", // [132]
"F22", // [133]
"F23", // [134]
"F24", // [135]
"", // [136]
"", // [137]
"", // [138]
"", // [139]
"", // [140]
"", // [141]
"", // [142]
"", // [143]
"NUM_LOCK", // [144]
"SCROLL_LOCK", // [145]
"WIN_OEM_FJ_JISHO", // [146]
"WIN_OEM_FJ_MASSHOU", // [147]
"WIN_OEM_FJ_TOUROKU", // [148]
"WIN_OEM_FJ_LOYA", // [149]
"WIN_OEM_FJ_ROYA", // [150]
"", // [151]
"", // [152]
"", // [153]
"", // [154]
"", // [155]
"", // [156]
"", // [157]
"", // [158]
"", // [159]
"CIRCUMFLEX", // [160]
"EXCLAMATION", // [161]
"DOUBLE_QUOTE", // [162]
"HASH", // [163]
"DOLLAR", // [164]
"PERCENT", // [165]
"AMPERSAND", // [166]
"UNDERSCORE", // [167]
"OPEN_PAREN", // [168]
"CLOSE_PAREN", // [169]
"ASTERISK", // [170]
"PLUS", // [171]
"PIPE", // [172]
"HYPHEN_MINUS", // [173]
"OPEN_CURLY_BRACKET", // [174]
"CLOSE_CURLY_BRACKET", // [175]
"TILDE", // [176]
"", // [177]
"", // [178]
"", // [179]
"", // [180]
"VOLUME_MUTE", // [181]
"VOLUME_DOWN", // [182]
"VOLUME_UP", // [183]
"", // [184]
"", // [185]
"SEMICOLON", // [186]
"EQUALS", // [187]
"COMMA", // [188]
"MINUS", // [189]
"PERIOD", // [190]
"SLASH", // [191]
"BACK_QUOTE", // [192]
"", // [193]
"", // [194]
"", // [195]
"", // [196]
"", // [197]
"", // [198]
"", // [199]
"", // [200]
"", // [201]
"", // [202]
"", // [203]
"", // [204]
"", // [205]
"", // [206]
"", // [207]
"", // [208]
"", // [209]
"", // [210]
"", // [211]
"", // [212]
"", // [213]
"", // [214]
"", // [215]
"", // [216]
"", // [217]
"", // [218]
"OPEN_BRACKET", // [219]
"BACK_SLASH", // [220]
"CLOSE_BRACKET", // [221]
"QUOTE", // [222]
"", // [223]
"META", // [224]
"ALTGR", // [225]
"", // [226]
"WIN_ICO_HELP", // [227]
"WIN_ICO_00", // [228]
"", // [229]
"WIN_ICO_CLEAR", // [230]
"", // [231]
"", // [232]
"WIN_OEM_RESET", // [233]
"WIN_OEM_JUMP", // [234]
"WIN_OEM_PA1", // [235]
"WIN_OEM_PA2", // [236]
"WIN_OEM_PA3", // [237]
"WIN_OEM_WSCTRL", // [238]
"WIN_OEM_CUSEL", // [239]
"WIN_OEM_ATTN", // [240]
"WIN_OEM_FINISH", // [241]
"WIN_OEM_COPY", // [242]
"WIN_OEM_AUTO", // [243]
"WIN_OEM_ENLW", // [244]
"WIN_OEM_BACKTAB", // [245]
"ATTN", // [246]
"CRSEL", // [247]
"EXSEL", // [248]
"EREOF", // [249]
"PLAY", // [250]
"ZOOM", // [251]
"", // [252]
"PA1", // [253]
"WIN_OEM_CLEAR", // [254]
"" // [255]
];

var newsArray = topicHeadlines(x);
var headlineArray = newsArray[0];
var linkArray = newsArray[1];

var check = setInterval(function () {

    console.log("running");
    if (headlineArray.length == 10 && linkArray.length == 10) {
        clearInterval(check);
        document.getElementById("loadingContent").innerHTML = "";
        initialize();
        setupStrings();
        animate();
    }

}, 3000);




function initialize() {

    canvas = document.getElementById("canvas"),

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;



    //var headlineArray = topicHeadlines(x);
    //linkArray = topicHeadlines(x).link;

    while (headlineArray.length != 10) {
        console.log(headlineArray);

    }

    console.log(headlineArray);


    outOfBounds = canvas.height;
    startTime = new Date().getTime();


    context = canvas.getContext('2d');

    document.body.appendChild(canvas);
}

function animate() {
    requestAnimFrame(animate);
    draw();
}


function setupStrings() {

    currentHeadline++;
    progress++;
    var str = headlineArray[currentHeadline];
    words = str.split(" ");

    for (e = 0; e < words.length; e++) {
        words[e] = words[e].replace(/\W/g, '');
    }

    for (a = 0; a < words.length; a++) {
        xCoords[a] = Math.floor(Math.random() * (canvas.width - 600) + 200);
    }
    var curY = 0;

    for (b = 0; b < words.length; b++) {
        curY = curY - (Math.floor(Math.random() * min) + range);
        yCoords[b] = curY;
    }

    curWords = words;
    curIndex = 0;
}

function draw() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (curState == "GAME") {
        drawStrings();
    } else if (curState == "LEADERBOARDS") {
        drawLeaderboards();
    } else if (curState == "STATS") {
        drawStats();
    } else if (curState == "ARTICLES") {
        drawArticles();
    }
    update();
    context.fill();
}

function drawStrings() {

    context.font = "40px Helvetica";

    context.fillStyle = 'rgb(0,0,0)';
    for (i = 0; i < words.length; i++) {
        if (words[i] != null) {
            context.fillText(words[i], xCoords[i], yCoords[i]);
        }
    }
    context.fillStyle = 'rgb(204,0,0)';
    if (curIndex > 0) {
        for (d = 0; d < curWords.length; d++) {
            if (curWords[d] != null) {
                context.fillText(curWords[d].slice(0, curIndex), xCoords[d],
                yCoords[d]);
            }
        }
    }
}

function drawLeaderboards() {
    context.font = "30px Helvetica";
    context.fillStyle = 'rgb(0,0,0)';
    context.fillText("LEADERBOARDS", canvas.width / 4,
    canvas.height / 4);
}

function drawStats() {
    context.font = "30px Helvetica";
    context.fillStyle = 'rgb(0,0,0)';
    context.fillText("STATS", canvas.width / 4,
    canvas.height / 4);
}


function drawArticles() {
    context.font = "30px Helvetica";
    context.fillStyle = 'rgb(0,0,0)';
    context.fillText("RECENT ARTICLES", canvas.width / 4,
    canvas.height / 4);
}

function update() {

    if (curState == "GAME") {

        //move words down
        for (k = 0; k < yCoords.length; k++) {
            yCoords[k] = yCoords[k] + speed;
        }

        //remove if out of bounds
        for (f = 0; f < yCoords.length; f++) {
            if (yCoords[f] > outOfBounds) {
                words[f] = null;
                curWords[f] = null;
            }
        }

        var foundWord = false;

        //check if the current headline array is empty (no more words on screen)
        for (g = 0; g < words.length; g++) {
            if (words[g] != null) {
                foundWord = true;
            }
        }
        if (!foundWord) {
            setupStrings();
        }

        //see if there are any saved keystrokes to check
        if (justHitKey) {
            justHitKey = false;
            checkKey(curKey);
        }

        secondsElapsed = (new Date().getTime() - startTime) / 1000;
        wpm = (keyStrokes / 5) / (secondsElapsed / 60);
        document.getElementById("wpm").innerHTML = "WPM: " + Math.round(wpm);
    } else {
        if (justHitKey) {
            justHitKey = false;
            checkEnter(curKey);
        }
    }

    document.getElementById("headliner").innerHTML = "NYTimes: " + headlineArray[currentHeadline];

}

window.onkeyup = function (e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (keyboardMap[key] != "SHIFT") {
        curKey = keyboardMap[key];
        justHitKey = true;
    }
}


function checkKey(char) {
    keyCorrect = false;
    finishedKey = false;

    var tempArray = [];

    for (c = 0; c < words.length; c++) {
        if (curWords[c] != null) {
            if (curWords[c].charAt(curIndex).toLowerCase() == char || curWords[c].charAt(curIndex).toUpperCase() == char) {
                keyStrokes++;
                tempArray[c] = curWords[c];
                keyCorrect = true;
                if (curWords[c].length == curIndex + 1) {
                    curWords[c] = null;
                    tempArray[c] = null;
                    words[c] = null;
                    curIndex = 0;
                    curWords = words;
                    finishedKey = true;
                }
            }
        }
    }
    curWords = tempArray;
    if (keyCorrect && !finishedKey) {
        curIndex++;
    }
    //reset curWords array and curIndex
    else {
        curIndex = 0;
        curWords = words;
    }
}

function checkEnter(character) {
    if (character == "ENTER") {
        if (curState != "GAME") {
            curState = "GAME";

        }
    }
}

function changeDifficulty() {

    if (curState == "GAME") {
        if (curDifficulty == "EASY") {
            document.getElementById("difficultyButton").innerHTML = "MEDIUM";
            speed = 1.5;
            curDifficulty = "MEDIUM";
        } else if (curDifficulty == "MEDIUM") {
            document.getElementById("difficultyButton").innerHTML = "HARD";
            speed = 2;
            curDifficulty = "HARD";
        } else if (curDifficulty == "HARD") {
            document.getElementById("difficultyButton").innerHTML = "EASY";
            speed = 1;
            curDifficulty = "EASY";
        }
    }
}

function setLeaderboards() {

    curState = "LEADERBOARDS";

}

function setStats() {
    curState = "STATS";
}

function setArticles() {
    //window.location.href = linkArray[currentHeadline-1];
    window.open(linkArray[currentHeadline]);

}

function sendHome() {
    window.history.back();
}

function wpm() {
    return wpm;
}