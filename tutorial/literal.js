/*
 * ES5
 * */
var sayNode = function () {
    console.log('Node')
};
var es = 'ES';
var oldObject = {
    sayJS: function () {
        console.log('JS')
    },
    sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic'; // 외부에서만 동적 속성 선언 가능
oldObject.sayNode();
oldObject.sayJS();
console.log(oldObject.ES6);

/*
 * ES2015
 * */
var newObject = {
    sayJS() { // 객체의 메서드에 함수를 연결할 때 :과 function을 붙이지 않음
        console.log('JS')
    },
    sayNode, // 속성과 변수명이 동일할 경우 생략 가능
    [es + 6]: 'Fantastic', // 내부에서 동적 속성 선언 가능
};
newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);