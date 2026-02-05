// 전역 변수
let currentDate = new Date();
let selectedDate = null;
let todos = [];
let editingTodoId = null;

// API 호출 함수들
async function fetchTodos() {
    const response = await fetch('/api/todos');
    todos = await response.json();
    renderCalendar();
    if (selectedDate) {
        displayTodosForDate(selectedDate);
    }
}

async function createTodo(todoData) {
    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData)
    });
    return await response.json();
}

async function updateTodo(id, todoData) {
    const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData)
    });
    return await response.json();
}

async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
    });
}

// 캘린더 렌더링
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 월 표시
    document.getElementById('currentMonth').textContent = 
        `${year}년 ${month + 1}월`;
    
    // 캘린더 날짜 생성
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    const lastDate = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();
    
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    // 이전 달 날짜
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = createDayElement(
            prevLastDate - i,
            new Date(year, month - 1, prevLastDate - i),
            true
        );
        calendarDays.appendChild(day);
    }
    
    // 현재 달 날짜
    for (let i = 1; i <= lastDate; i++) {
        const date = new Date(year, month, i);
        const day = createDayElement(i, date, false);
        calendarDays.appendChild(day);
    }
    
    // 다음 달 날짜
    const remainingDays = 42 - calendarDays.children.length;
    for (let i = 1; i <= remainingDays; i++) {
        const day = createDayElement(
            i,
            new Date(year, month + 1, i),
            true
        );
        calendarDays.appendChild(day);
    }
}

function createDayElement(dayNumber, date, isOtherMonth) {
    const day = document.createElement('div');
    day.className = 'day';
    
    if (isOtherMonth) {
        day.classList.add('other-month');
    }
    
    // 오늘 날짜 표시
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
        day.classList.add('today');
    }
    
    // 선택된 날짜 표시
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
        day.classList.add('selected');
    }
    
    const dayNumberDiv = document.createElement('div');
    dayNumberDiv.className = 'day-number';
    dayNumberDiv.textContent = dayNumber;
    day.appendChild(dayNumberDiv);
    
    // 해당 날짜의 투두 표시
    const dateStr = formatDate(date);
    const dayTodos = todos.filter(t => t.date === dateStr);
    
    if (dayTodos.length > 0) {
        const todosContainer = document.createElement('div');
        todosContainer.className = 'day-todos';
        
        dayTodos.slice(0, 3).forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = 'day-todo-item';
            todoItem.style.background = todo.color;
            todoItem.textContent = `${todo.emoji || '📝'} ${todo.title}`;
            if (todo.completed) {
                todoItem.classList.add('completed');
            }
            todosContainer.appendChild(todoItem);
        });
        
        day.appendChild(todosContainer);
    }
    
    // 클릭 이벤트
    day.addEventListener('click', () => {
        selectedDate = date;
        renderCalendar();
        displayTodosForDate(date);
    });
    
    // 더블클릭 이벤트 - 팝업 모달 열기
    day.addEventListener('dblclick', () => {
        selectedDate = date;
        openDateTodoModal(date);
    });
    
    return day;
}

function displayTodosForDate(date) {
    const dateStr = formatDate(date);
    const dayTodos = todos.filter(t => t.date === dateStr);
    
    const title = document.getElementById('selectedDateTitle');
    title.textContent = `${date.getMonth() + 1}월 ${date.getDate()}일의 투두`;
    
    const todoList = document.getElementById('todoList');
    
    if (dayTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">이 날짜에는 투두가 없습니다</div>';
        return;
    }
    
    todoList.innerHTML = '';
    dayTodos.forEach(todo => {
        const todoItem = createTodoElement(todo);
        todoList.appendChild(todoItem);
    });
}

function createTodoElement(todo) {
    const item = document.createElement('div');
    item.className = 'todo-item';
    item.style.borderLeftColor = todo.color;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', async () => {
        await updateTodo(todo.id, { ...todo, completed: checkbox.checked });
        await fetchTodos();
        // 날짜 팝업이 열려있으면 업데이트
        if (document.getElementById('dateTodoModal').style.display === 'block' && selectedDate) {
            openDateTodoModal(selectedDate);
        }
    });
    
    const content = document.createElement('div');
    content.className = 'todo-content';
    
    const title = document.createElement('div');
    title.className = 'todo-title';
    if (todo.completed) title.classList.add('completed');
    title.textContent = `${todo.emoji || '📝'} ${todo.title}`;
    
    content.appendChild(title);
    
    const actions = document.createElement('div');
    actions.className = 'todo-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.textContent = '수정';
    editBtn.addEventListener('click', () => {
        // 날짜 팝업이 열려있으면 닫기
        if (document.getElementById('dateTodoModal').style.display === 'block') {
            closeDateTodoModal();
        }
        openEditModal(todo);
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', async () => {
        if (confirm('정말 삭제하시겠습니까?')) {
            await deleteTodo(todo.id);
            await fetchTodos();
            // 날짜 팝업이 열려있으면 업데이트
            if (document.getElementById('dateTodoModal').style.display === 'block' && selectedDate) {
                openDateTodoModal(selectedDate);
            }
        }
    });
    
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    item.appendChild(checkbox);
    item.appendChild(content);
    item.appendChild(actions);
    
    return item;
}

