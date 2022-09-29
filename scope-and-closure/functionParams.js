let a = 1;

const changeFunctionParam = (a) => {
  a = 2;
  console.log(a);
  a = 3;
  return a;
}

console.log(changeFunctionParam(), a);
