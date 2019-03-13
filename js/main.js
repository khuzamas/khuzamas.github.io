//Minesweeper
/*
    --------------------------------------Variables--------------------------------------------
*/
/*
    global variables used in game
*/
var game= []; //two dimensional array representing the game table
var numOfMines= 10; //number of mines is 10 as a begginer
var gameOn= true; //keeps the game going until win or lose
var table= document.querySelector('table');
var minesPlaced= 0; //keep track of the placed mines in the game
var printedMines=0; //to print the number of mines (changes with showing flags)
var pressed=0; //keep track of how many empty cells are pressed
let seconds= 0; //seconds for timer

/*
    --------------------------------------functions--------------------------------------------
*/
/*
    function that builds the table
*/
function createTable() {

    //building a 9x9 array storing mines and numbers
    for (var r= 0; r < 9; r++) {
        var row= [];
        for (var c= 0; c < 9; c++) {
            var col= false;
            row.push(col);
        }
        game.push(row);
    }
    
    //building the HTML table
    table.innerHTML= '';
    for (var i= 0; i < game.length; i++) {
        var tr= document.createElement("tr");
        for (var j= 0; j < game[i].length; j++) {
            var td= document.createElement("td");
            
            //checkered style coloring
            if (i%2==0) {
                if (j%2==0) {
                    td.style.backgroundColor= "#45433F";
                    
                }
            } else {
                if (j%2!=0) {
                    td.style.backgroundColor= "#45433F";
                }
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
    placeMines(); //placing mines after building the table
    console.log(game);
    
}

/*
    function that places the mines randomly
*/
function placeMines() {
    //placing 10 mines randomly using game indices
    for (var i= 0; minesPlaced < 10; i++) {
        var r= Math.floor(Math.random() * 9); //random mine row
        var c= Math.floor(Math.random() * 9); //random mine column

        //make sure it doesn't already have a mine
        if ($(`table tr:eq(${r}) td:eq(${c})`).hasClass('mine')!=true) {
            game[r][c]= true;
            minesPlaced++;
        }
        
        $(`table tr:eq(${r}) td:eq(${c})`).addClass('mine');
    }
    printedMines= minesPlaced;
}

/*
    function that calculates the total number of mines in neighbouring cells of given cell at row and col
    input: row, col of current cell
    return: num (var) of nearby mines
*/
function numOfNearbyMines(row, col) {
    
    var rLength= game.length; 
    var cLength= game[row].length;

    var nearbyMines= 0; //number of mines 
        
    if (game[row][col]!=true) { //if mine==true

        if (col-1 >= 0 && game[row][col-1]==true) {
            nearbyMines++;
                    
        } 
        if (col+1 < cLength && game[row][col+1]==true) {
            nearbyMines++;
                    
        } 
        if (row-1 >= 0 && game[row-1][col]==true) {
            nearbyMines++;
                    
        } 
        if (row+1 < rLength && game[row+1][col]==true) {
            nearbyMines++;
                    
        } 
        if (col-1 >= 0 && row -1 >= 0 && game[row-1][col-1]==true) {
            nearbyMines++;
                    
        } 
        if (col-1 >= 0 && row+1 < rLength && game[row+1][col-1]==true) {
            nearbyMines++;
                    
        } 
        if (col+1 < cLength && row -1 >= 0 && game[row-1][col+1]==true) {
            nearbyMines++;
                    
        } 
        if (col+1 < cLength && row + 1 < rLength && game[row+1][col+1]==true) {
            nearbyMines++;
        }

        return nearbyMines;
                
    }
    
}

/*
    function to excute click action on the cell, calls mine() or win() or numOfNearbyMines()
    input: row, col of cell, the cell as object
    return: mine() if cell containes mine
            win() if the user pressed all the empty cells
            numOfNearbyMines() otherwise
*/
function press(row, col, obj) {
    
    //make sure it hasn't been clicked yet
    if (obj.hasClass('clicked')==false) {
        pressed++;
        if (game[row][col]) {
            return mine(obj);
        } else  if (pressed==(game.length*game.length)-minesPlaced) {
            return win(obj);
        } else {
            return numOfNearbyMines(row,col);
        }
    }
    
}

/*
    function called when a mine is clicked, lose game.
    changes the background image of clicked cell
*/
function mine(obj) {
    gameOn= false; //turn off game

    //change background image
    var img= 'https://i.imgur.com/niCxZr7.jpg';
    obj.css('background-image', `url('${img}'`);
    obj.css('background-repeat', 'no-repeat');
    obj.css('background-size', '');

    //change the background (show) of all the other mine cells
    var arr= document.querySelectorAll('.mine');
    for (var i=0; i < arr.length; i++) {
        arr[i].style.backgroundImage= `url(${img}`;
        arr[i].style.backgroundRepeat= 'no-repeat';
        arr[i].style.backgroundSize='initial';
    }

    swal ({
       title: "You Lost!",
       font: "MyFirstFont"
    })
    return 'mine';   
}

/*
    function called when all boxes are clicked except for the mines, win game
    removes all elements and shows win image
*/
function win(obj) {
    gameOn= false; //turn off game

    var img= "https://previews.123rf.com/images/pashabo/pashabo1707/pashabo170700170/82623932-win-phrase-in-speech-bubble-comic-text-vector-bubble-icon-speech-phrase-comics-book-balloon-halftone.jpg";
    $('table').css('display', 'none');
    $('.img').css('width', '573px');
    $('img').css('display', 'initial');
    $('.left').css('display', 'none');
    $('.right').css('display', 'none');

    console.log('win');
    return 'win';
}


function timer() {
    
    //increment seconds as long as the game is going (on/true)
    if (gameOn) {
        if (seconds < 10) {
            seconds= `00${seconds}`;
        } else if (seconds < 100) {
            seconds= `0${seconds}`;
        } else {
            seconds= `${seconds}`;
        }
        $('.left p').text(seconds);
        seconds++;
    }

}

/*
    --------------------------------------main--------------------------------------------
*/

createTable(); //create the game array/table

//click event for start game button displays the table
$('button').on('click', function(){
    $('button').css('display', 'none');
    $('table').css('display', 'table');
    $('.left').css('display', 'initial');
    $('.right').css('display', 'initial');
    timer();
    setInterval(timer, 1000);
    $('.right p').text(minesPlaced);
    
});

//click event for table (left click and right click)
$('td').mousedown(function(e){
    //left click
    if (e.which == 1) {
      
        var row= $(event.target).parent().index();
        var col= $(event.target).index();
    
        if (gameOn) {
            if ($(event.target).attr('class')!='flag') {
                $(event.target).css('padding', '15px');

                //call press to see the result
                var result= press(row,col,$(event.target));
                
                //as long as the cell does not contain mine or win, set the text to the result (numOfNearbyMines)
                if (result!='mine' && result!='win') {
                    $(event.target).text(result);
                }
               
                //add class clicked to keep track
                $(event.target).attr('class', 'clicked');
            }
        }
  
    }
    
    //right click
    if (e.which == 3) {
        
        $("td").on("contextmenu", function(event) {
            event.preventDefault(); //prevent the right click menu from showing up

            if (gameOn) {
                if ($(event.target).attr('id')!='clicked') {

                    //toggle the flag and change the printedMines var accordingly
                    if ($(event.target).hasClass('flag')) {
                        $(event.target).removeClass('flag');
                        printedMines++;
                        $('.right p').text(printedMines);
                    } else {
                        $(event.target).addClass('flag');
                        printedMines--;
                        $('.right p').text(printedMines);
                    }

                } 
            }
        });
  
    }
});
