import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

import { useAddContactMutation } from 'redux/contactsSlice';
import s from './ContactForm.module.css';

export default function ContactForm({ contacts }) {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [addContact, { isLoading }] = useAddContactMutation();

  const handleFormSubmit = async e => {
    e.preventDefault();

    const contact = { id: nanoid(), name: contactName, phone: contactNumber };

    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    try {
      await addContact(contact);
      toast.success('Contact added!');
    } catch (error) {
      toast.error('Something went wrong...');
      console.log(error);
    }

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
      case 'phone': {
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
    <>
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
            name="phone"
            id={numberId}
            className={s.input}
            value={contactNumber}
            onChange={handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className={s.submitButton}>
          {isLoading ? 'Adding...' : 'Add contact'}
        </button>
      </form>
      <Toaster />
    </>
  );
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
