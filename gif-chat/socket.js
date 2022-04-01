const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    const room = io.of('/room');
    const chat = io.of('/chat');

    io.use((socket, next) => {
        cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
        sessionMiddleware(socket.request, socket.request.res, next);
    });

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
        socket.to(roomId).emit('join', {
            user: 'system',
            chat: `${req.session.color}���� �����ϼ̽��ϴ�.`,
        });

        socket.on('disconnect', () => {
            console.log('chat ���ӽ����̽� ���� ����');
            socket.leave(roomId);
            const currentRoom = socket.adapter.rooms[roomId];
            const userCount = currentRoom ? currentRoom.length : 0;
            if (userCount === 0) { // ������ 0���̸� �� ����
                const signedCookie = cookie.sign(req.signedCookies['connect.sid'], process.env.COOKIE_SECRET);
                const connectSID = `${signedCookie}`;
                axios.delete(`http://localhost:8005/room/${roomId}`, {
                    headers: {
                        Cookie: `connect.sid=s%3A${connectSID}`
                    }
                })
                    .then(() => {
                        console.log('�� ���� ��û ����');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                socket.to(roomId).emit('exit', {
                    user: 'system',
                    chat: `${req.session.color}���� �����ϼ̽��ϴ�.`,
                });
            }
        });
        /* only web socket */
        // socket.on('chat', (data) => {
        //    socket.to(data.room).emit(data);
        // });
    });
};