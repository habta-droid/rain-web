
// my_map = new Map()
// my_map.set("name","habta")
// my_map.set("age", 22)
// my_map.set("pr",{name:"jon",age:54,stuff:"idk"})
// // console.log(my_map.get("pr"));
// let obj=my_map.get("pr");
// console.log(obj.age)
// for (const [key] of my_map) {
//     console.log(`${key}:`);
// }
// my_map.delete("name");
// console.log(my_map.has("name"));
// my_map.set("a", 1);
// my_map.set("b", 2);
// my_map.set("c", 3);
// my_map.set("d", 4);
// my_map.set("e", 5);
// console.log(my_map.get("d"));

// for (const [Key] of my_map) {
//     console.log(`${Key}`);
// }

// for (const value of my_map.values()) {
//     console.log(`${value}`);
// }



arr = [1, 2, 3, 4, 5]
sum = []

for (let i = 4; i >= 0; i--) {

    let partialSum = arr
        .slice(0, i + 1)  
        .reduce((sum, current) => sum + current, 0);
    sum.push(partialSum);
    
    console.log(partialSum); 
}
console.log("answer", sum);