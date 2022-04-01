const condition = true;
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('����');
    } else {
        reject('����');
    }
});

promise
    .then((message) => {
        return new Promise((resolve, reject) => {
            resolve(message);
        });
    })
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        console.log('������');
    });

const promise1 = Promise.resolve('����');
const promise2 = Promise.reject('����');

Promise.all([promise1, promise2])
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.error(error);
    });
/*
 * callback
 * */
function findAndSaveUser(Users) {
    Users.findOne({}, (err, user) => {
        if (err) {
            return console.error(err);
        }
        user.name = 'zero';
        user.save((err) => {
            if (err) {
                return console.error(err);
            }
            Users.findOne({ gender: 'm' }, (err, user) => {

            });
        });
    });
}

/*
 * promise
 * */
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {

        })
        .catch(err => {
            console.error(err);
        })
}
