import { useDeleteContactMutation } from 'redux/contactsSlice';
import PropTypes from 'prop-types';

import s from './ContactItem.module.css';

export default function ContactItem({ contact }) {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const { id, name, phone } = contact;

  return (
    <li key={id} className={s.item}>
      <span className={s.contact}>
        {name}: {phone}
      </span>
      <button
        type="button"
        className={s.button}
        disabled={isLoading}
        onClick={() => deleteContact(id)}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
