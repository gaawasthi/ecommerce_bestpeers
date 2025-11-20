import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../features/orders/orderSlice';
import { emptyCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'not-a-toast';
import 'not-a-toast/style.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cart = JSON.parse(localStorage.getItem('cart'));
  const cartItems = cart.items;
  console.log(cartItems);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = 6.0;
  const taxPrice = 5.0;
  const [discount, setDiscount] = useState(0);
  const totalPrice = itemsPrice + shippingPrice + taxPrice - discount;
  const [formData, setFormData] = useState({
    address: {
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    },
    email: '',
    paymentMethod: 'card',
    promoCode: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePaymentMethodChange = (method) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.address.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.address.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.address.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }
    if (!formData.address.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.address.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.address.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.address.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log("cart" ,cartItems);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }
  
    const orderData = {
      items: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      discount: discount,
      totalPrice: totalPrice,
      orderStatus: 'pending',
    };
    console.log(orderData);
    
    dispatch(createOrder(orderData));
    localStorage.removeItem('cart')
    dispatch(emptyCart())
    navigate("/order/summary")
      
   toast({
    message: " Order Placed Successfully",
    showIcon: true,
    iconAnimation: "default",
    iconTimingFunction: "ease",
    iconBorderRadius: "50%",
    iconType: "success",
});
  };

  return (
    <div className="bg-white">
      <div className="flex max-md:flex-col gap-12 max-lg:gap-4 h-full">
        {/* Order Summary Sidebar */}
        <div className="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px]">
          <div className="relative h-full">
            <div className="px-6 py-8 md:overflow-auto md:h-screen">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-start gap-4">
                    <div className="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                      <img
                        src={item?.product?.images[0]?.url}
                        className="w-full object-contain"
                        alt={item.name}
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-sm text-slate-900 font-semibold">
                        {item.product.name}
                      </h3>
                      <ul className="text-xs text-slate-900 space-y-2 mt-3">
                        <li className="flex flex-wrap gap-4">
                          Quantity{' '}
                          <span className="ml-auto">{item.quantity}</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Total Price{' '}
                          <span className="ml-auto font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-gray-300 my-8" />

              <div>
                <ul className="text-slate-500 font-medium space-y-4">
                  <li className="flex flex-wrap gap-4 text-sm">
                    Subtotal{' '}
                    <span className="ml-auto font-semibold text-slate-900">
                      ${itemsPrice.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Shipping{' '}
                    <span className="ml-auto font-semibold text-slate-900">
                      ${shippingPrice.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Tax{' '}
                    <span className="ml-auto font-semibold text-slate-900">
                      ${taxPrice.toFixed(2)}
                    </span>
                  </li>
                  {discount > 0 && (
                    <li className="flex flex-wrap gap-4 text-sm text-green-600">
                      Discount{' '}
                      <span className="ml-auto font-semibold">
                        -${discount.toFixed(2)}
                      </span>
                    </li>
                  )}
                  <hr className="border-slate-300" />
                  <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
                    Total{' '}
                    <span className="ml-auto">${totalPrice.toFixed(2)}</span>
                  </li>
                </ul>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 max-md:-order-1">
          <div>
            <h2 className="text-xl text-slate-900 font-semibold mb-6">
              Delivery Details
            </h2>
            <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
              <div className="lg:col-span-2">
                <label className="text-sm text-slate-900 font-medium block mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.address.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className={`px-4 py-2.5 bg-white border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-400'
                  } text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-900 font-medium block mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  className={`px-4 py-2.5 bg-white border ${
                    errors.email ? 'border-red-500' : 'border-gray-400'
                  } text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-900 font-medium block mb-2">
                  Phone No. *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.address.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone No."
                  className={`px-4 py-2.5 bg-white border ${
                    errors.phone ? 'border-red-500' : 'border-gray-400'
                  } text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="lg:col-span-2">
                <label className="text-sm text-slate-900 font-medium block mb-2">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.address.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Enter Address Line 1"
                  className={`px-4 py-2.5 bg-white border ${
                    errors.addressLine1 ? 'border-red-500' : 'border-gray-400'
                  } text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`}
                />
                {errors.addressLine1 && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.addressLine1}
                  </p>
                )}
              </div>

              <div className="lg:col-span-2">
                <label className="text-sm text-slate-900 font-medium block mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.address.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Enter Address Line 2 (Optional)"
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>

              <div>
                <label className="text-sm text-slate-900 font-medium block mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  placeholder="Enter City"
                  className={`px-4 py-2.5 bg-white border ${
                    errors.city ? 'border-red-500' : 'border-gray-400'
                  } text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-900 font-medium block mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  placeholder="Enter State"
                  className={`px-4 py-2.5 bg-white border ${
                    errors.state ? 'border-red-500' : 'border-gray-400'
                  } text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-900 font-medium block mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  placeholder="Enter Country"
                  className={`px-4 py-2.5 bg-white border ${
                    errors.country ? 'border-red-500' : 'border-gray-400'
                  } text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`}
                />
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-900 font-medium block mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.address.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter Pincode"
                  className={`px-4 py-2.5 bg-white border ${
                    errors.pincode ? 'border-red-500' : 'border-gray-400'
                  } text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl text-slate-900 font-semibold mb-6">
              Payment Method
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <div
                onClick={() => handlePaymentMethodChange('card')}
                className={`bg-gray-100 p-4 rounded-md border ${
                  formData.paymentMethod === 'card'
                    ? 'border-blue-600'
                    : 'border-gray-300'
                } max-w-sm cursor-pointer`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => handlePaymentMethodChange('card')}
                    className="w-5 h-5 cursor-pointer"
                    id="card"
                  />
                  <label
                    htmlFor="card"
                    className="ml-4 flex gap-2 cursor-pointer"
                  >
                    <img
                      src="https://readymadeui.com/images/visa.webp"
                      className="w-12"
                      alt="Visa"
                    />
                    <img
                      src="https://readymadeui.com/images/american-express.webp"
                      className="w-12"
                      alt="Amex"
                    />
                    <img
                      src="https://readymadeui.com/images/master.webp"
                      className="w-12"
                      alt="Mastercard"
                    />
                  </label>
                </div>
                <p className="mt-4 text-sm text-slate-500 font-medium">
                  Pay with your debit or credit card
                </p>
              </div>

              <div
                onClick={() => handlePaymentMethodChange('cod')}
                className={`bg-gray-100 p-4 rounded-md border ${
                  formData.paymentMethod === 'cod'
                    ? 'border-blue-600'
                    : 'border-gray-300'
                } max-w-sm cursor-pointer`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => handlePaymentMethodChange('cod')}
                    className="w-5 h-5 cursor-pointer"
                    id="cod"
                  />
                  <label
                    htmlFor="cod"
                    className="ml-4 flex gap-2 cursor-pointer"
                  >
                    <span className="text-lg font-semibold">
                      Cash on Delivery
                    </span>
                  </label>
                </div>
                <p className="mt-4 text-sm text-slate-500 font-medium">
                  Pay with cash when you receive
                </p>
              </div>

              <div
                onClick={() => handlePaymentMethodChange('upi')}
                className={`bg-gray-100 p-4 rounded-md border ${
                  formData.paymentMethod === 'upi'
                    ? 'border-blue-600'
                    : 'border-gray-300'
                } max-w-sm cursor-pointer`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={() => handlePaymentMethodChange('upi')}
                    className="w-5 h-5 cursor-pointer"
                    id="upi"
                  />
                  <label
                    htmlFor="upi"
                    className="ml-4 flex gap-2 cursor-pointer"
                  >
                    <span className="text-lg font-semibold">UPI</span>
                  </label>
                </div>
                <p className="mt-4 text-sm text-slate-500 font-medium">
                  Pay using UPI apps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
