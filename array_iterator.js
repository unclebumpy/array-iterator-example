// Given an array of arrays, implement an iterator class to allow the client to traverse and remove elements in the array list.
// The iterator should provide three public class member functions:

// boolean hasNext()
//     return true if there is another element in the set

// int next()
//     return the value of the next element in the array

// void remove()
//     remove the last element returned by the iterator.
//     That is, remove the element that the previous next() returned
//     This method can be called only once per call to next(), 
//     otherwise an exception will be thrown.
//     See http://docs.oracle.com/javase/7/docs/api/java/util/Iterator.html#remove() for details.

// Ex: [[],[1,2,3],[4,5],[],[],[6],[7,8],[],[9],[10],[]]

// var iter = new Iterator(arrOfArrays);
// iter.next() => 1
// iter.next() => 2
// iter.next() => 3
// iter.next() => 4
// iter.hasNext() => true
// iter.remove() => null
// iter.next() => 5

var Iterator = function(arr){
    /* only handles arrays nested up to one deep */

    var flatArr = [],
        loc = 0,
        delAble = false;
    
    /* flatten the array rather than handling it nested. fine for small arrays. */
    arr.forEach(function(element,index,array) {
        if (Array.isArray(element)){
            element.forEach(function(element){
                flatArr.push(element)
            })
        } else {
            flatArr.push(element)
        }
    }, this);

    this.hasNext = function(){
        /* is there something at current location + 1 */
        if (flatArr[loc+1]){
            return true
        } else {
            return false
        }
    };

    this.next = function(){
        /* return the next value */
        if (this.hasNext()){
            loc++
            delAble = true;
            return flatArr[loc-1]
        } else {
            return false
        }
    };

    this.remove = function(){
        /* remove the item last returned by next() */
        if(delAble){
            flatArr.splice(loc-1, 1)
            loc--
            delAble = false;
            return true
        } else {
            return false
        }
    }

    this.returnArray = function(){
        /* return the array as a string for reference */
        return flatArr.toString()
    }
}
