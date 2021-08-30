/*didnt really know where to put a helper function, seeing that all solutions were unique
and there not being a lot of repeated code. I could of made a shorter console log but it 
would make things messier than need be.*/

//function takes 3 arguments, an array, a comparator and a string key value
function helperFind(arr, args, key = undefined) {
    return key === undefined ? arr.find((element) => element === args) : arr.find((element) => element[key] === args);
}
module.exports = helperFind;