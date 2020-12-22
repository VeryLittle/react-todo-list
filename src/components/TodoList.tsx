import React from 'react';
import TodoItem from './TodoItem'
import { uuid, updateArrayState } from "../utils";

export interface Todo {
  id: string;
  name: string;
  isCompleted: boolean;
}

const TodoList: React.FC = () => {
  const [todoName, setTodoName] = React.useState('');

  const [todos, setTodos] = React.useState<Todo[]>([]);

  function addItem() {
    if (todoName === '') return;
    setTodos(todos.concat({
      id: uuid(),
      name: todoName,
      isCompleted: false,
    }));
    setTodoName('');
  }

  return (
    <>
      <div>Todo list</div>
      <div>
        <input
          onChange={(event) => setTodoName(event.target.value)}
          value={todoName}
          type="text"
          placeholder="Введите название задачи"
        />
        <button onClick={addItem}>Добавить</button>
      </div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          name={todo.name}
          isCompleted={todo.isCompleted}
          onChangeName={(name) => setTodos(updateArrayState(todos, [{ ...todo, name }], 'id'))}
          onChangeStatus={(isCompleted) => setTodos(updateArrayState(todos, [{ ...todo, isCompleted }], 'id'))}
          onRemove={() => setTodos(todos.filter((t) => todo.id !== t.id))}
        />
      ))}
    </>
  );
}

export default TodoList;
