import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import { useContacts } from 'hooks/useContacts';
import ClipLoader from 'react-spinners/ClipLoader';

export default function App() {
  const { filteredContacts, error, isLoading, isSuccess } = useContacts();

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm contacts={filteredContacts} />

      <h2>Contacts</h2>
      <Filter />
      {isLoading && <ClipLoader />}
      {isSuccess && filteredContacts && (
        <ContactList contacts={filteredContacts} />
      )}
      {error && <p>Sorry, we can't find your contacts :( </p>}
    </div>
  );
}
