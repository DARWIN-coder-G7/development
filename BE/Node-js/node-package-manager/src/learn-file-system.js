const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, 'data');

//check if folder exists or not
if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
    console.log("data Folder Created");
}

const filePath = path.join(dataFolder, 'example.txt');

//sync way of creating the file
fs.writeFileSync(filePath, 'Hey This is From Node Js');
console.log("File Created SuccessFully");

const readFile = fs.readFileSync(filePath, 'utf8');
console.log("content from File || ", readFile);

fs.appendFileSync(filePath, '\n This is the Second Line which got added by Appending');

//Async way of Creating The File
const asyncFilePath = path.join(dataFolder, 'async-example.txt');
fs.writeFile(asyncFilePath,
    "Hello through Asynchronous way from the same Single threaded Node Js",
    (err) => {
        if (err) throw new err;
        console.log("Async File is Created SuccessFully");
        //Now we are going To read the file
        fs.readFile(asyncFilePath, 'utf8',
            (err, data) => {
                if (err) throw new err;
                console.log("DATA || ", data);
            });
        fs.appendFile(asyncFilePath,
            '\n This new line is added Via appendfile',
            (err) => { if (err) throw new err; });
    }
)