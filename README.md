# ToDo 앱

파스텔톤의 깔끔한 디자인으로 만든 투두 리스트 캘린더입니다.

## 실행 방법

1. Flask 설치 (아직 설치하지 않았다면):
```bash
pip install flask
```

2. 앱 실행:
```bash
python app.py
```

3. 브라우저에서 접속:
```
http://localhost:5000
```

## 기능

- 📅 캘린더 형식으로 투두 관리
- ➕ 투두 추가/수정/삭제
- ✅ 완료 체크박스
- 🎨 6가지 파스텔 색상 선택
- 📱 반응형 디자인

## 파일 구조

- `app.py` - Flask 백엔드 서버
- `templates/index.html` - 메인 페이지
- `static/style.css` - 스타일시트
- `static/script.js` - 프론트엔드 로직
- `todos.json` - 데이터 저장 파일 (자동 생성)
