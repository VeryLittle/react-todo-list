import React from 'react';

interface Todo {
  name: string;
  isCompleted: boolean;
  onChangeName: (name: string) => void,
  onChangeStatus: (status: boolean) => void,
  onRemove: () => void,
}

const TodoItem: React.FC<Todo> = ({ name, isCompleted, onChangeName, onChangeStatus, onRemove }) => {
  const [innerName, setInnerName] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);

  function startEdit() {
    setInnerName(name);
    setIsEdit(true);
  }

  function saveName(): void {
    if (innerName === '') return;
    onChangeName(innerName);
    setIsEdit(false);
  }

  return (
    <div>
      <label>
        {isEdit
          ? (<input onChange={(event) => setInnerName(event.target.value)} type="text" value={innerName} />)
          : (<span>{name}</span>)}
        <input
          onChange={(event) => onChangeStatus(event.target.checked)}
          type="checkbox"
          checked={isCompleted}
        />
      </label>
      {isEdit
        ? (<><button onClick={saveName}>Сохранить</button>
          <button onClick={() => setIsEdit(false)}>Отменить</button></>)
        : (<button onClick={startEdit}>Редактировать</button>)}
      <button onClick={onRemove}>Удалить</button>
    </div>
  );
}

export default TodoItem;
