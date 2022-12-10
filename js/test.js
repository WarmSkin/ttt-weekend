let sum = 0;

arr = [0,1,2,5,6,7,8];

function addUp() {
    arr.forEach(element => {
        sum = sum + element;
    });
}

addUp();

console.log(`first sum ${sum}`)

let sum1 = 0;

function addUp1() {
    let temp = 0
    arr.forEach(element => {
        temp = temp + element;
    });

    // let newArr = arr.reduce((pre, elements)=>{
    //     pre+= elements;
    //     return pre;
    // },0)
    
    return temp;
}

sum1 = addUp1();

console.log(`Second sum ${sum1}`)
console.dir(addUp());
console.dir(addUp1());