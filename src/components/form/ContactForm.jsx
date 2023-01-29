import React, { Component } from 'react';
import css from './ContactForm.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  handleNameChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    const nameToLower = name.toLowerCase();
    const findName = this.props.doubleContactName(nameToLower);
    findName
      ? alert(`${name} is already in contacts.`)
      : this.props.onSubmit(name, number);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '' });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleNameChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
export default Form;
