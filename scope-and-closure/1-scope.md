## 何謂範疇(Scope)

原始碼(source code)在執行之前，通常會經歷三個步驟:
1. Tokenizing(語法基本單元化) 與 Lexing(語彙分析)  
將一串字元拆解成有意義的組塊
```js
const a = 1; // const, a, =, 1, ;
```

2. Parsing(剖析、語法分析)
接受由語法的基本單元(tokens)所構成的陣列(array)，並將之轉換為一種元素內嵌的樹狀結構(AST, abstract syntax tree)

3. Code-Generation(產生程式碼的目的)
接受一個 AST 並將之轉為可執行程式碼的過程
```js
const a = 1;
// 實際建立一個叫做 a 的變數(包括保留記憶體等步驟)，然後將一個值儲存到 a 中
```

---

### Compiler (編譯器)  
處理剖析(parsing)與程式碼產生(code-generation)

---

### LHS vs RHS  
RHS: 與單純查找某個變數的值沒什麼兩樣  
LHS: 試著要找出那個變數容器本身，如此才能指定東西給它
