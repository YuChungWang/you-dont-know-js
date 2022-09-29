## this or That?

this 不是在開發編輯時期的繫結(author-time binding)，而是執行時期的繫結(runtime binding)
this 繫結與函式是在何處宣告的無關，而是完全取決於函式被呼叫的方式

一個函式在被調用時，會有一筆記錄，可稱作是執行情境(execution context)，此筆記錄含有的資訊包含該函式是從何處被呼叫的(call stack)，如何被調用的，傳入了什麼參數(parameters)
此記錄的特性(properties)之一就是 `this` 的參考

this 不是對於函式自身(function itself)的一個參考
this 也不是指向函式語彙範疇(lexical scope)的參考

this 是函示被調用時所進行的一個繫結(binding)，而它所參考的到底是什麼，完全取決於該函式被呼叫的呼叫地點(call-site)
