import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const dispatch = useDispatch();

  const handleFormSubmit = e => {
    e.preventDefault();

    const contact = { id: nanoid(), name: contactName, number: contactNumber };

    dispatch(addContact(contact));

    setContactName('');
    setContactNumber('');
  };

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name': {
        setContactName(value);
        break;
      }
      case 'number': {
        setContactNumber(value);
        break;
      }
      default:
        throw new Error(`Unsuported input name ${name}`);
    }
  };

  const nameId = nanoid();
  const numberId = nanoid();

  return (
    <form className={s.container} onSubmit={handleFormSubmit}>
      <div className={s.fieldContainer}>
        <label htmlFor={nameId} className={s.label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          id={nameId}
          className={s.input}
          value={contactName}
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={s.fieldContainer}>
        <label htmlFor={numberId} className={s.label}>
          Number
        </label>
        <input
          type="tel"
          name="number"
          id={numberId}
          className={s.input}
          value={contactNumber}
          onChange={handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit" className={s.submitButton}>
        Add contact
      </button>
    </form>
  );
}
