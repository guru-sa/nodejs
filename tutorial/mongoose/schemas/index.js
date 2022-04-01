const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://name:password@localhost:27017/admin', {
        dbName: 'nodejs',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log('success');
        }
    });
};
mongoose.connection.on('error', (error) => {
    console.error(error);
});
mongoose.connection.on('disconnected', () => {
    console.error('MongoDB is disconnected');
    connect();
});

module.exports = connect;