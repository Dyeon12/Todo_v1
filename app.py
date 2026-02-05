from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

# 데이터 파일 경로
DATA_FILE = 'todos.json'

def load_todos():
    """투두 데이터 로드"""
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_todos(todos):
    """투두 데이터 저장"""
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(todos, f, ensure_ascii=False, indent=2)

@app.route('/')
def index():
    """메인 페이지"""
    return render_template('index.html')

@app.route('/api/todos', methods=['GET'])
def get_todos():
    """모든 투두 조회"""
    todos = load_todos()
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def create_todo():
    """새 투두 생성"""
    data = request.json
    todos = load_todos()
    
    # 새 ID 생성
    new_id = max([t['id'] for t in todos], default=0) + 1
    
    new_todo = {
        'id': new_id,
        'title': data['title'],
        'date': data['date'],
        'completed': False,
        'color': data.get('color', '#FFD1DC'),
        'emoji': data.get('emoji', '📝')
    }
    
    todos.append(new_todo)
    save_todos(todos)
    
    return jsonify(new_todo), 201

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    """투두 수정"""
    data = request.json
    todos = load_todos()
    
    for todo in todos:
        if todo['id'] == todo_id:
            todo['title'] = data.get('title', todo['title'])
            todo['date'] = data.get('date', todo['date'])
            todo['completed'] = data.get('completed', todo['completed'])
            todo['color'] = data.get('color', todo['color'])
            todo['emoji'] = data.get('emoji', todo.get('emoji', '📝'))
            save_todos(todos)
            return jsonify(todo)
    
    return jsonify({'error': 'Todo not found'}), 404

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """투두 삭제"""
    todos = load_todos()
    todos = [t for t in todos if t['id'] != todo_id]
    save_todos(todos)
    
    return jsonify({'success': True})

if __name__ == '__main__':
    # 초기 데이터 파일 생성
    if not os.path.exists(DATA_FILE):
        save_todos([])
    
    print("🚀 ToDo 앱이 실행되었습니다!")
    print("📍 브라우저에서 http://localhost:5000 을 열어주세요.")
    app.run(debug=True, host='localhost', port=5000)
