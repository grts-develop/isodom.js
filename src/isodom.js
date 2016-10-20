
module.exports = {
    _private: {
        table: null,
        gameObjects: {},
        data: {}
    },

    settings: {
        rows: 1,
        cols: 1,
        cellWidth: 100,
        cellHeight: 100
    },

    helper: {
        /*
         * Sorts the gameObjects in a specific order for z-indexing generation later on, used by sortItems
         * @param {mixed} b
         * @param {mixed} a
         * @return {number}
         */
        sortFunction: function(b, a) {
            if (a.y == b.y)
                return a.x - b.x;
            return a.y - b.y;
        }
    },

    /*
     * Creates a grid
     * @param {number} rows - The number of rows required
     * @param {number} cols - The number of rows required
     * @param {number} cellWidth - The width if each square in the grid
     * @param {number} cellHeight - The height if each square in the grid
     */
    create: function(rows, cols, cellWidth, cellHeight) {
        console.log("Grid()");
        this.settings.rows = rows;
        this.settings.cols = cols;
        this.settings.cellWidth = cellWidth;
        this.settings.cellHeight = cellHeight;

        this.generateTable();
        this.generateRowsAndCols();
        this.generateGameObjects();
    },

    /*
     * Creates a table within body
     * TODO: add support for ready made parents (instead of just body)
     * @return {object}
     */
    generateTable: function() {
        this._private.table = $('<table></table>');
        this._private.table.attr('id', "grid")
        $('body').append(this._private.table);

        return this._private.table;
    },

    /*
     * Creates the rows and columns within table
     */
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

    /*
     * Creates the gameobject container (div)
     * TODO: add support for ready made parents (instead of just body)
     * @return {object}
     */
    generateGameObjects: function() {
        this._private.gameObjects = $("<div />");
        this._private.gameObjects.attr("id", "gameObjects");

        $('body').append(this._private.gameObjects);
        return this._private.gameObjects;
    },

    /*
     * Sorts the gameObjects in a specific order for z-indexing generation later on
     */
    sortItems: function() {
        $('#gameObjects').sort(this.helper.sortFunction);
    },

    /*
     * Generates the z-index for the objects created
     * TODO: remake/separate into multiple functions
     */
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
    }
};