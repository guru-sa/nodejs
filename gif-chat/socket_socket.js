const SocketIO = require('socket.io');

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    const room = io.of('/room');
    const chat = io.of('/chat');

    room.on('connection', (socket) => {
        console.log('room ���ӽ����̽��� ����');
        socket.on('disconnect', () => {
            console.log('room ���ӽ����̽� ���� ����');
        });
    });

    chat.on('connection', (socket) => {
        console.log('chat ���ӽ����̽��� ����');
        const req = socket.request;
        const { headers: { referer } } = req;
        const roomId = referer
            .split('/')[referer.split('/').length - 1]
            .replace(/\?.+/, '');
        socket.join(roomId);

        socket.on('disconnect', () => {
            console.log('chat ���ӽ����̽� ���� ����');
            socket.leave(roomId);
        });
    });
};