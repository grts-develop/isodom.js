
module.exports = {
    _private: {
        table: null,
        gameObjects: {},
        data: {}
    },

    settings: {
        rows: 1,
        cols: 1,
        width: 100,
        height: 100
    },

    helper: {
        sortFunction: function(b, a) {
            if (a.y == b.y)
                return a.x - b.x;
            return a.y - b.y;
        }
    },

    create: function(rows, cols, width, height) {
        console.log("Grid()");
        this.settings.rows = rows;
        this.settings.cols = cols;
        this.settings.width = width;
        this.settings.height = height;

        this.generateTable();
        this.generateRowsAndCols();
        this.generateGameObjects();
    },

    generateTable: function() {
        this._private.table = $('<table></table>');
        this._private.table.attr('id', "grid")
        $('body').append(this._private.table);

        return this._private.table;
    },

    generateRowsAndCols: function() {
        var tbody = $('<tbody/>');
        for (var row = 0; row < this.settings.rows; row++) {
            var tr = $('<tr/>');
            for (var col = 0; col < this.settings.cols; col++) {
                var td = $('<td/>');
                td.attr('data-x', col);
                td.attr('data-y', row);
                td.attr('data-z', (col+1)*(row+1));
                td.html("X: " + col + "<br/>Y: " + row + "<br/>Z: " + td.attr('data-z'));
                tr.append(td);
            }
            tbody.append(tr);
        }
        this._private.table.append(tbody);
    },

    generateGameObjects: function() {
        this._private.gameObjects = $("<div />");
        this._private.gameObjects.attr("id", "gameObjects");

        $('body').append(this._private.gameObjects);
    },

    sortItems: function() {
        $('#gameObjects').sort(this.helper.sortFunction);
    },

    generateZindex: function() {
        this.sortItems();

        $('#gameObjects').each(function() {
            var object = $(this);
            var position = {x: Number(object.attr('data-x')), y: Number(object.attr('data-y'))};
            moveObject(object, position);

            var objectTD = $("td[data-x=" + position.x + "][data-y=" + position.y + "]");

            for(var x = position.x; x <= (position.x+itemSize[0]-1); x++) {
                for(var y = position.y; y < (position.y+itemSize[1]); y++) {
                    if(x == position.x && y == position.y)
                        $("td[data-x=" + x + "][data-y=" + y + "]").css("background", "darkgrey");
                    else
                        $("td[data-x=" + x + "][data-y=" + y + "]").css("background", "grey");

                    var td = $("td[data-x=" + x + "][data-y=" + y + "]");
                    td.attr("data-z", objectTD.attr("data-z"));
                    td.html("X: " + position.x + "<br/>Y: " + y + "<br/>Z: " + td.attr("data-z"));
                }
            }

            var TempValue = objectTD.attr("data-z");
            var previousX = $("td[data-x=" + (position.x-1) + "][data-y=" + (position.y) + "]").attr("data-z");
            var previousY = $("td[data-x=" + (position.x) + "][data-y=" + (position.y-1) + "]").attr("data-z");

            if(itemSize[0] != 1)
                previousX = $("td[data-x=" + (position.x-1) + "][data-y=" + (position.y+itemSize[1]-1) + "]").attr("data-z");
            if(itemSize[1] != 1)
                previousY = $("td[data-x=" + (position.x+itemSize[0]-1) + "][data-y=" + (position.y-1) + "]").attr("data-z");

            if(TempValue < previousX) {
                TempValue = Number(Number(previousX)+Number(1));
            }
            if(TempValue < previousY) {
                TempValue = Number(Number(previousY)+Number(1));
            }

            console.log(object.attr("class") + " " + position.x + " " + position.y + " " + objectTD.attr("data-z") + " | " + previousX + " | " + previousY);

            object.css("zIndex", TempValue);
            objectTD.attr("data-z", TempValue);

            for(var x = position.x; x <= (position.x+itemSize[0]-1); x++) {
                for(var y = position.y; y < (position.y+itemSize[1]); y++) {
                    var td = $("td[data-x=" + x + "][data-y=" + y + "]");
                    td.attr("data-z", objectTD.attr("data-z"));
                    td.html("X: " + position.x + "<br/>Y: " + y + "<br/>Z: " + td.attr("data-z"));
                }
            }
        });

        $('img').click(function () {
            console.log($(this).css('zIndex'));
        });
    }
};