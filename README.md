<div align="center">

# 📅 ToDo Calendar App

### 파스텔톤의 아름다운 디자인으로 만든 할 일 관리 캘린더

[![Flask](https://img.shields.io/badge/Flask-2.0+-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.7+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## ✨ 주요 기능

<table>
<tr>
<td>

### 📆 캘린더 뷰
날짜별로 할 일을 한눈에 관리할 수 있는 직관적인 캘린더 인터페이스

</td>
<td>

### 🎨 컬러 커스터마이징
6가지 파스텔 색상으로 할 일을 구분하여 시각적으로 관리

</td>
</tr>
<tr>
<td>

### ✅ 완료 체크
간편한 체크박스로 완료한 할 일을 표시하고 진행 상황 추적

</td>
<td>

### 📱 반응형 디자인
모바일, 태블릿, 데스크톱 모든 기기에서 완벽하게 작동

</td>
</tr>
</table>

## 🚀 빠른 시작

### 사전 요구사항
- Python 3.7 이상
- pip (Python 패키지 관리자)

### 설치 및 실행

1️⃣ **저장소 클론**
```bash
git clone https://github.com/your-username/test_todo.git
cd test_todo
```

2️⃣ **의존성 설치**
```bash
pip install flask
```

3️⃣ **애플리케이션 실행**
```bash
python app.py
```

4️⃣ **브라우저에서 접속**
```
http://localhost:5000
```

서버가 정상적으로 실행되면 다음 메시지가 표시됩니다:
```
🚀 ToDo 앱이 실행되었습니다!
📍 브라우저에서 http://localhost:5000 을 열어주세요.
```

## 🛠️ 기술 스택

### Backend
- **Flask** - 경량 Python 웹 프레임워크
- **Python** - 서버 사이드 로직

### Frontend
- **HTML5** - 마크업
- **CSS3** - 스타일링 (파스텔 테마)
- **JavaScript (Vanilla)** - 클라이언트 사이드 로직

### 데이터 저장
- **JSON** - 파일 기반 데이터 저장소

## 📁 프로젝트 구조

```
test_todo/
├── 📄 app.py                 # Flask 백엔드 서버 (RESTful API)
├── 📄 README.md              # 프로젝트 문서
├── 📄 todos.json             # 데이터 저장 파일 (자동 생성)
├── 📁 templates/
│   └── 📄 index.html         # 메인 HTML 페이지
└── 📁 static/
    ├── 📄 style.css          # 파스텔 테마 스타일시트
    └── 📄 script.js          # 프론트엔드 로직 및 API 통신
```

## 🔌 API 엔드포인트

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todos` | 모든 할 일 목록 조회 |
| `POST` | `/api/todos` | 새로운 할 일 생성 |
| `PUT` | `/api/todos/<id>` | 특정 할 일 수정 |
| `DELETE` | `/api/todos/<id>` | 특정 할 일 삭제 |

### 요청 예시

**새 할 일 생성**
```json
POST /api/todos
{
  "title": "프로젝트 완료하기",
  "date": "2026-02-05",
  "color": "#FFD1DC",
  "emoji": "🚀"
}
```

## 🎨 색상 팔레트

| Color | Hex Code | Use Case |
|-------|----------|----------|
| 🩷 Pink | `#FFD1DC` | 일반 업무 |
| 💜 Lavender | `#E0BBE4` | 개인 일정 |
| 💙 Blue | `#C1E1EC` | 중요 업무 |
| 💚 Mint | `#B4E7CE` | 학습/개발 |
| 💛 Yellow | `#FFEAA7` | 알림/리마인더 |
| 🧡 Peach | `#FFCCCB` | 긴급 업무 |

## 📝 사용 방법

1. **할 일 추가**: 날짜를 선택하고 텍스트 입력 후 색상과 이모지를 선택
2. **완료 표시**: 체크박스를 클릭하여 완료 상태 토글
3. **수정**: 할 일을 클릭하여 내용 수정
4. **삭제**: 삭제 버튼을 클릭하여 할 일 제거

## 🤝 기여하기

기여는 언제나 환영합니다! 다음 단계를 따라주세요:

1. 이 저장소를 Fork 합니다
2. Feature 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 Commit 합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📧 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 Issue를 등록해주세요!

---

<div align="center">

**⭐ 이 프로젝트가 유용하다면 Star를 눌러주세요! ⭐**

Made with ❤️ by [Your Name]

</div>
