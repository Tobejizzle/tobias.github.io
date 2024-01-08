const gameBox = document.getElementsByClassName('game-box')[0];

var started = false;
var unclickedTiles = [];

var revealTimeout;

var devMode = false;

const sounds = {
    lose : new Audio("sounds/lose_sound.mp3"),
}

function removeChildren (params){
    var parentId = params.parentId;
    var childName = params.childName;

    var childNodes = document.getElementById(parentId).childNodes;
    for(var i=childNodes.length-1;i >= 0;i--){
        var childNode = childNodes[i];
        if(childNode.name == childName){
            childNode.parentNode.removeChild(childNode);
        }
    }
}

function lose() {
    sounds.lose.play();

    document.getElementById('game_announcement').innerHTML = "You Lose";
    for(let i = 0; i < unclickedTiles.length; i++) {
        unclickedTiles[i].style.color = "red";
    }

    for(let i = 0; i < document.getElementsByClassName('id-text').length; i++) {
        document.getElementsByClassName('id-text')[i].style.visibility = "visible";
        document.getElementsByClassName('tile')[i].style.pointerEvents = "none";
    }
}

function win() {
    for(let i = 0; i < document.getElementsByClassName('id-text').length; i++) {
        document.getElementsByClassName('tile')[i].style.pointerEvents = "none";
    }
    document.getElementById('game_announcement').innerHTML = "You Win";
    startConfetti();
    setTimeout(() => {
        stopConfetti();
    }, 2000);
}

function init() {
    var chosenIds = [];
    
    var lastNum = 0;

    while (chosenIds.length < 9) {
        let id = Math.floor(Math.random() * 9) + 1;

        if(chosenIds.includes(id)) {    
            id = Math.floor(Math.random() * 9) + 1;
        } else {
            let tile = document.createElement('div');
            tile.id = id;
            tile.classList.add('tile');
            tile.name = "tile";
            unclickedTiles.push(tile);
            
            let idText = document.createElement('p');
            idText.innerHTML = id;
            idText.classList.add('id-text');
            tile.appendChild(idText);
            tile.onclick = function () {
                idText.style.visibility = "visible";

                tile.style.pointerEvents = "none";

                if(tile.id != lastNum + 1) {
                    for(let i = 0; i < document.getElementsByClassName('tile').length; i++) {
                        lose();
                    }
                } else {
                    lastNum += 1;
                }

                console.log(unclickedTiles.length);

                if (unclickedTiles.length <= 1) {
                    win();
                }
                
                const index = unclickedTiles.indexOf(tile);
                if (index > -1) {
                    unclickedTiles.splice(index, 1);
                };
            };

            chosenIds.push(id);

            gameBox.appendChild(tile); 
        }
    }
}

function start() {
    if (started) {
        return;
    } else {
        started = true;

        init();

        document.getElementById('reload_btn').style.visibility = "visible";

        for(let i = 0; i < document.getElementsByClassName('tile').length; i++) {
            document.getElementsByClassName('tile')[i].style.visibility = "visible";
            document.getElementsByClassName('tile')[i].style.pointerEvents = "none";
        }

        for(let i = 0; i < document.getElementsByClassName('id-text').length; i++) {
            document.getElementsByClassName('id-text')[i].style.visibility = "visible";
        }

        if (!devMode) {
            revealTimeout = setTimeout(() => {
                for(let i = 0; i < document.getElementsByClassName('id-text').length; i++) {
                    document.getElementsByClassName('id-text')[i].style.visibility = "hidden";
                    document.getElementsByClassName('tile')[i].style.pointerEvents = "all";
                }
            }, 3000);
        } else {
            for(let i = 0; i < document.getElementsByClassName('id-text').length; i++) {
                document.getElementsByClassName('tile')[i].style.pointerEvents = "all";
            }
        }
    }
}

function reload() {
    started = false;

    clearTimeout(revealTimeout);

    unclickedTiles = [];

    removeChildren({parentId: "game-box", childName: "tile"});

    document.getElementById('reload_btn').style.visibility = "hidden";
    document.getElementById('game_announcement').innerHTML = "";
}
