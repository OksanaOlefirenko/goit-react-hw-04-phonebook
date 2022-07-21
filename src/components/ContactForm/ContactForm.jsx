import PropTypes from 'prop-types';
import { FormBox, Label, Input, Button, ErrorText } from './ContactForm.styled';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';

const schema = yup.object().shape({
  name: yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required(),
  number: yup.string().min(3).max(16).required(),
});

const initialValues = {
  name: '',
  number: '',
};

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

export const ContactForm = ({ onSubmit }) => {
  const nameId = nanoid();
  const numberId = nanoid();

  const handleSubmit = (value, { resetForm }) => {
    onSubmit(value);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormBox>
        <Label htmlFor={nameId}>
          Name
          <Input
            type="text"
            name="name"
            id={nameId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <FormError FormError name="name" />
        </Label>

        <Label htmlFor={numberId}>
          Number
          <Input
            type="tel"
            name="number"
            id={numberId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <FormError FormError name="number" />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormBox>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
