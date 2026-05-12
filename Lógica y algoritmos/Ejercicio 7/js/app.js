const numberList = [287, 654, 92, 543, 789, 123, 456, 678, 321, 890, 
                     234, 567, 432, 765, 198, 876, 345, 654, 987, 210,
                     543, 321, 890, 123, 456, 789, 234, 567, 876, 345,
                     654, 987, 210, 543, 432, 765, 198, 321, 890, 456,
                     789, 234, 567, 876, 345, 654, 987, 210, 543, 123];
                     
function maxNumber(arr) {
    let divide = parseInt(arr.length / 2);
    
    let slice_1 = arr.slice(0, divide);
    let slice_2 = arr.slice(divide);
    
    let max_1 = slice_1[0];
    let max_2 = slice_2[0];
    
    let i = 0;
    
    while (i < slice_1.length) {
        if (slice_1[i] > max_1) {
            max_1 = slice_1[i];
        }
        i++;
    }
    
    i = 0;
    while (i < slice_2.length) {
        if (slice_2[i] > max_2) {
            max_2 = slice_2[i];
        }
        i++;
    }
    return max_1 >= max_2 ? max_1 : max_2;
}

console.log(maxNumber(numberList))
