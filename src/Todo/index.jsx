import React, {useEffect, useState} from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import style from './style.scss';

Todo.propTypes = {};

function Todo(props) {
	const [checkToggle, setCheckToggle] = useState();
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem('todos');

		if (savedTodos) {
			return JSON.parse(savedTodos);
		} else {
			return [];
		}
	});
	const [listData, setListData] = useState();

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const handleSubmit = (evt) => {
		evt !== '' &&
			setTodos([
				...todos,
				{
					id: todos.length,
					value: evt,
					status: 'active',
					isChecked: false,
				},
			]);
	};
	useEffect(() => {
		if (listData !== undefined) {
			setTodos(listData);
		}
	}, [listData]);

	const handletoggle = (e) => {
		setCheckToggle(e);
	};

	return (
		<div className='todo-features'>
			<h2>#todo</h2>
			<TodoList
				handletoggle={handletoggle}
				status={setListData}
				todos={todos}
			/>
			{checkToggle === 3 ? '' : <TodoForm handlesubmit={handleSubmit} />}
		</div>
	);
}

export default Todo;
