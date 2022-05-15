## 語彙範疇(Lexical Scope)

我們將範疇(scope)定義為一組規則，用來規範引擎(engine)如何藉由一個變數(variable)的識別字名稱(identifier name)查找它，並在目前的範疇，或是包含目前範疇的任何巢狀範疇(nested scopes)中找到它

```js
function foo(a) {
  var b = a * 2;

  function bar(c) {
    console.log(a, b, c);
  }

  bar(b * 3);
}

foo(2); // 2, 4, 12
```

---

### 查找(Look-ups)  
範疇的查找只要找到第一個符合的，就會停止動作

---

### 語彙範疇的作弊技巧
- eval
  - eval(..) 能在執行時期(run time)修改一個編寫時期(author-time)的語彙範疇
- with
  - with 通常會被說是一種簡寫方式，讓我們可以對一個物件進行多次特性參考，而不用每次都重複那個物件參考本身

悲觀的來看，如果有 eval(..) 或 with 出現，JS 會進行的那些最佳化動作(performance optimizations) 大部分的會變得沒有意義，所以它乾脆**完全不進行最佳化**


---

### 名詞
物件特性存取規則(object property-access rules)
