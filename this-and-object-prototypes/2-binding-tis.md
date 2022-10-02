## this 現在全都說得通了

要了解 this 繫結，得先理解所謂的呼叫地點(call-site): 一個程式碼中一個函式被呼叫的位置

1. 預設繫結  
foo() 的呼叫是普通、未經修飾的函式參考，套用的是`預約繫結`
```js
function foo() {
  console.log(this.a);
}

var a = 2;
foo(); // 2
```

如果是在`strict mode`中，全域物件就不會是`預約繫結`，this會為undefined
```js
function foo() {
  "use strict";
  console.log(this.a);
}

var a = 2;
foo(); // TypeError: `this` is `undefined`
```

2. 隱含的繫結  
呼叫地點是否有一個情境物件(context object)  
可以說 obj 物件在函式被呼叫的時候「擁有(owns)」或「包含(contains)」那個函式參考
```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

obj.foo(); // 2
```

在一個物件特性參考的串鏈(object property reference chain)，只有最終層才對呼叫地點有意義
```js
function foo() {
  console.log(this.a);
}

var obj1 = {
  a: 2,
  foo: foo,
};

var obj2 = {
  a: 42,
  foo: foo,
};

obj1.obj2.foo(); // 42
```

隱含地失去  
儘管 bar 似乎是對 obj.foo 的一個參考，但實際上它僅是對 foo 本身的另一個參考，重要的是呼叫地點  
呼叫地點是 bar()，它是一個普通未經修飾的呼叫，套用了`預設繫結`規則
```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

var bar = obj.foo;

var a = 'oops, global';

bar(); // 'oops, global'
```
考慮到 callback 函式時
```js
function foo() {
  console.log(this.a);
}

function callback(fn) {
  fn(); // call-site!
}

var obj = {
  a: 2,
  foo: foo,
};

var a = 'oops, global';

callback(obj.foo); // 'oops, global'
```
如果 callback 是內建的，結果沒有差別
```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

var a = 'oops, global';

setTimeout(obj.foo, 100); // 'oops, global'
```

常見的情況就是，callback 函式會失去它們的 this 繫結  
(原因: 參數的傳遞(parameter passing)只是一種隱含的指定(implicit assignment))

1. 明確的繫結  
   如果不想在該物件上放上一個特性函式參考，而想要迫使一個函式呼叫使用特定的物件作為 this 繫結，那該怎麼辦呢?

   JS 函式所具備的 call, apply, bind  
   直接指出你想要的 this 是什麼，稱為`明確的繫結(explicit binding)`

藉由`明確的繫結`調用foo，讓我們強制把 this 設為 obj
```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

foo.call(obj); // 2
```

如果傳入的是基本型別(primitive value, string, number, boolean)，基本型別值就會被包裹在它的物件形式(object form, new String(...), new Number(...), new Boolean(...))中，這通常被稱作為「封裝(boxing)」

4. new 繫結
   當一個函式前面帶有 new 被調用時，也被稱作建構器呼叫(constructor call)，下面的事情會自動發生:  
   1. 會有一個無中生有的物件被建構出來
   2. 這個新建構的物件會帶有[[Prototype]]連結
   3. 這個新建構的物件會被設為那個函式呼叫的 this 繫結
   4. 除非該函式回傳了它自己提供的替代物件，不然這個以 new 調用的函式呼叫會自動回傳這個新建的的物件

```js
function foo() {
  console.log(this.a);
}

const bar = new foo(2);

console.log(bar.a); // 2
```
---
一般的函式都會遵照前面涵蓋的那四個規則而行，不過 ES6 引進了箭頭函式(arrow function)  
它不使用那四個標準的 this 規則，this 繫結取自包含它的範疇(enclosing scope, 函式或全域)

foo() 的 this 繫結到了 obj1，箭頭函式的這種語彙繫結(lexical binding)無法被覆寫
```js
function foo() {
  return (a) => {
    console.log(this.a);
  };
}

var obj1 = {
  a: 2,
};

var obj2 = {
  a: 3,
}

var bar = foo.call(obj1);
bar.call(obj2); // 2, not 3
```
最常見的情況可能用 callback，如事件處理器(event handler)或計時器(timers)

注意，箭頭函式及 self 的寫法，基本上是逃離了 this 而非理解並擁抱它
```js
function foo() {
  setTimeout(() => {
    // 這裡的 this 語彙上繼承自 foo()
    console.log(this.a);
  }, 100);
}

var obj = {
  a: 2,
};

foo.call(obj); // 2
```
or
```js
function foo() {
  var self = this; // 語彙上捕捉了 this
  setTimeout(function() {
    console.log(self.a);
  }, 100);
}

var obj = {
  a: 2,
};

foo.call(obj); // 2
```