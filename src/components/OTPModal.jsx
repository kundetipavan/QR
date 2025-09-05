import React, { useState } from 'react';
import { X } from 'lucide-react';

export function OTPModal({ showOTPModal, onClose }) {
  const [otpStep, setOtpStep] = useState('phone'); // 'phone' or 'otp'
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');
  const [localOtpValue, setLocalOtpValue] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!showOTPModal) return null;

  // Call backend to send OTP
  const handleGetOTP = async () => {
    if (localPhoneNumber.length >= 10) {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: localPhoneNumber, name }),
        });
        const data = await res.json();
        if (data.success) {
          alert("OTP Sent to your number");
          setOtpStep("otp");
        } else {
          alert(data.message || "Failed to send OTP");
        }
      } catch (error) {
        alert("Error sending OTP");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...localOtpValue];
      newOtp[index] = value;
      setLocalOtpValue(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Verify OTP with backend
  const handleVerifyOTP = async () => {
    const otp = localOtpValue.join('');
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: localPhoneNumber, otp }),
      });
      const data = await res.json();
      if (data.success) {
        alert("OTP Verified Successfully");
        onClose(); // close modal
        setOtpStep("phone");
        setLocalPhoneNumber('');
        setLocalOtpValue(['', '', '', '', '', '']);
        setName('');
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 transform transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h2 className="text-xl font-bold text-gray-900">Customer Information </h2>
            <p className="text-gray-600 text-sm">to complete your order</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {otpStep === 'phone' ? (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />

              <label className="block text-sm font-medium text-gray-700 mb-2 mt-4 ml-1" >
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
              disabled={localPhoneNumber.length < 10 || loading}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? "Sending..." : "Get OTP"}
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
                <span className="text-gray-600">OTP sent to +91 {localPhoneNumber}</span>
                <button className="text-red-500 hover:text-red-600 font-medium">
                  Resend OTP
                </button>
              </div>
            </div>
            
            <button
              onClick={handleVerifyOTP}
              disabled={localOtpValue.join('').length !== 6 || loading}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </>
        )}

      </div>
    </div>
  );
}
