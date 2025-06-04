import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { Container } from 'react-bootstrap';
import swal from 'sweetalert2';
import './Contact.css';
import GetIn from '../GetIn/GetIn';

const FormComponent = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({ email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validation logic for the email field (you can modify this to suit your requirements)
    if (name === 'email') {
      if (!value) {
        setErrors({
          ...errors,
          email: 'Email is required',
        });
      } else if (!isValidEmail(value)) {
        setErrors({
          ...errors,
          email: 'Invalid email format',
        });
      } else {
        setErrors({
          ...errors,
          email: '',
        });
      }
    }
  };

  const handleButtonClick = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      message: ''
    });
    setErrors({
      name: '',
      email: '',
      mobile: '',
      message: ''
    });
  
    // Reset the form using the reset function from react-hook-form
    reset();
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const { register, handleSubmit, reset, formState: { errors: formErrors } } = useForm();


  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        'service_lfz2l3h', // Your EmailJS service ID
        'template_170v7re', // Your EmailJS template ID
        data, // Form data to be sent
        '7O5ZdG7GEvfR3C23s' // Your EmailJS user ID
      );

      // Display a success Swal2 popup
      swal.fire({
        icon: 'success',
        title: 'Form Submitted',
        text: 'Your form has been submitted successfully!',
      });

      // Clear form data after successful submission
      handleButtonClick();
    } catch (error) {
      console.error('Error sending email:', error);

      // Display an error Swal2 popup
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error submitting the form. Please try again later.',
      });
    }
  };

  return (
    <>
    <Container fluid className='contact_top_fluid'>
<wrapper className="contact_top_wrapper">
  <p className='page_heading' style={{color:"#fff"}}>Contact Informations</p>
  <p className='ctop_text'>Looking to join JM Education and embark on an educational journey? Unsure about the programs, admissions, or services offered by us? Don't worry, we are here to assist you. Feel free to contact us today for personalized assistance.</p>
</wrapper>
    </Container>
    
    <Container className="contact_form_container">
<wrapper className="form_heading_wrapper">
  <p className='page_heading' style={{color:"#fff"}}>Get In Touch</p>
  <p className='page_text'>Send A Message</p>
  <p className='page_text' >We are here to assist you in any way we can. Whether you have questions about our programs or want to inquire about admissions, feel free to reach out to us.</p>
</wrapper>
   
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
    <wrapper className="flex_wrapper">
      <div>
      <div className='contact_form_group'>
        <label htmlFor="name">Name</label>
        <input
        placeholder='Name'
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span className='spann'>{errors.name.message}</span>}
      </div>

      <div className='contact_form_group'>
        <label htmlFor="email">Email</label>
        <input
        placeholder='Email'
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <span className='spann'>{errors.email.message}</span>}
      </div>

      <div className='contact_form_group'>
        <label htmlFor="mobile">Mobile Number</label>
        <input
        placeholder='Mobile Number'
          type="tel"
          id="mobile"
          {...register('mobile', {
            required: 'Mobile number is required',
            pattern: {
              value: /^[0-9]{10}$/i,
              message: 'Invalid mobile number',
            },
          })}
        />
        {errors.mobile && <span className='spann'>{errors.mobile.message}</span>}
      </div>
      </div>

      <div>
      <div className='contact_form_group'>
        <label htmlFor="message">Message</label>
        <textarea
        placeholder='Message'
          id="message"
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && <span className='spann'>{errors.message.message}</span>}
      </div>
      </div>
      </wrapper>
      <button type="submit">Submit</button>
    </form>
    </Container>

    <GetIn/>
</>
    );
};

export default FormComponent;
