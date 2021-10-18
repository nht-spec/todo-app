import React, {useEffect, useState} from 'react';
import style from './style.scss';

function TodoList({todos, handleDel, status, handletoggle}) {
	const [toggleChange, setToggleChange] = useState(1);
	const [checkDelAll, setCheckDelAll] = useState(false);
	const [datas, setDatas] = useState([]);
	const [todo, setTodo] = useState([]);
	const [listData, setListData] = useState();

	if (status) {
		status(listData?.list);
	}
	if (handleDel) {
		listData?.list.map((x) => x.id);
	}

	useEffect(() => {
		setDatas(todos);
		setListData({
			list: todos,
		});
	}, [todos]);

	const handleTogge = (index) => {
		setToggleChange(index);
	};

	useEffect(() => {
		const check = datas?.filter((x) => x.isChecked !== false);
		check?.length !== 0 ? setCheckDelAll(true) : setCheckDelAll(false);
	}, [datas]);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todo));
	}, [todo]);

	const handleDelete = (evt) => {
		const id = Number.parseInt(evt.target.value);
		const newList = listData.list.filter((item) => item.id !== id);
		const dellAll = listData.list.filter((item) => {
			let id = '';
			if (item.isChecked === true) {
				id = item.id;
			}
			return item.id !== id;
		});

		setListData({...listData, list: newList});
		if (evt.target.id) {
			setListData({...listData, list: dellAll});
		}
	};

	useEffect(() => {
		setDatas(listData?.list);
		setTodo(listData?.list);
	}, [listData]);

	if (handletoggle) {
		handletoggle(toggleChange);
	}
	return (
		<div className='container'>
			<div className='tabs-control'>
				<button
					className={toggleChange === 1 ? 'tabs active-tabs' : 'tabs'}
					onClick={() => handleTogge(1)}
				>
					All
				</button>
				<button
					className={toggleChange === 2 ? 'tabs active-tabs' : 'tabs'}
					onClick={() => handleTogge(2)}
				>
					Active
				</button>
				<button
					className={toggleChange === 3 ? 'tabs active-tabs' : 'tabs'}
					onClick={() => handleTogge(3)}
				>
					Complete
				</button>
			</div>
			<div className='boder-bottom'></div>
			<div className='content-tab'>
				<div
					className={toggleChange === 1 ? 'content  active-content' : 'content'}
				>
					{datas?.map((data, index) => (
						<div className='checked-control' key={index}>
							<input
								className='checked-box'
								type='checkbox'
								id={data.id}
								checked={data.isChecked}
								onChange={(e) => {
									data.isChecked = e.target.checked;
									setDatas([...datas]);
									setTodo([...datas]);
								}}
							/>
							<span id={data.id} className='check-box'>
								{data.value}
							</span>
						</div>
					))}
				</div>
				<div
					className={toggleChange === 2 ? 'content  active-content' : 'content'}
				>
					{datas?.map(
						(data, index) =>
							data.isChecked === false && (
								<div className='checked-control' key={index}>
									<input
										className='checked-box'
										type='checkbox'
										id={data.id}
										checked={data.isChecked}
										onChange={(e) => {
											data.isChecked = e.target.checked;
											setDatas([...datas]);
											setTodo([...datas]);
										}}
									/>
									<span id={data.id} className='check-box'>
										{data.value}
									</span>
								</div>
							)
					)}
				</div>
			</div>

			<div
				className={
					toggleChange === 3 ? 'toggle-3 content  active-content' : 'content'
				}
			>
				{datas?.map(
					(data, index) =>
						data.isChecked === true && (
							<div className='checked-control' key={index}>
								<input
									className='checked-box'
									type='checkbox'
									id={data.id}
									checked={data.isChecked}
									onChange={(e) => {
										data.isChecked = e.target.checked;
										setDatas([...datas]);
										setTodo([...datas]);
									}}
								/>
								<div className='info-control'>
									<span id={data.id} className='check-box'>
										{data.value}
									</span>
									<div className='del-control'>
										<button
											className='btn-del material-icons'
											value={data.id}
											onClick={handleDelete}
										>
											delete_outline
										</button>
									</div>
								</div>
							</div>
						)
				)}
				{checkDelAll === true && (
					<button className='material-icons' id='delAll' onClick={handleDelete}>
						<span className='btn-all material-icons'>delete_outline </span> delete
						all
					</button>
				)}
				{/* <button className='material-icons' id='delAll' onClick={handleDelete}>
					<span className='btn-all material-icons'>delete_outline </span> delete
					all
				</button> */}
			</div>
		</div>
	);
}

export default TodoList;
