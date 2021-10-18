import React, {useState} from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

TodoForm.propTypes = {handlesubmit: PropTypes.func};

function TodoForm({handlesubmit}) {
	const [input, setInput] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		handlesubmit && handlesubmit(input);
		setInput('');
	};
	return (
		<form className='form-control' onSubmit={handleSubmit}>
			<input
				placeholder='add details'
				className='form-input'
				value={input}
				onChange={(e) => setInput(e.target?.value)}
				type='text'
			/>
			<button className='btn-add' type='submit'>
				Add
			</button>
		</form>
	);
}

export default TodoForm;
