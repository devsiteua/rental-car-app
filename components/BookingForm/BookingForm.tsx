'use client';

import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { useId } from 'react';
import toast from 'react-hot-toast';
import { LuCircleAlert } from 'react-icons/lu';
import * as Yup from 'yup';

import { createBookingRequest } from '@/lib/api/cars';
import type { BookingRequest } from '@/types/car';

import css from './BookingForm.module.css';

interface BookingFormProps {
  carId: string;
}

const initialValues: BookingRequest = {
  name: '',
  email: '',
  comment: '',
};

const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Please enter your name.')
    .max(50, 'Please enter your name.')
    .required('Please enter your name.'),
  email: Yup.string()
    .email('Please enter your email.')
    .required('Please enter your email.'),
  comment: Yup.string()
    .max(500, 'Comment is too long')
    .required('Comment is required'),
});

export default function BookingForm({ carId }: BookingFormProps) {
  const fieldId = useId();

  const handleSubmit = async (
    values: BookingRequest,
    actions: FormikHelpers<BookingRequest>
  ) => {
    try {
      const { message } = await createBookingRequest(carId, values);

      toast.success(message);
      actions.resetForm();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={css.card}>
      <div className={css.intro}>
        <h2 className={css.title}>Book your car now</h2>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, isSubmitting, submitCount }) => (
          <Form className={css.form}>
            <div className={css.fields}>
              <div className={css.field}>
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  id={`${fieldId}-name`}
                  placeholder="Name*"
                  aria-invalid={submitCount > 0 && Boolean(errors.name)}
                />
                <label className={css.label} htmlFor={`${fieldId}-name`}>
                  Name*
                </label>
                <LuCircleAlert className={css.icon} size={24} />
                {submitCount > 0 && errors.name && (
                  <span className={css.error}>{errors.name}</span>
                )}
              </div>

              <div className={css.field}>
                <Field
                  className={css.input}
                  type="email"
                  name="email"
                  id={`${fieldId}-email`}
                  placeholder="Email*"
                  aria-invalid={submitCount > 0 && Boolean(errors.email)}
                />
                <label className={css.label} htmlFor={`${fieldId}-email`}>
                  Email*
                </label>
                <LuCircleAlert className={css.icon} size={24} />
                {submitCount > 0 && errors.email && (
                  <span className={css.error}>{errors.email}</span>
                )}
              </div>

              <div className={css.field}>
                <Field
                  className={`${css.input} ${css.comment}`}
                  as="textarea"
                  name="comment"
                  id={`${fieldId}-comment`}
                  placeholder="Comment"
                  aria-invalid={submitCount > 0 && Boolean(errors.comment)}
                />
                <label className={css.label} htmlFor={`${fieldId}-comment`}>
                  Comment
                </label>
                <LuCircleAlert className={css.icon} size={24} />
                {submitCount > 0 && errors.comment && (
                  <span className={css.error}>{errors.comment}</span>
                )}
              </div>
            </div>

            <button
              className={css.submit}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
