# Nodejs

npm i express cocokie-parser cookie-signature express-session morgan dotenv nunjucks socket.io@2 mongoose multer axios color-hash
npm i -D nodemon


# memo

# 특정인에게 메시지 보내기
# socket.to(socket.id).emit(event, data);
# 나를 제외한 모두에게 메시지 보내기
# socket.broadcast.emit(event, data);
# socket.broadcast.to(방 아이디).emit(event, data);

# 채팅방에 현재 참여자 수나 목록 표시하기(join, exit 이벤트에 socket.adapter.rooms에 들어 있는 참여자 목록 정보를 같이 보내기)
# 시스템 메시지까지 DB에 저장하기(입장용, 퇴장용 라우터를 새로 만들어 라우터에서 DB와 웹 소켓 처리하기)
# 채팅방에서 한 사람에게 귓속말 보내기(화면을 만들고 socket.to(소켓 아이디) 메서드 사용하기)
# 방장 기능 구현하기(방에 방장 정보를 저장한 후 방장이 나갔을 때는 방장을 위임하는 기능 추가하기)
# 강퇴 기능 구현하기(강퇴 소켓 이벤트 추가하기)