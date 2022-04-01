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
oldObject[es + 6] = 'Fantastic'; // �ܺο����� ���� �Ӽ� ���� ����
oldObject.sayNode();
oldObject.sayJS();
console.log(oldObject.ES6);

/*
 * ES2015
 * */
var newObject = {
    sayJS() { // ��ü�� �޼��忡 �Լ��� ������ �� :�� function�� ������ ����
        console.log('JS')
    },
    sayNode, // �Ӽ��� �������� ������ ��� ���� ����
    [es + 6]: 'Fantastic', // ���ο��� ���� �Ӽ� ���� ����
};
newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);