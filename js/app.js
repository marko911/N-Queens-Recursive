angular
    .module('app', []);


/* n-Queens Recursive Solution
By: Marko Bilal
https://github.com/marko911
marko.barca10@gmail.com


*/
// Set dimensions of board here:
var N = 8;


// -------------- ENGINE ROOM : Objects and methods for manipulating chessboard----------------



function Grid(n) {
    this.space = new Array(n * n);
    this.width = n;
}

function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
}

Grid.prototype.init = function() {
    for (var i = 0; i < this.space.length; i++) {
        this.space[i] = i;
    }
}


//checking if given index can be used for new spot
function isBanned(index, arrayOfBanned) {
    for (var i = 0; i < arrayOfBanned.length; i++) {


        if (arrayOfBanned[i] == index) {
            return true;
        }
    }
    return false;
}


Grid.prototype.findSpot = function(banned) {
    var spot = undefined;
    for (var i = 0; i < this.space.length; i++) {
        if (i > (this.width - 1)) {
            var index = new Vector(i - (Math.floor(i / this.width) * this.width), Math.floor(i / this.width));
        } else {
            var index = new Vector(i, 0);
        }

        if (this.space[i] != "Q" && !(isBanned(i, banned)) && this.noConflict(index)) {
            spot = index;
            break;
        }
    };

    if (spot) {
        return spot;
    } else {
        return false;
    }

}

//finding spot where no other queens on the board are in horizontal,vertical or diagonal concurrance
Grid.prototype.noConflict = function(vector) {

    //check if queens exist horizontally to given vector
    var checked = 0;
    var i = 1;

    while (checked != this.width - 1) {
        if (vector.x - i > -1) {
            if (this.space[vector.x - i + this.width * vector.y] == "Q") {
                return false;
            }
            checked++;
        }
        if ((vector.x + i) < this.width) {
            if (this.space[vector.x + i + this.width * vector.y] == "Q") {
                return false;
            }
            checked++;
        }
        i++;
    }



    //check if queens exist vertically from vector

    checked = 0;
    i = 1;

    while (checked != this.width - 1) {
        if (vector.y - i > -1) {
            if (this.space[vector.x + this.width * (vector.y - i)] == "Q") {
                return false;
            }
            checked++;
        }
        if (vector.y + i < this.width) {
            if (this.space[vector.x + this.width * (vector.y + i)] == "Q") {
                return false;
            }
            checked++;
        }
        i++;

    }



    // check diagonals


    //positive slope diagonal

    var boundary = false;
    i = 1;

    while (!boundary) {

        if (vector.x - i > -1 && vector.y + i < this.width) {
            if (this.space[vector.x - i + this.width * (vector.y + i)] == "Q") {
                return false;
            }

        }

        if (vector.x + i < this.width && vector.y - i > -1) {
            if (this.space[vector.x + i + this.width * (vector.y - i)] == "Q") {
                return false;
            }

        }

        if (vector.x - i < 0 && vector.y + i >= this.width && vector.x + i >= this.width && vector.y - i < 0) {
            boundary = true;
        }
        i++;

    }

    //negative slope diagonal
    var boundary = false;
    i = 1;

    while (!boundary) {

        if (vector.x - i > -1 && vector.y - i > -1) {
            if (this.space[vector.x - i + this.width * (vector.y - i)] == "Q") {
                return false;
            }

        }

        if (vector.x + i < this.width && vector.y + i < this.width) {
            if (this.space[vector.x + i + this.width * (vector.y + i)] == "Q") {
                return false;
            }

        }

        if (vector.x - i < 0 && vector.y - i < 0 && vector.x + i >= this.width && vector.y + i >= this.width) {
            boundary = true;
        }
        i++;

    }
    console.log('no conflicts');

    //if function hasn't returned by now, no conflicts have been found
    return true;
}



//finding a random spot on board for first piece



//convert array index value to vector format
Grid.prototype.indexConvert = function(index) {
    if (index < this.width) {
        return new Vector(index, 0);
    } else {
        return new Vector(index % this.width, Math.floor(index / this.width));
    }
}




function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}


// N represents chess board size to be used and # of queens to be placed

// var board = new Grid(N);

//array storing indices of queens placed
var bannedIndex = new Array(N + 1).fill([]);

var count = 0;


//----------------------------MAIN RECURSION FUNCTION-------------------

function nQueens(n, board) {
    console.log('n is : ', n);

    if (n == N) {
        var firstSpot = randStart();
        board.init();
        board.set(firstSpot, "Q");
        count++;
        console.log(drawGrid());
        bannedIndex[n] = [firstSpot.x + (board.width * firstSpot.y)];
        return nQueens(n - 1, board);
    }


    var spot = board.findSpot(bannedIndex[n]);

    if (spot) {
        board.set(spot, "Q");
        count++;
        console.log(drawGrid());
        if (bannedIndex[n].length > 0) {
            bannedIndex[n].unshift(spot.x + (board.width * spot.y));
        } else {
            bannedIndex[n] = [spot.x + (board.width * spot.y)];
        }

    } else {
        bannedIndex[n] = [];
        board.set(board.indexConvert(bannedIndex[n + 1][0]), '1');
        return null;
    }

    if (n == 1)

    {
        console.log('SUCCESS!\n\n' + 'Queens Placed:', count);
        var moves=count;
        count=0;
        return moves;

    } else {

        return nQueens(n - 1, board) || nQueens(n, board);
    }

    function randStart() {
        return new Vector(Math.round(Math.random() * (N - 1)), Math.round(Math.random() * (N - 1)));
    }

    function drawGrid() {
        var str = "";
        for (var i = 0; i < board.space.length; i++) {
            if ((i + 1) % N == 0 && i != 0) {
                str += board.space[i] + '\n';
            } else {
                str += board.space[i];
            }

        }
        return str;
    }

}