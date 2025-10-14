console.log('Node Module wrapper Demo');
console.log('File Name',__filename);
console.log('Dir Name',__dirname);

module.exports.greet = function(name){
    console.log(name);
}