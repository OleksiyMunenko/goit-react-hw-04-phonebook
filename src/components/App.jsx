import { Component } from "react";
import { nanoid } from 'nanoid';


import  AddContactsForm  from "./AddContactsForm/AddContactsForm";
import ContactsFilter from "./ContactsFilter/CotactsFilter";
import {ContactsList} from "./ContactsList/ContactsList";
import {ContactsItem} from "./ContactsItem/ContactsItem";


const CONTACTS_KEY = 'contacts';
export class App extends Component {
	state = {
		contacts: [
			{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
			{id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
			{id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
			{id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
		],
		filter: ''
	 }


	 componentDidMount() {
		const readContacts = localStorage.getItem(CONTACTS_KEY);
		const passedContacts = JSON.parse(readContacts)

		if (passedContacts) {
			this.setState({contacts: passedContacts})
		}
	 }

	componentDidUpdate(prevProps, prevState) {
		if (prevState.contacts !== this.state.contacts) {
			localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts))
		 }
	}

	 createContact = ({name, number}) => {
		const contact =  {
			id: nanoid(),
			name,
			number
		}
		this.setState(prevState => ({			
			contacts: [contact, ...prevState.contacts]
		}))
	 }


	 onChangeFilter = ({target:{name, value}}) => {
		this.setState({
			[name]: value
		})
	 }
	 
	 removeContact = (id) => {
		this.setState({
		  contacts: this.state.contacts.filter(contact => contact.id !== id),
		})
	 }

	 render() {

		const normalizedFilter = this.state.filter.toLowerCase();
		const visibleContacts = this.state.contacts.filter(contact =>
		  contact.name.toLowerCase().includes(normalizedFilter))
		

		return (
			<div className="phonebook">
				
				<AddContactsForm contacts={this.state.contacts} onSubmit={this.createContact}/>
				
				<h2>Contacts</h2>

				<ContactsFilter filter={this.state.filter} onChangeFilter={this.onChangeFilter}/>
				<ContactsList>
					<ContactsItem contacts={visibleContacts} onRemoveClick={this.removeContact}/>
				</ContactsList>
			</div>
		)		
	 }
}
