import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import {
  Formcontact,
  ButtononClick,
  ContactFormField,
  Formcontactlabel,
} from './ContactForm.styled';
import { getContacts, addContact } from 'redux/contactsSlice';

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message:
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
    }),

  number: yup
    .string()
    .required()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      {
        message:
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
      }
    ),
});

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
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
  const handleSubmit = (values, { resetForm }) => {
    addContacts(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ number: '', name: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Formcontact autoComplete="off">
        <Formcontactlabel htmlFor="user-name">Name</Formcontactlabel>
        <ContactFormField type="text" name="name" id="user-name" />
        <ErrorMessage name="name" />

        <Formcontactlabel htmlFor="number">Number</Formcontactlabel>
        <ContactFormField type="tel" name="number" />
        <ErrorMessage name="number" />

        <ButtononClick type="submit">Add contact</ButtononClick>
      </Formcontact>
    </Formik>
  );
};

export default ContactForm;
