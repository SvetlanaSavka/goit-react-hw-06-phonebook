import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Link, Span } from './ContactList.styled';
import { getContacts, getFilter, deleteContact } from 'redux/contactsSlice';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

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
    <ul>
      {getVisibleContacts().map(({ id, name, number }) => (
        <Link key={id}>
          <Span>{name + ': ' + number}</Span>
          <Button type="button" onClick={() => deleteContactId(id)}>
            Delete
          </Button>
        </Link>
      ))}
    </ul>
  );
};

export default ContactList;
