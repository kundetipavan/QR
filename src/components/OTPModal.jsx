import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function OTPModal() {
  const { showOTPModal, phoneNumber, otpValue, dispatch, addToast } = useApp();
  const [otpStep, setOtpStep] = useState('phone'); // 'phone' or 'otp'
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');
  const [localOtpValue, setLocalOtpValue] = useState(['', '', '', '', '', '']);

  if (!showOTPModal) return null;

  const handleGetOTP = () => {
    if (localPhoneNumber.length >= 10) {
      dispatch({ type: 'SET_PHONE_NUMBER', payload: localPhoneNumber });
      setOtpStep('otp');
      addToast('OTP Sent to your number', 'info');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...localOtpValue];
      newOtp[index] = value;
      setLocalOtpValue(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    const otp = localOtpValue.join('');
    dispatch({ type: 'SET_OTP_VALUE', payload: otp });
    
    if (otp === '123456') {
      dispatch({ type: 'VERIFY_OTP', payload: true });
      addToast('OTP Verified Successfully', 'success');
      
      // Add the item to cart
      if (window.tempCartItem) {
        dispatch({ type: 'ADD_TO_CART', payload: window.tempCartItem });
        addToast('Item Added to Cart Successfully', 'success');
        delete window.tempCartItem;
      }
      
      setTimeout(() => {
        dispatch({ type: 'HIDE_OTP_MODAL' });
        setOtpStep('phone');
        setLocalPhoneNumber('');
        setLocalOtpValue(['', '', '', '', '', '']);
      }, 1000);
    } else {
      addToast('Invalid OTP. Please try again.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 transform transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h2 className="text-xl font-bold text-gray-900">Sign In</h2>
            <p className="text-gray-600 text-sm">to complete your order</p>
          </div>
          <button
            onClick={() => {
              dispatch({ type: 'HIDE_OTP_MODAL' });
              setOtpStep('phone');
              setLocalPhoneNumber('');
              setLocalOtpValue(['', '', '', '', '', '']);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {otpStep === 'phone' ? (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={localPhoneNumber}
                onChange={(e) => setLocalPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handleGetOTP}
              disabled={localPhoneNumber.length < 10}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Get OTP
            </button>
          </>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <div className="flex space-x-2 justify-center">
                {localOtpValue.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    maxLength={1}
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg font-medium"
                  />
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 text-sm">
                <span className="text-gray-600">OTP sent to +1 {localPhoneNumber}</span>
                <button className="text-red-500 hover:text-red-600 font-medium">
                  Resend OTP
                </button>
              </div>
            </div>
            
            <button
              onClick={handleVerifyOTP}
              disabled={localOtpValue.join('').length !== 6}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Sign In
            </button>
          </>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm mb-4">Or continue with</p>
          <div className="flex justify-center space-x-4">
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <span className="text-lg font-bold">G</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <span className="text-lg">🍎</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <span className="text-lg">f</span>
            </button>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <button className="text-gray-600 hover:text-red-500">Forgot Password?</button>
            <div className="text-gray-600">
              Don't have an account? 
              <button className="text-red-500 hover:text-red-600 ml-1">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}