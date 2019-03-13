//Minesweeper
/*
    --------------------------------------Variables--------------------------------------------
*/
/*
    global variables used in game
*/
var game= []; //two dimensional array representing the game table
var numOfMines= 10; //number of mines is 10 as a begginer
var printedTable= [];
var gameOn= true; //keeps the game going until win or lose
var table= document.querySelector('table');
// var tDiv= document.querySelector('.table');
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
    
    //for printing only (doesnt show details)
    //uncomment for DOM
    

    table.innerHTML= '';
    for (var i= 0; i < game.length; i++) {
        var tr= document.createElement("tr");
        for (var j= 0; j < game[i].length; j++) {
            var td= document.createElement("td");
            
            if (i%2==0) {
                if (j%2==0) {
                    // td.style.backgroundColor= '#1f369b';
                    // td.style.backgroundColor= "#0554AB";
                    // td.style.backgroundColor= "#373F51";
                    // td.style.backgroundColor= "#FFC02F";
                    td.style.backgroundColor= "#45433F";
                    
                }
            } else {
                if (j%2!=0) {
                    // td.style.backgroundColor= '#1f369b';
                    // td.style.backgroundColor= "#0554AB";
                    // td.style.backgroundColor= "#373F51";
                    // td.style.backgroundColor= "#FFC02F";
                    td.style.backgroundColor= "#45433F";
                }
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }


    // for (var i= 0; i < game.length; i++) {
    //     var tr= document.createElement('div');
    //     for (var j= 0; j < game[i].length; j++) {
    //         var td= document.createElement('div');
    //     }
    // }

    //uncomment for javaScript
    // for (var i= 0; i < game.length; i++) {
    //     var arr= []; //javaScript
    //     for (var j= 0; j < game[i].length; j++) {
    //         arr.push(' . ');
    //     }
    //     printedTable.push(arr); //javaScript
    // }
    
    placeMines();
    console.log(game);
    
}

/*
    function that places the mines randomly
*/
var minesPlaced= 0;
var printedMines=0;
function placeMines() {
    //placing 10 mines randomly using game indices
    for (var i= 0; minesPlaced < 10; i++) {
        var r= Math.floor(Math.random() * 9);
        var c= Math.floor(Math.random() * 9);
        if ($(`table tr:eq(${r}) td:eq(${c})`).hasClass('mine')!=true) {
            game[r][c]= true;
            minesPlaced++;
        }
        
        $(`table tr:eq(${r}) td:eq(${c})`).addClass('mine');
    }
    printedMines= minesPlaced;

}

/*
    function that places the total number of mines in neighbouring cells of given cell at row and col
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
    function to excute click action on the table boxes
    calls mine() or win() or numOfNearbyMines()
*/
var pressed=0;
function press(row, col, obj) {
    
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
    function called when a mine is clicked, lose game
*/
function mine(obj) {
    gameOn= false;

    var img= '/Users/KhuzamShubbar/Desktop/misk/project1/images/old-bomb-starting-to-explode-comic-book-design-vector-16648472-2.jpg';
    obj.css('background-image', `url(${img}`);
    obj.css('background-repeat', 'no-repeat');
    obj.css('background-size', 'initial');

    var arr= document.querySelectorAll('.mine');
    for (var i=0; i < arr.length; i++) {
        arr[i].style.backgroundImage= `url(${img}`;
        arr[i].style.backgroundRepeat= 'no-repeat';
        arr[i].style.backgroundSize='initial';
    }

    swal("You Lost!")
    return 'mine';   
}

/*
    function called when all boxes are clicked except for the mines, win game
*/
function win(obj) {
    gameOn= false;
    var img= "https://previews.123rf.com/images/pashabo/pashabo1707/pashabo170700170/82623932-win-phrase-in-speech-bubble-comic-text-vector-bubble-icon-speech-phrase-comics-book-balloon-halftone.jpg";
    $('table').css('display', 'none');
    // $('img').attr('src', `url(${img})`);
    $('.img').css('width', '573px');
    $('img').css('display', 'initial');
    $('.left').css('display', 'none');
    $('.right').css('display', 'none');

    console.log('win');
    return 'win';
}

let seconds= 0;
function timer() {
    // let date = new Date();

    if (gameOn) {
    // while (seconds < 999) {
        if (seconds < 10) {
            seconds= `00${seconds}`;
        } else if (seconds < 100) {
            seconds= `0${seconds}`;
        } else {
            seconds= `${seconds}`;
        }
        $('.left p').text(seconds);
        seconds++;
    // }
    }

    
}

/*
    --------------------------------------main--------------------------------------------
*/

createTable();
//button: hide button, show table
$('button').on('click', function(){
    
    $('button').css('display', 'none');
    $('table').css('display', 'table');
    $('.left').css('display', 'initial');
    $('.right').css('display', 'initial');
    timer();
    setInterval(timer, 1000);
    $('.right p').text(minesPlaced);
    
});


$('td').mousedown(function(e){
    //left click
    if (e.which == 1) {
      
        var row= $(event.target).parent().index();
        var col= $(event.target).index();
    
        if (gameOn) {
            if ($(event.target).attr('class')!='flag') {

                // $(event.target).attr('class', 'clicked');
                // $(event.target).css('background-color', '#f7f1ad');
                $(event.target).css('padding', '15px');

                var result= press(row,col,$(event.target));
                
                if (result!='mine' && result!='win') {

                    $(event.target).text(result);
                    
                }
               
                $(event.target).attr('class', 'clicked');
            }
        }
  
    }
    
    //right click
    if (e.which == 3) {
        
        $("td").on("contextmenu", function(event) {
            event.preventDefault()

            if (gameOn) {
                if ($(event.target).attr('id')!='clicked') {

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
                // return false;
            }
        });
  
    }
});


//to-do:
//finalize table layout/colors
//timer* on the left
//num of mines* on the right
//all zeroes**

function allZeroes(obj) {
    //traverse through neighbouring cells
        //click all
        //if zero
            //call allzeroes with new cell
    //return main cell
    console.log(obj);
    
    var rLength= game.length; 
    var cLength= game[0].length;
    var row= obj.parent().index();
    var col= obj.index();
    console.log(obj, row, col);

    if (col-1 >= 0 && numOfNearbyMines(row,col-1)>=0) {
        press(row,col-1); 
        if (numOfNearbyMines(row,col-1)==0) {
            allZeroes(row,col-1);
        }
    } 
    if (col+1 < cLength && numOfNearbyMines(row,col+1)>=0) {
        press(row,col+1);
        if (numOfNearbyMines(row,col+1)==0) {
            allZeroes(row,col+1);
        }
                
    } 
    if (row-1 >= 0 &&numOfNearbyMines(row-1,col)>=0) {
        press(row-1,col);
        if (numOfNearbyMines(row-1,col)==0) {
            allZeroes(row-1,col);
        }
                
    } 
    if (row+1 < rLength &&numOfNearbyMines(row+1,col)>=0) {
        press(row+1,col);
        if (numOfNearbyMines(row+1,col)==0) {
            allZeroes(row+1,col);
        }
                
    } 
    if (col-1 >= 0 && row -1 >= 0 &&numOfNearbyMines(row-1,col-1)>=0) {
        press(row-1,col-1);
        if (numOfNearbyMines(row-1,col-1)==0) {
            allZeroes(row-1,col-1);
        }
                
    } 
    if (col-1 >= 0 && row+1 < rLength &&numOfNearbyMines(row+1,col-1)>=0) {
        press(row+1,col-1);
        if (numOfNearbyMines(row+1,col-1)==0) {
            allZeroes(row+1,col-1);
        }
                
    } 
    if (col+1 < cLength && row -1 >= 0 &&numOfNearbyMines(row-1,col+1)>=0) {
        press(row-1,col+1);
        if (numOfNearbyMines(row-1,col+1)==0) {
            allZeroes(row-1,col+1);
        }
                
    } 
    if (col+1 < cLength && row + 1 < rLength &&numOfNearbyMines(row+1,col+1)>=0) {
        press(row+1,col+1);
        if (numOfNearbyMines(row+1,col+1)==0) {
            allZeroes(row+1,col+1);
        }
    }

}