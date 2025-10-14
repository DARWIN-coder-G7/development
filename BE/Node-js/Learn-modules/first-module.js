function add(a,b){
    if( isNaN(a) || isNaN(b)) return null;
    return a+b;
}
function sub(a,b){
    if( isNaN(a) || isNaN(b)) return null;
    return a-b;
}
function divide(a,b){
    if(b==0)throw new Error("please dont try divide anything by zero");
    if( isNaN(a) || isNaN(b) || (b ==0)) return null;
    return a/b;
}

module.exports ={
    add,sub,divide
}