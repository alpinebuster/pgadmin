/** @module wcLayoutTable */
define([
    "dcl/dcl",
    "./types",
    "./layout"
], function (dcl, wcDocker, wcLayout) {

    /**
     * @class module:wcLayoutTable
     * A gridded layout for arranging elements. [Panels]{@link wcPanel}, [splitter widgets]{@link wcSplitter}
     * and [tab widgets]{@link wcTabFrame} contain these by default to handle their contents.
     */
    var Module = dcl(wcLayout, {
        declaredClass: 'wcLayoutTable',

        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        // Public Functions
        ///////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Adds an item into the layout, expanding the grid size if necessary.
         * @function module:wcLayoutTable#addItem
         * @param {external:jQuery~selector|external:jQuery~Object|external:domNode} item - A DOM element to add.
         * @param {Number} [x=0] - The horizontal grid position to place the element.
         * @param {Number} [y=0] - The vertical grid position to place the element.
         * @param {Number} [w=1] - The number of horizontal cells this item will take within the grid.
         * @param {Number} [h=1] - The number of vertical cells this item will take within the grid.
         * @returns {module:wcLayoutTable~tableItem|Boolean} The table data element of the cell that contains the item, or false if there was a problem.
         */
        addItem: function (item, x, y, w, h) {
            if (typeof x === 'undefined' || x < 0) {
                x = 0;
            }
            if (typeof y === 'undefined' || y < 0) {
                y = 0;
            }
            if (typeof w === 'undefined' || w <= 0) {
                w = 1;
            }
            if (typeof h === 'undefined' || h <= 0) {
                h = 1;
            }

            this.__resizeGrid(x + w - 1, y + h - 1);
            if (w > 1 || h > 1) {
                if (!this.__mergeGrid(x, y, w, h)) {
                    return false;
                }
            }

            this._grid[y][x].$el.append($(item));
            return this.item(x, y);
        },

        /**
         * Retrieves the table item at a given grid position, if it exists.
         * Note, if an item spans multiple cells, only the top-left most
         * cell will actually contain the table item.
         * @function module:wcLayoutTable#item
         * @param {Number} x - The horizontal grid position.
         * @param {Number} y - The vertical grid position.
         * @returns {module:wcLayoutTable~tableItem|Boolean} - The table item, or false if none was found.
         */
        item: function (x, y) {
            if (y >= this._grid.length) {
                return false;
            }

            if (x >= this._grid[y].length) {
                return false;
            }

            // Some cells are a merging of multiple cells. If this cell is
            // part of a merge for another cell, use that cell instead.
            // if (this._grid[y][x].x < 0 || this._grid[y][x].y < 0) {
            //   var grid = this._grid[y][x];
            //   x -= grid.x;
            //   y -= grid.y;
            // }

            var self = this;
            /**
             * The table item is an object that represents one cell in the layout table, it contains
             * convenient methods for cell alteration and supports chaining. Its purpose is
             * to remove the need to alter &lt;tr&gt; and &lt;td&gt; elements of the table directly.
             * @version 3.0.0
             * @example myPanel.addItem(domNode).css('text-align', 'right').css('border', '1px solid black').stretch('100%', '100%');
             * @typedef module:wcLayoutTable#tableItem
             * @property {jQuery~Object} $ - If you truely need the table cell [jQuery object]{@link jQuery~Object}, here it is.
             * @property {module:wcLayoutTable~tableItem_css} css - Wrapper to alter [jQuery's css]{@link http://api.jquery.com/css/} function.
             * @property {module:wcLayoutTable~tableItem_stretch} stretch - More reliable method for setting the table item width/height values.
             */
            var myItem = {
                $: self._grid[y][x].$el,

                /**
                 * <small><i>This function is found in {@link module:wcLayoutTable~tableItem}.</small></i><br>
                 * A wrapper for [jQuery's css]{@link http://api.jquery.com/css/} function.
                 * <b>Note:</b> It is recommended that you use [stretch]{@link wcLayoutTable~stretch} if you intend to alter width or height styles.
                 * @version 3.0.0
                 * @function module:wcLayoutTable#tableItem_css
                 * @param {String} style - The style attribute to alter.
                 * @param {String} [value] - The value of the attribute. If omitted, the current value of the attribute is returned instead of the [tableItem]{@link module:wcLayoutTable~tableItem} instance.
                 * @returns {module:wcLayoutTable~tableItem|String} - Self, for chaining, unless the value parameter was omitted.
                 */
                css: function (style, value) {
                    if (self._grid[y][x].$el) {
                        if (value === undefined) {
                            return self._grid[y][x].$el.css(style);
                        }

                        self._grid[y][x].$el.css(style, value);
                    }
                    return myItem;
                },

                /**
                 * <small><i>This function is found in {@link module:wcLayoutTable~tableItem}.</small></i><br>
                 * Sets the stretch amount for the current table item. This is more reliable than
                 * assigning width and height style attributes directly on the table item.
                 * @version 3.0.0
                 * @function module:wcLayoutTable#tableItem_stretch
                 * @param {Number|String} [sx] - The horizontal stretch for this grid. Use empty string to clear current value. Can be a pixel position, or a string with a 'px' or '%' suffix.
                 * @param {Number|String} [sy] - The vertical stretch for this grid. Use empty string to clear current value. Can be a pixel position, or a string with a 'px' or '%' suffix.
                 * @returns {module:wcLayoutTable~tableItem} - Self, for chaining.
                 */
                stretch: function (width, height) {
                    self.itemStretch(x, y, width, height);
                    return myItem;
                }
            };
            return myItem;
        },

        /**
         * Sets the stretch amount for a given table item. This is more reliable than
         * assigning width and height style attributes directly on the table item.
         * @version 3.0.0
         * @function module:wcLayoutTable#itemStretch
         * @param {Number} x - The horizontal grid position.
         * @param {Number} y - The vertical grid position.
         * @param {Number|String} [sx] - The horizontal stretch for this grid. Use empty string to clear current value. Can be a pixel position, or a string with a 'px' or '%' suffix.
         * @param {Number|String} [sy] - The vertical stretch for this grid. Use empty string to clear current value. Can be a pixel position, or a string with a 'px' or '%' suffix.
         * @returns {Boolean} - Success or failure. A failure generally means your grid position was a merged grid cell.
         */
        itemStretch: function (x, y, sx, sy) {
            var wasBatched = this._batchProcess;

            this._batchProcess = true;
            this.__resizeGrid(x, y);

            var grid = this._grid[y][x];
            if (grid.x < 0 || grid.y < 0) {
                return false;
            }

            if (sx !== undefined) {
                grid.sx = sx;
            }
            if (sy !== undefined) {
                grid.sy = sy;
            }

            this._batchProcess = wasBatched;
            if (!wasBatched) {
                this.__resizeGrid(0, 0);
            }

            return true;
        },

        /**
         * Clears the contents of the layout and squashes all rows and columns from the grid.
         * @function module:wcLayoutTable#clear
         */
        clear: function () {
            var showGrid = this.showGrid();
            var spacing = this.gridSpacing();
            var alternate = this.gridAlternate();

            this.$elem.remove();
            this.__init();

            this.showGrid(showGrid);
            this.gridSpacing(spacing);
            this.gridAlternate(alternate);

            this._grid = [];
        },

        /**
         * Begins a batch operation.  Basically it refrains from constructing
         * the layout grid, which causes a reflow, on each item added.  Instead,
         * The grid is only generated at the end once [wcLayoutTable.finishBatch]{@link wcLayoutTable#finishBatch} is called.
         * @function module:wcLayoutTable#startBatch
         */
        startBatch: function () {
            this._batchProcess = true;
        },

        /**
         * Ends a batch operation.
         * @See module:wcLayoutTable#startBatch
         * @function module:wcLayoutTable#finishBatch
         */
        finishBatch: function () {
            this._batchProcess = false;
            this.__resizeGrid(0, 0);
        },

        /**
         * Gets, or Sets whether the layout grid cells should draw an outline.
         * @function module:wcLayoutTable#showGrid
         * @param {Boolean} [enabled] - If supplied, will set the grid cell border visibility.
         * @returns {Boolean} - The current visibility state of the grid cells.
         */
        showGrid: function (enabled) {
            if (typeof enabled !== 'undefined') {
                this.$elem.toggleClass('wcLayoutGrid', enabled);
            }

            return this.$elem.hasClass('wcLayoutGrid');
        },

        /**
         * Gets, or Sets the spacing between cell borders.
         * @function module:wcLayoutTable#gridSpacing
         * @param {Number} [size] - If supplied, sets the pixel size of the spacing between cells.
         * @returns {Number} - The current cell spacing in pixels.
         */
        gridSpacing: function (size) {
            if (typeof size !== 'undefined') {
                this.$elem.css('border-spacing', size + 'px');
            }

            return parseInt(this.$elem.css('border-spacing'));
        },

        /**
         * Gets, or Sets whether the table rows alternate in color based on the theme.
         * @function module:wcLayoutTable#gridAlternate
         * @params {Boolean} [enabled] - If supplied, will set whether the grid alternates in color.
         * @returns {Boolean} - Whether the grid alternates in color.
         */
        gridAlternate: function (enabled) {
            if (typeof enabled !== 'undefined') {
                this.$elem.toggleClass('wcLayoutGridAlternate', enabled);
            }

            return this.$elem.hasClass('wcLayoutGridAlternate');
        },


///////////////////////////////////////////////////////////////////////////////////////////////////////
// Private Functions
///////////////////////////////////////////////////////////////////////////////////////////////////////

        // Initialize
        __init: function () {
            this.$elem = $('<table class="wcLayout wcWide wcTall"></table>');
            this.$elem.append($('<tbody></tbody>'));
            this._grid = [];
            this.__container(this.$container);
        },

        // Updates the size of the layout.
        __update: function () {
        },

        // Resizes the grid to fit a given position.
        // Params:
        //    width     The width to expand to.
        //    height    The height to expand to.
        __resizeGrid: function (width, height) {
            for (var y = 0; y <= height; ++y) {
                if (this._grid.length <= y) {
                    var row = [];
                    row.$row = $('<tr>');
                    this._grid.push(row);
                }

                for (var x = 0; x <= width; ++x) {
                    if (this._grid[y].length <= x) {
                        this._grid[y].push({
                            $el: $('<td>'),
                            x: 0,
                            y: 0,
                            sx: '',
                            sy: ''
                        });
                    }
                }
            }

            if (!this._batchProcess) {
                var $oldBody = this.$elem.find('tbody');
                $('.wcDockerTransition').append($oldBody);

                var $newBody = $('<tbody>');
                for (var y = 0; y < this._grid.length; ++y) {
                    var $row = null;

                    for (var x = 0; x < this._grid[y].length; ++x) {
                        var item = this._grid[y][x];
                        if (item.$el) {
                            if (!$row) {
                                $row = this._grid[y].$row;
                                $newBody.append($row);
                            }

                            item.$el.css('width', item.sx);
                            item.$el.css('height', item.sy);
                            $row.append(item.$el);
                        }
                    }
                }

                this.$elem.append($newBody);
                $oldBody.remove();
            }
        },

        // Merges cells in the layout.
        // Params:
        //    x, y      Cell position to begin merge.
        //    w, h      The width and height to merge.
        // Returns:
        //    true      Cells were merged succesfully.
        //    false     Merge failed, either because the grid position was out of bounds
        //              or some of the cells were already merged.
        __mergeGrid: function (x, y, w, h) {
            // Make sure each cell to be merged is not already merged somewhere else.
            for (var yy = 0; yy < h; ++yy) {
                for (var xx = 0; xx < w; ++xx) {
                    var item = this._grid[y + yy][x + xx];
                    if (!item.$el || item.x !== 0 || item.y !== 0) {
                        return false;
                    }
                }
            }

            // Now merge the cells here.
            var item = this._grid[y][x];
            if (w > 1) {
                item.$el.attr('colspan', '' + w);
                item.x = w - 1;
            }
            if (h > 1) {
                item.$el.attr('rowspan', '' + h);
                item.y = h - 1;
            }

            for (var yy = 0; yy < h; ++yy) {
                for (var xx = 0; xx < w; ++xx) {
                    if (yy !== 0 || xx !== 0) {
                        var item = this._grid[y + yy][x + xx];
                        item.$el.remove();
                        item.$el = null;
                        item.x = -xx;
                        item.y = -yy;
                    }
                }
            }
            return true;
        },
    });

    return Module;
});
