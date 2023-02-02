import React, { useEffect, useState } from 'react';
import ContactForm from './form/ContactForm';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log(contacts);
  }, [contacts]);
  const formSubmitHandler = (name, number) => {
    setContacts(prevState => [...prevState, { name, number, id: nanoid() }]);

    console.log(name);
    console.log(contacts);
    console.log(filter);
  };
  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'filter':
        setFilter(value);
        break;
      default:
        return;
    }
    console.log(contacts);
    console.log(filter);
  };
  const filterContacts = () => {
    const toLowerFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(toLowerFilter) ||
        contact.number.includes(toLowerFilter)
      );
    });
  };
  const doubleContactName = name => {
    return contacts.find(contact => contact.name.toLowerCase() === name);
  };
  const deleteContact = event => {
    const leaveContacts = contacts.filter(contact => {
      return contact.name !== event.target.parentNode.id;
    });
    return setContacts([...leaveContacts]);
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={formSubmitHandler}
        doubleContactName={doubleContactName}
      />
      <h1>Contacts</h1>
      <Filter handleChange={handleChange} filter={filter} />
      <ContactList
        contacts={contacts}
        filterContacts={filterContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
}

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };
// componentDidUpdate(prevProps, prevState) {
//   if (this.state.contacts !== prevState.contacts) {
//     // console.log('Update 123456');
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }
// componentDidMount() {
//   console.log('componentDidMount');
//   const contacts = localStorage.getItem('contacts');
//   const parseContacts = JSON.parse(contacts);
//   console.log(parseContacts);
//   if (parseContacts) {
//     this.setState({ contacts: parseContacts });
//   }
// }
//   formSubmitHandler = (name, number) => {
//     this.setState(({ contacts }) => ({
//       contacts: [...contacts, { name, number, id: nanoid() }],
//     }));
//     console.log(name);
//     console.log(this.state.contacts);
//   };
//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   filterContacts = () => {
//     const { contacts, filter } = this.state;
//     const toLowerFilter = filter.toLowerCase();
//     return contacts.filter(contact => {
//       return (
//         contact.name.toLowerCase().includes(toLowerFilter) ||
//         contact.number.includes(toLowerFilter)
//       );
//     });
//   };
//   doubleContactName = name => {
//     return this.state.contacts.find(
//       contact => contact.name.toLowerCase() === name
//     );
//   };
//   deleteContact = event => {
//     const leaveContacts = this.state.contacts.filter(contact => {
//       return contact.name !== event.target.parentNode.id;
//     });
//     return this.setState({ contacts: [...leaveContacts] });
//   };
//   render() {
//     return (
//       <div className={css.container}>
//         <h1>Phonebook</h1>
//         <ContactForm
//           onSubmit={this.formSubmitHandler}
//           doubleContactName={this.doubleContactName}
//         />
//         <h1>Contacts</h1>
//         <Filter handleChange={this.handleChange} filter={this.filter} />
//         <ContactList
//           contacts={this.state.contacts}
//           filterContacts={this.filterContacts()}
//           deleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