// 모달 관련 함수
function openAddModal() {
    editingTodoId = null;
    document.getElementById('modalTitle').textContent = 'Add ToDo';
    document.getElementById('todoTitle').value = '';
    document.getElementById('todoDate').value = selectedDate ? 
        formatDate(selectedDate) : formatDate(new Date());
    document.getElementById('todoColor').value = '#FFD1DC';
    document.getElementById('todoEmoji').value = '📝';
    
    // 색상 선택 초기화
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.color === '#FFD1DC') {
            option.classList.add('selected');
        }
    });
    
    // 이모지 선택 초기화
    document.querySelectorAll('.emoji-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.emoji === '📝') {
            option.classList.add('selected');
        }
    });
    
    document.getElementById('todoModal').style.display = 'block';
}

function openEditModal(todo) {
    editingTodoId = todo.id;
    document.getElementById('modalTitle').textContent = '투두 수정';
    document.getElementById('todoTitle').value = todo.title;
    document.getElementById('todoDate').value = todo.date;
    document.getElementById('todoColor').value = todo.color;
    document.getElementById('todoEmoji').value = todo.emoji || '📝';
    
    // 색상 선택 표시
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.color === todo.color) {
            option.classList.add('selected');
        }
    });
    
    // 이모지 선택 표시
    document.querySelectorAll('.emoji-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.emoji === (todo.emoji || '📝')) {
            option.classList.add('selected');
        }
    });
    
    document.getElementById('todoModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('todoModal').style.display = 'none';
}

// 날짜별 투두 팝업 모달
function openDateTodoModal(date) {
    const dateStr = formatDate(date);
    const dayTodos = todos.filter(t => t.date === dateStr);
    
    document.getElementById('dateModalTitle').textContent = 
        `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    
    const todoList = document.getElementById('dateModalTodoList');
    
    if (dayTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">이 날짜에는 투두가 없습니다</div>';
    } else {
        todoList.innerHTML = '';
        dayTodos.forEach(todo => {
            const todoItem = createTodoElement(todo);
            todoList.appendChild(todoItem);
        });
    }
    
    document.getElementById('dateTodoModal').style.display = 'block';
}

function closeDateTodoModal() {
    document.getElementById('dateTodoModal').style.display = 'none';
    renderCalendar();
    if (selectedDate) {
        displayTodosForDate(selectedDate);
    }
}

// 유틸리티 함수
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // 초기 로드
    fetchTodos();
    
    // 오늘 날짜 선택
    selectedDate = new Date();
    displayTodosForDate(selectedDate);
    
    // 월 네비게이션
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // 투두 추가 버튼
    document.getElementById('addTodoBtn').addEventListener('click', openAddModal);
    
    // 모달 닫기
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    
    document.querySelector('.close-date-modal').addEventListener('click', closeDateTodoModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('todoModal')) {
            closeModal();
        }
        if (e.target === document.getElementById('dateTodoModal')) {
            closeDateTodoModal();
        }
    });
    
    // 날짜 팝업에서 투두 추가 버튼
    document.getElementById('addTodoInModal').addEventListener('click', () => {
        closeDateTodoModal();
        openAddModal();
    });
    
    // 색상 선택
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(o => {
                o.classList.remove('selected');
            });
            option.classList.add('selected');
            document.getElementById('todoColor').value = option.dataset.color;
        });
    });
    
    // 이모지 선택
    document.querySelectorAll('.emoji-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.emoji-option').forEach(o => {
                o.classList.remove('selected');
            });
            option.classList.add('selected');
            document.getElementById('todoEmoji').value = option.dataset.emoji;
        });
    });
    
    // 폼 제출
    document.getElementById('todoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const todoData = {
            title: document.getElementById('todoTitle').value,
            date: document.getElementById('todoDate').value,
            color: document.getElementById('todoColor').value,
            emoji: document.getElementById('todoEmoji').value
        };
        
        if (editingTodoId) {
            await updateTodo(editingTodoId, todoData);
        } else {
            await createTodo(todoData);
        }
        
        await fetchTodos();
        closeModal();
        
        // 날짜 팝업이 열려있었다면 다시 열기
        if (selectedDate) {
            openDateTodoModal(selectedDate);
        }
    });
});
