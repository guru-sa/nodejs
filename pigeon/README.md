# Nodejs

npm i express cocokie-parser express-session morgan multer dotenv nunjucks passport passport-local passport-kakao bcrypt 
npm i -D nodemon
# 단위 테스트
npm i -D jest
# 통합 테스트
npm i -D supertest 
# 부하 테스트
npm - -D artillery
npx artillery quick --count 100 -n 50 http://localhost:8001
npx artillery run loadtest.json 

npx sequelize db:create


# 살 붙이기
# 팔로잉 끊기(시퀄라이즈의 destroy 메서드와 라우터 활용)
# 프로필 정보 변경하기(시퀄라이즈의 update 메서드와 라우터 활용)
# 게시글 좋아요 누르기 및 좋아요 취소하기(사용자-게시글 모델 간 N:M관계 정립 후 라이터 활용)
# 게시글 삭제하기(등록자와 현재 로그인한 사용자가 같을 때, 시퀄라이즈의 destroy 메서드와 라우터 활용)
# 매번 데이터베이스를 조회하지 않도록 deserializeUser 캐싱하기(객체 선언 후 객체에 사용자 정보 저장, 객체 안에 캐싱된 값이 있으면 조회)