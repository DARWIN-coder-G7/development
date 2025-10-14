const firstModule = require('./first-module');

console.log(firstModule.add(8,9)); //17 in console

//module Wrapper
(
    function(exports,require,module,__filename,__dirname){
        // your module goes here
    }
)