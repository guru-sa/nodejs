const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside: {
            key: 'value',
        },
    },
};
console.time('��ü �ð�');
console.log('����� �α�');
console.log(string, number, boolean);
console.error('���� �޽���');

console.table([{ name: 'zero', birth: 1989 }, { name: 'hero', birth: 1996 }]);

console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time('�ð� ����');
for (let i = 0; i < 100000; i++) { }
console.timeEnd('�ð� ����');

function b() {
    console.log('���� ��ġ ����');
}
function a() {
    b();
}
a();

console.timeEnd('��ü �ð�');