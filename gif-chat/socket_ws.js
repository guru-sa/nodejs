const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => { // ������ ���� ��
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('���ο� Ŭ���̾�Ʈ ����', ip);
        ws.on('message', (message) => { // Ŭ���̾�Ʈ�κ��� �޽���
            console.log(message.toString());
        });
        ws.on('error', (error) => { // ���� ��
            console.error(error);
        });
        ws.on('close', () => { // ���� ���� ��
            console.log('Ŭ���̾�Ʈ ���� ����', ip);
            clearInterval(ws.interval);
        });

        ws.interval = setInterval(() => { // 3�ʸ��� Ŭ���̾�Ʈ�� �޽��� ����
            if (ws.readyState === ws.OPEN) {
                ws.send('�������� Ŭ���̾�Ʈ�� �޽����� �����ϴ�.');
            }
        }, 3000);
    });
};