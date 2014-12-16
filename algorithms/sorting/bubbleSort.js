var sort = (function (exports) {
  function compareFunc(a, b) {
      return (a - b) > 0 ? true : false;
    }
    /**
     * The bubblesort algorithm. Complexity O(n^2).
     *
     * @public
     * @param {array, compare function} array Input array
     * @returns {array} array Sorted array
     */
  function bubbleSort(array, cmp) {
    cmp = cmp || compareFuncn;
    var i, j, temp;
    for (i = 0; i < array.length; i++) {
      for (j = i; j >= 0; j--) {
        if (compareFunc(array[j], array[j - 1])) {
          temp = array[j - 1];
          array[j - 1] = array[j];
          array[j] = temp;
        }
      }
    }
    return (array);
  }
  exports.bubbleSort = bubbleSort;

}(typeof exports === "undefined" ? window : exports));

console.log(sort.bubbleSort([4, 1, 4, 2, 7, 3, 6, 2.05, 1.072, -4, -2]));
