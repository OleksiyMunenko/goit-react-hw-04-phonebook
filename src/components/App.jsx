import { useEffect, useState } from "react";
import { nanoid } from 'nanoid';


import  AddContactsForm  from "./AddContactsForm/AddContactsForm";
import ContactsFilter from "./ContactsFilter/CotactsFilter";
import {ContactsList} from "./ContactsList/ContactsList";
import {ContactsItem} from "./ContactsItem/ContactsItem";


const CONTACTS_KEY = 'contacts';

export const App = () => {
	const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem(CONTACTS_KEY)) ??
	[
	  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
	  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
	  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
	  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
	]
	);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts))
	}, [contacts]);

	const createContact = ({name, number}) => {
		const contact =  {
			id: nanoid(),
			name,
			number
		}
		setContacts([contact, ...contacts]);
	};

	const removeContact = (id) => {
		setContacts(prevState => contacts.filter(contact => contact.id !== id))
	
	};

	const handelChangeFilter = (e) => {
		setFilter(e.target.value)
	};

	const getFilteredContacts = () => {
		const normalizedFilter = filter.toLowerCase();
		return contacts.filter(contact =>
		  contact.name.toLowerCase().includes(normalizedFilter)
		)
	};
  
	const visibleContacts = getFilteredContacts();

	return (
		<div className="phonebook">
			
			<AddContactsForm contacts={contacts} onSubmit={createContact}/>
			
			<h2>Contacts</h2>

			<ContactsFilter filter={filter} onChangeFilter={handelChangeFilter}/>
			<ContactsList>
				<ContactsItem contacts={visibleContacts} onRemoveClick={removeContact}/>
			</ContactsList>
		</div>
	)
}

