import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [vedios, setVedios] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        setProfileData(response.data.foodpartner);
        console.log(response.data.foodpartner);
        setVedios(response.data.foodpartner.fooditem);
        console.log(response.data.foodpartner.fooditem);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [id]);

  return (
    <div className="profile-container full-height">
      <div className="profile-header">
        <div className="profile-image"></div>
        <div className="profile-info">
          <button className="profile-button">{profileData?.name || 'business name'}</button>
          <button className="profile-button">{profileData?.email || 'Address'}</button>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <p>total meals</p>
          <p>{profileData?.totalMeals || 'N/A'}</p>
        </div>
        <div className="stat">
          <p>customer serve</p>
          <p>{profileData?.customersServed || 'N/A'}</p>
        </div>
      </div>
      <div className="profile-videos">
        {vedios ? vedios.map((video, index) => (
          <div key={index} className="video-tile">
            <video src={video.vedio} muted  width="100%" height="100%" controls style={{ objectFit: 'cover', borderRadius: '5px' }} />
          </div>
        )) : <p>Loading videos...</p>}
      </div>
    </div>
  );
};

export default Profile;