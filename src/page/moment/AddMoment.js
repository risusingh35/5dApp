import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
const AddMoment = () => {
const userID=  localStorage.getItem('userID')
 const name= localStorage.getItem('name')
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isFormReady, setIsFormReady] = useState(false);
  const [moment, setMoment] = useState({
    title: '',
    image: null,
    comment: '',
    tags: '',
    createdBy: userID,
  });
  useEffect(() => {
    checkFormReady();
  }, [moment]);

  const checkFormReady = () => {
    const formInputs = Object.values(moment);
    const isAllFilled = formInputs.every((input) => input !== '');
    setIsFormReady(isAllFilled);
  };

  const handleMomentInputChange = (e) => {
    setMoment((prevMoment) => ({
      ...prevMoment,
      [e.target.name]: e.target.value,
    }));
  };


  const handleImageChange = (e) => {
    setMoment({
      ...moment,
      image: e.target.files[0],
    });
  };

  const handleSubmitMoment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in moment) {
      if (moment.hasOwnProperty(key)) {
        formData.append(key, moment[key]);
      }
    }
    
    try {
      const response = await axios.post(`${apiUrl}/moment/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response && response.data.statusCode === 200) {
        toast.success('Moment added successfully!');
        navigate('/list-moment');
      } else {
        toast.error('Error while adding moment!');
        console.error('Error', response);
      }
    } catch (error) {
      toast.error('Error while adding moment!');
      console.error('Error', error);
    }
  };


  return (
    <div className="container mt-4">
      <h2>Add New Moment</h2>
      <form onSubmit={handleSubmitMoment}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" id="title" name="title" value={moment.title} onChange={handleMomentInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Comment (max 100 characters):</label>
          <textarea
            className="form-control"
            id="comment"
            name="comment"
            value={moment.comment}
            onChange={handleMomentInputChange}
            maxLength="100"
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="image" className="form-label">Image:</label>
            <input type="file" className="form-control" name="image" id="image" accept="image/*" onChange={handleImageChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="tags" className="form-label">Tags:</label>
            <input type="text" className="form-control" id="tags" name="tags" value={moment.tags} onChange={handleMomentInputChange} />
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
                Add Moment
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddMoment;
