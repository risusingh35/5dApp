
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import './UserSignUpForm.css';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;
const SignUpForm = () => {
  localStorage.removeItem('userID')
  localStorage.removeItem('name')
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPwValidated, setIsPwValidated] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    validatePassword(formData.password);
  }, [formData.password]);

  useEffect(() => {
    checkFormReady();
  }, [formData, isPwValidated]);

  const checkFormReady = () => {
    const formInputs = Object.values(formData);
    const isAllFilled = formInputs.every((input) => input !== '');
    setIsFormReady(isAllFilled && isPwValidated);
  };

  const validatePassword = async (pw) => {
    setIsPwValidated(false);
    setErrorText('');

    const hasUppercase = pw.match(/[A-Z]/);
    const hasLowercase = pw.match(/[a-z]/);
    const hasSpecialChar = pw.match(/[!@#$%^&*(),.?":{}|<>]/);
    const hasDigit = pw.match(/[0-9]/);

    if (pw.length < 8) {
      setErrorText('Password must be at least 8 characters long');
    } else if (!hasUppercase) {
      setErrorText('Password must have at least one uppercase letter');
    } else if (!hasLowercase) {
      setErrorText('Password must have at least one lowercase letter');
    } else if (!hasSpecialChar) {
      setErrorText('Password must have at least one special character');
    } else if (!hasDigit) {
      setErrorText('Password must have at least one digit');
    } else {
      setIsPwValidated(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/user/add`, formData).then((res) => {

        if (res && res.data.statusCode === 200) {
          localStorage.setItem('userID',res.data.userID)
          localStorage.setItem('name',res.data.name)
          toast.success('User added successfully!');
          navigate(`/add-moment`);
        } else {
          toast.error('Error while creating user!');
          console.error('Error', res);
        }
      });
    } catch (error) {
      toast.error('Error while creating user!');
      console.error('Error', error);
    }
  };

  return (
    <div className="container mt-4">

      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Mobile Number
            </label>
            <div className="input-group">
              <PhoneInput
                name="phone"
                flags={flags}
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                placeholder="Mobile Number"
                className="form-control"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaMapMarkerAlt />
              </span>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
            </div>
          </div>
          {/* -----------------------Password---------------------------- */}
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <span className="error-text text-danger">{errorText}</span>

          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3">
              <button
                type="submit"
                className={`btn btn-lg ${isFormReady ? 'btn-primary' : 'btn-secondary'}`}
                disabled={!isFormReady}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>


      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
