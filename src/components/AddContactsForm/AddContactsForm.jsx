import { useState } from "react";
import { PropTypes } from 'prop-types';
import css from "./AddContactsForm.module.css";


const AddContactsForm = ({contacts, onSubmit}) => {
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');

	const handlChange = event => {
		const {name, value} = event.target;

		switch (name) {
			case 'name' : 
			  setName(value);
			  break;

			case 'number' :
				setNumber(value);
				break;
				
			default:
				return;		
		}
	};

	const handlSubmit = (e) => {
		e.preventDefault()

		if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
			return alert(`${name} is already in contacts.`);
	  } 

		onSubmit({name,number})		
		reset();
	 }

	const reset = () => {
		setName('');
		setNumber('');		
	 }

	return (
		<form className={css.form} onSubmit={handlSubmit}>
			<h2 className={css.form_text}>Phonebook</h2>
				<label className="inputLabel" htmlFor="contactName">
					Name
				</label>
				<input
					id="contactName"
					type="text"
					name="name"
					// pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
					onChange={handlChange}
					value={name}
				/>
				<label className="inputLabel" htmlFor="contactNumber">
					Number
				</label>
				<input
					id="contactNumber"
					type="tel"
					name="number"
					// pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					required
					onChange={handlChange}
					value={number}
				/>
				<button type='submit' className={css.add_btn}>Add contact</button>
		</form>
	)

};

export default AddContactsForm;

AddContactsForm.propTypes = {
	contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
};