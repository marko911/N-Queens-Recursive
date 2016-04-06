(function() {
    'use strict';
    angular
        .module('app')
        .controller('ChessController', ChessController);

    function ChessController($scope) {

        var ctrl = this;

        ctrl.assignClass = assignClass;
        ctrl.dimensions = N;
        ctrl.rows = rowsArray(ctrl.dimensions);
        ctrl.arrayRow = arrayRow;
        ctrl.board = new Grid(ctrl.dimensions);
        ctrl.board.init();
        ctrl.go = go;
        ctrl.hasQueen = hasQueen;
        ctrl.count = 0;


        function go() {
            ctrl.count=0;
            ctrl.count = nQueens(ctrl.dimensions, ctrl.board);

        }

        function hasQueen(element) {
            if (element == "Q") {
                return 'queen';
            } else
                return 'row';
        }

        function rowsArray(dims) {
            var arr = [];
            for (var i = 0; i < dims; i++) {
                arr.push(i);
            }
            return arr;
        }


        function assignClass(pIndex, index) {
            if ((pIndex + index) % 2 == 0) {
                return 'white';
            } else {
                return 'black';
            }
        }


        function arrayRow(index) {
            var ret = ctrl.board.space.slice(index * ctrl.dimensions, index * ctrl.dimensions + ctrl.dimensions);
            return ret;
        }
    }
})();



//ng-repeat inside ng-repeat
// Ng-class (function using $index to return the class)