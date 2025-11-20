import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Lock, Mail, Eye, EyeOff, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';

import toast from 'not-a-toast';
import 'not-a-toast/style.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role) {
      const redirectPaths = {
        admin: '/admin/dashboard',
        seller: '/seller/dashboard',
        customer: '/',
      };
      navigate(redirectPaths[user.role] || '/');
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .required('Required'),
    }),

    onSubmit: async (values) => {
      try {
        const result = await dispatch(login(values)).unwrap();
          
        if (result?.role) {
          const redirectPaths = {
            admin: '/admin/dashboard',
            seller: '/seller/dashboard',
            customer: '/',
          };
          // Fixed: Use result.role instead of user.role
          navigate(redirectPaths[result.role] || '/');
          toast({
            message: 'Login successful!',
            type: 'success',
            duration: 2000,
            autoClose: true,
          });
        }
      } catch (error) {
        toast({
          message: error?.message || 'Invalid credentials!',
          type: 'error',
          duration: 2000,
          autoClose: true,
        });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 flex items-center justify-center bg-blue-600 text-white rounded-full">
            <User className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to continue</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                {...formik.getFieldProps('email')}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="you@example.com"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-600">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

              <input
                type={showPassword ? 'text' : 'password'}
                {...formik.getFieldProps('password')}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="********"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-600">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm">
              New Customer?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Click here
              </button>{' '}
              to register.
            </p>

            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-blue-600 font-medium text-sm hover:text-blue-700"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 rounded-lg text-white font-medium text-sm transition ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;