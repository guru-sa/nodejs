# Nodejs

npm i express cocokie-parser express-session morgan multer dotenv nunjucks passport passport-local passport-kakao bcrypt 
npm i -D nodemon
# ���� �׽�Ʈ
npm i -D jest
# ���� �׽�Ʈ
npm i -D supertest 
# ���� �׽�Ʈ
npm - -D artillery
npx artillery quick --count 100 -n 50 http://localhost:8001
npx artillery run loadtest.json 

npx sequelize db:create


# �� ���̱�
# �ȷ��� ����(������������ destroy �޼���� ����� Ȱ��)
# ������ ���� �����ϱ�(������������ update �޼���� ����� Ȱ��)
# �Խñ� ���ƿ� ������ �� ���ƿ� ����ϱ�(�����-�Խñ� �� �� N:M���� ���� �� ������ Ȱ��)
# �Խñ� �����ϱ�(����ڿ� ���� �α����� ����ڰ� ���� ��, ������������ destroy �޼���� ����� Ȱ��)
# �Ź� �����ͺ��̽��� ��ȸ���� �ʵ��� deserializeUser ĳ���ϱ�(��ü ���� �� ��ü�� ����� ���� ����, ��ü �ȿ� ĳ�̵� ���� ������ ��ȸ)