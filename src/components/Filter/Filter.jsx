import { nanoid } from 'nanoid';
import { updateFilter, getContactsFilter } from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';

import s from './Filter.module.css';

export default function Filter() {
  const filterId = nanoid();

  const dispatch = useDispatch();

  const filter = useSelector(getContactsFilter);

  return (
    <div className={s.fieldContainer}>
      <label htmlFor={filterId} className={s.label}>
        Find contacts by name
      </label>
      <input
        type="text"
        name="name"
        id={filterId}
        className={s.input}
        value={filter}
        onChange={e => dispatch(updateFilter(e.currentTarget.value))}
      />
    </div>
  );
}
