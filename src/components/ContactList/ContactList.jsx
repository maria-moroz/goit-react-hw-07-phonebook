import { useSelector, useDispatch } from 'react-redux';
import {
  deleteContact,
  getContactsItems,
  getContactsFilter,
} from 'redux/contactsSlice';
import s from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsItems);
  const filter = useSelector(getContactsFilter);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <ul className={s.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <span className={s.contact}>
            {name}: {number}
          </span>
          <button
            type="button"
            className={s.button}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
