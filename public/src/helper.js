function helperFind(arr, args, key = undefined) {
    return key === undefined ? arr.find((element) => element === args) : arr.find((element) => element.key === args);
}
module.exports = helperFind;