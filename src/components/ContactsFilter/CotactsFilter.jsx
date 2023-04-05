import PropTypes from 'prop-types';
import css from "./ContactsFilter.module.css"

const ContactsFilter = ({filter, onChangeFilter}) => (
	<div className={css.filter_block}>
		<label className={css.input_label} htmlFor="contacts-filter">
					Find contacts by name
				</label>
				<input 
					id="contacts-filter"
					name="filter"
					type="text"
					value={filter}
					onChange={onChangeFilter}>

				</input>
	</div>

)

ContactsFilter.propTypes = {
	onChangeFilter: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired,
}

export default ContactsFilter;