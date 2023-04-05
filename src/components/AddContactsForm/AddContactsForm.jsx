import { Component } from "react";
import { PropTypes } from 'prop-types';
import css from "./AddContactsForm.module.css"


export default class AddContactsForm extends Component {
	state = {
		name: '',
		number: ''
	}

	handlChange = ({target:{name, value}}) => {
		this.setState({
			[name]: value
		})
	 }

	handlSubmit = (e) => {
		e.preventDefault()

		const {name, number } = this.state;
		const { contacts } = this.props;

		if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
			return alert(`${name} is already in contacts.`);
	  } 

		this.props.onSubmit({
			name: name,
			number: number
		})		

		this.reset();
	 }

	 reset = () => {
		this.setState({
			name: '',
			number: ''
	  })
	 }

	render() {
		return (
			<form className={css.form} onSubmit={this.handlSubmit}>
				<h2 className={css.form_text}>Phonebook</h2>
					<label className="inputLabel" htmlFor="contactName">
						Name
					</label>
					<input
						id="contactName"
						type="text"
						name="name"
						pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
						title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						required
						onChange={this.handlChange}
						value={this.state.name}
					/>
					<label className="inputLabel" htmlFor="contactNumber">
						Number
					</label>
					<input
						id="contactNumber"
						type="tel"
						name="number"
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						required
						onChange={this.handlChange}
						value={this.state.number}
					/>
					<button type='submit' className={css.add_btn}>Add contact</button>
			</form>
		)

	}
}

AddContactsForm.propTypes = {
	contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
};