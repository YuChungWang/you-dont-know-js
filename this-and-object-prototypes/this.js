// Example 1:

function identify() {
  return this.name.toUpperCase();
}

const me = {
  name: 'Charlie'
}

console.log(identify.call(me)); // CHARLIE

// ---------------------------------------------------------------------------
// Example 2:

function foo(num) {
  console.log(`foo: ${num}`);

  this.count += 1;
  // approach 1: foo.count += 1; (avoid this)
}

foo.count = 0;

for (let i = 0; i < 10; i++) {
  foo(i);
  // approach 2: forced `this` refer to function object foo
  // foo.call(foo, i); 
}

console.log(foo.count); // 0

// ---------------------------------------------------------------------------
// Example 3:

function bar() {
  const a = 2;
  // console.log(this);
  this.bar2(); // wrong!
  // bar2(); // 直接進行語彙參考 lexical reference
}

function bar2() {
  console.log(a);
}

bar();
