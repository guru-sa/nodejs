function add1(x, y) {
    return x + y;
}

const add2 = (x, y) => {
    return x + y;
};

const add3 = (x, y) => x + y;

const add4 = (x, y) => (x + y);

function not1(x) {
    return !x;
}

const not2 = x => !x;

var relationship1 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function () {
        var that = this; // this = relationship1
        this.friends.forEach(function (friend) {
            // 다른 함수 scope의 this
            console.log(that.name, friend);
        });
    },
};
relationship1.logFriends();

const relationship2 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends() {
        this.friends.forEach(friend => {
            // 상위 scope의 this
            console.log(this.name, friend);
        });
    },
};
relationship2.logFriends();