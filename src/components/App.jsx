import React, { Component } from 'react';
import ContactForm from './form/ContactForm';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      // console.log('Update 123456');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    console.log('componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    console.log(parseContacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  formSubmitHandler = (name, number) => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, { name, number, id: nanoid() }],
    }));
    console.log(name);
    console.log(this.state.contacts);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;
    const toLowerFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(toLowerFilter) ||
        contact.number.includes(toLowerFilter)
      );
    });
  };
  doubleContactName = name => {
    return this.state.contacts.find(
      contact => contact.name.toLowerCase() === name
    );
  };
  deleteContact = event => {
    const leaveContacts = this.state.contacts.filter(contact => {
      return contact.name !== event.target.parentNode.id;
    });
    return this.setState({ contacts: [...leaveContacts] });
  };
  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.formSubmitHandler}
          doubleContactName={this.doubleContactName}
        />
        <h1>Contacts</h1>
        <Filter handleChange={this.handleChange} filter={this.filter} />
        <ContactList
          contacts={this.state.contacts}
          filterContacts={this.filterContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
