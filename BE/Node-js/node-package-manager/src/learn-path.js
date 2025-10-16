const lodash = require('lodash');
const path = require('path');

const names =['sangam','john','selvan','ajith','swetha','sumithra','suganya','saritha','sharnika','sankar'];
const capitalize = lodash.map(names,lodash.capitalize);
// console.log(capitalize);

console.log(`Path name`,path.dirname(__filename));
console.log(`File name`,path.basename(__filename));
console.log(`File Extension`,path.extname(__filename));

const joinPath = path.join('/user','documents','node','projects');
console.log(joinPath); // \user\documents\node\projects

const resolvePath = path.resolve('user','documents','node','projects');
console.log(resolvePath); // C:\Users\ebis\JavaScript\BE\Node-js\node-package-manager\user\documents\node\projects

const normalizePath = path.normalize('/users/.documents/../node/projects');
console.log("normalizePath",normalizePath); // \users\node\projects

//Normalize skips the UnNeccessary iteration of going into a folder then goig back to the root
//  that is the Reason it ignored documents here
// Now apply what each part means:

// / → root

// users → go inside the “users” folder

// .documents → a folder literally named “.documents” (the leading dot doesn’t mean “hidden”, it’s just part of the name)

// .. → go up one level (parent directory)

// node → go into “node”

// projects → go into “projects”

// So when normalize() processes:

// it goes to /users/.documents

// then .. means go up → back to /users

// then continues into /users/node/projects

//  Result: /users/.documents/../node/projects simplifies to /users/node/projects.