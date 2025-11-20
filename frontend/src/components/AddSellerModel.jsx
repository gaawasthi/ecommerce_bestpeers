import { useFormik } from 'formik';
import React from 'react';
import { X } from 'lucide-react'; // <-- Missing import added
import * as Yup from 'yup';

const nameRegex = /^[A-Za-z\s]+$/;
const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;

const createSellerSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(nameRegex, 'First name can only contain letters and spaces')
    .min(3, 'First name should have at least 3 characters')
    .max(20, 'First name should not exceed 20 characters')
    .required('First name is required'),

  lastName: Yup.string()
    .matches(nameRegex, 'Last name can only contain letters and spaces')
    .min(3, 'Last name should have at least 3 characters')
    .max(20, 'Last name should not exceed 20 characters')
    .required('Last name is required'),

  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .matches(
      passwordRegex,
      'Password must be at least 8 characters long and include at least one letter'
    )
    .required('Password is required'),

  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Phone must be 10-15 digits')
    .nullable(),

  role: Yup.string().oneOf(['seller']).required(),
});

const AddSellerModal = ({ open, onClose, onSubmit }) => {
  if (!open) return null;

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      role: 'seller',
    },
    validationSchema: createSellerSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">

        {/* Close button */}
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X size={22} className="text-gray-600 hover:text-black" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Seller</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-3">

          <div>
            <input
              type="text"
              placeholder="First Name"
              className="w-full border p-2 rounded"
              {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-sm text-red-600">{formik.errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full border p-2 rounded"
              {...formik.getFieldProps('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-sm text-red-600">{formik.errors.lastName}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone (Optional)"
              className="w-full border p-2 rounded"
              {...formik.getFieldProps('phone')}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm text-red-600">{formik.errors.phone}</p>
            )}
          </div>

          {/* Hidden role */}
          <input type="hidden" name="role" value="seller" />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
        
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Seller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSellerModal;
