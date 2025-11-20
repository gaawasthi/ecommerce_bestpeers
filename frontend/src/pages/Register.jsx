import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, resendOtp, verify } from '../features/auth/authSlice';

import toast from 'not-a-toast';
import 'not-a-toast/style.css';

import * as Yup from 'yup';
import { useFormik } from 'formik';

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [email , setEmail] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, 'First name must be at least 3 characters')
      .required('First name is required'),

    lastName: Yup.string()
      .min(3, 'Last name must be at least 3 characters')
      .required('Last name is required'),

    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setEmail(values.email)
      const result = await dispatch(register(values));
      setLoading(false);

      if (result.meta.requestStatus === 'fulfilled') {
        setStep(2);
        toast({
          message: 'Enter OTP to verify',
          duration: 2000,
          autoClose: true,
        });
      } else {
        toast.error(result.payload?.message || 'Registration failed');
      }
    },
  });

  const handleVerify = async () => {
    if (otp.trim().length < 4) {
      toast({
        message: 'Enter a valid OTP',
        type: 'error',
        duration: 2000,
        autoClose: true,
      });
      return;
    }

    setVerifyLoading(true);
    const result = await dispatch(verify({ email: formik.values.email, otp }));
    setVerifyLoading(false);

    if (result.meta.requestStatus === 'fulfilled') {
      toast({
        message: 'Account verified!',
        type: 'success',
        duration: 2000,
        autoClose: true,
      });
      navigate('/');
    } else {
      toast({
        message:  'Invalid OTP',
        type: 'error',
        duration: 2000,
        autoClose: true,
      });
    }
  };
  const handleResend = () => {
    console.log(email);
    
    dispatch(resendOtp({email}));
    toast({
      message: 'Otp sended again ',
      type: 'success',
      duration: 2000,
      autoClose: true,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">
        <div className="flex items-center justify-center mb-10 gap-4">
          {[1, 2].map((num, idx) => (
            <React.Fragment key={num}>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-white ${
                  step >= num ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                {step > num ? <Check size={20} /> : num}
              </div>
              {idx === 0 && (
                <div
                  className={`h-1 w-24 rounded ${
                    step >= 2 ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Create Your Account
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="border px-4 py-3 rounded-xl shadow-sm w-full"
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="border px-4 py-3 rounded-xl shadow-sm w-full"
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border px-4 py-3 rounded-xl shadow-sm w-full"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border px-4 py-3 rounded-xl shadow-sm w-full"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  Continue <ArrowRight size={20} />
                </>
              )}
            </button>

            <style>{`
              .loader { border-top-color: transparent; }
            `}</style>

            <p className="text-center text-gray-700">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-600 font-medium hover:underline"
              >
                Login here
              </button>
            </p>
          </form>
        )}

        {step === 2 && (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Verify OTP</h2>
            <p className="text-gray-600">
              Enter the OTP sent to <strong>{formik.values.email}</strong>
            </p>

            <input
              type="text"
              value={otp}
              maxLength="6"
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
              }}
              className="w-full text-center text-xl font-semibold border-2 rounded-xl py-3"
              placeholder="Enter OTP"
            />

            <button
              onClick={handleVerify}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
              disabled={verifyLoading}
            >
              {verifyLoading ? (
                <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Verify & Continue'
              )}
            </button>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-blue-600 font-medium hover:underline"
              >
                Back
              </button>

              <button
                onClick={handleResend}
                className="text-red-600 font-medium hover:underline"
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
