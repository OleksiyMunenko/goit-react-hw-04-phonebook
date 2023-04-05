import css from "./contactsList.module.css"

export const ContactsList = ({children}) => {
	return (
		<ul className={css.contacts_list}>
			{children}
		</ul>
	)
}




