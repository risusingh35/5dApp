import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const ListMoment = () => {
  const [moments, setMoments] = useState([]);
  const userID = localStorage.getItem('userID')
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchMoments = async () => {
      console.log('userID', userID);
      try {
        const response = await axios.get(`${apiUrl}/moment/list?userID=${userID}`);
    
        console.log('response', response.data);
        if (response && response.status === 200) {
          setMoments(response.data);
        } else {
          toast.error('Error while listing moment!');
          console.error('Error', response);
        }
      } catch (error) {
        toast.error('Error while adding moment!');
        console.error('Error', error);
      }
    };
    console.log('moments', moments);
    fetchMoments();
  }, []);

  return (
    <div className="container mt-4">
      <h2>List of Moments</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Comment</th>
            <th>Tags</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {moments.length && moments.map((moment, index) => (
            <tr key={index}>
              <td>{moment.title}</td>
              <td>{moment.comment}</td>
              <td>{moment.tags}</td>
              <td>
                <img
                  src={`http://localhost:3000/${moment.imageUrl}`}
                  alt="Moment"
                  className="img-thumbnail"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />   </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMoment;
