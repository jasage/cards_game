(function(){
    var cardsField = document.querySelector("#cards"),
    resetBlock = document.querySelector("#reset"),
    restartBtn = document.querySelector("#reset-btn"),
    startBlock = document.querySelector("#start"),
    startBtn   = document.querySelector("#start-btn"),
    /*Get Size Field from server url*/
    /*
        function getJSON(url){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.withCredentials = true;
            xhr.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                return JSON.parse(this.responseText);
              }
            };
            xhr.send();
        }
        getSize= getJSON('http://kde.link/test/get_field_size.php'); 
     */
    getSize={'width':5 , 'height': 4},
    countCards = getSize.width * getSize.height;

/* Start Game Button */ 
startBtn.onclick = function(){
    startBlock.style.display = "none";
    cardsField.style.width=getSize.width*100+"px";
    cardsField.style.height=getSize.height*100+"px";
    startGame();
}
/* Restart Button onclick */ 
restartBtn.onclick = function(){ 
    resetBlock.style.display = "none";
    startGame();
}

/* Start game function */
    function startGame(){
        var images=[];
        var selectedCards = [];
        var pause = false;
        var deletedCards = 0;

        /* Create Cards Field*/
        for(let i = 0; i < countCards; i++) {
            var li = document.createElement("li");
            li.id = i;
            cardsField.appendChild(li);
        }
        /* Get Random Img by id*/
        while(images.length<countCards) {
            let count=0;
            let rdnum=Math.floor(Math.random()*(countCards/2));

            for(let j =0 ;j<images.length;j++ ){
                if(rdnum==images[j]){
                    count++;
                }
            }

            if(count<2){
                images.push(rdnum);
            }
        }
        /* Main function . Open Img Cards*/
        cardsField.onclick = function(event) {
            if(pause == false) {
                var element = event.target;
                
                /*Check for not opened cards */
                if(element.tagName == "LI" && element.className != "active") {
                    selectedCards.push(element);
                    element.className = "active";
                    
                    /******Here, change url imgs ******/
                    element.style.backgroundImage = 'url("https://kde.link/test/' + images[element.id] + '.png")';
                    /******Here, change url imgs ******/
                    
                    /*Check 2 cards => reset if not similar or hide if similar*/
                    if(selectedCards.length == 2) {
                        pause = true;
                        if( images[ selectedCards[0].id ] == images[ selectedCards[1].id ] ) {
                            selectedCards[0].style.visibility = "hidden";
                            selectedCards[1].style.visibility = "hidden";
                            deletedCards = deletedCards + 2;
                        }

                        setTimeout(resetCards, 600);
                    }
                }
                /********************************/
            }

        }
        /* Close img. Reset img. End game*/
        function resetCards () {
            /*Close imgs*/
            for(let i = 0; i < countCards; i++) {
                cardsField.children[i].style.backgroundImage = 'none';
                cardsField.children[i].className = "";
            }
            selectedCards = [];
            pause = false;
            
            /*Check for End*/
            if (deletedCards == countCards) {
                resetBlock.style.display = "block";
                for(var j = 0; j < countCards; j++){
                    /* delete elements li */
                cardsField.removeChild(document.getElementById(j));
                }
            }
        }
    }
})();