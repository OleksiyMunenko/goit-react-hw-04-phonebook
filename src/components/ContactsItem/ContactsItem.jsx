import PropTypes from 'prop-types';
import css from "./ContactsItem.module.css"

export const ContactsItem = ({ contacts, onRemoveClick}) => {
	return (
		contacts.map(({id, name, number}) => {
			return (
				<li key={id} className={css.contacts_item}>
					<span>{name}: {number}</span>
					<span>
						<button
							className={css.delete_btn}
							type="button"
							onClick={() => 
								onRemoveClick(id)
							}>
							Delete		
						</button>
					</span>
				</li>
			)
		}

		)
	)
} 

ContactsItem.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.exact({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		number: PropTypes.string.isRequired
	}).isRequired).isRequired,
	onRemoveClick: PropTypes.func.isRequired
}