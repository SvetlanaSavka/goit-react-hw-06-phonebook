import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from 'components/Container/Container.styled';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import {
  getContacts,
  getFilter,
  addContact,
  deleteContact,
  changeFilter,
} from 'redux/contactsSlice';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const validationData = data =>
    contacts.find(contact => contact.name === data.name);

  const addContacts = data => {
    const isAdded = validationData(data);
    if (isAdded) {
      alert(`${data.name} уже добавлен`);
      return;
    }

    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    dispatch(addContact(contact));
  };

  const handleFilter = event => {
    dispatch(changeFilter(event.currentTarget.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContactId = id => {
    dispatch(deleteContact(id));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onRemoveContact={deleteContactId}
      />
    </Container>
  );
};

/* Пусть Redux - состояние выглядит следующим образом.
{
  contacts: {
    items: [],
    filter: ''
  }
}
Создай хранилище с configureStore()
Создай действия сохранения и удаления контакта, а также обновления фильтра. Используй функцию createAction().
Создай редюсеры контактов и фильтра. Используй функцию createReducer() или createSlice().
Свяжи React-компоненты с Redux-логикой при помощи хуков бибилиотеки react-redux. */
