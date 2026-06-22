import React, { use, useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

// const videos = [
//   {
//     id: 1,
//     src: 'https://ik.imagekit.io/ccokkmf6zl/6ee82b83-8bf9-4318-8316-d9d8daaf3b82_7v_d-_kbg',
//     description: 'This is the first video description.',
//     storeLink: '/store/1',
//   },
//   {
//     id: 2,
//     src: 'https://ik.imagekit.io/ccokkmf6zl/e7ca9927-f7de-4424-a32a-b6fef38d7a56_Qj0FJfZ2I',
//     description: 'This is the second video description.',
//     storeLink: '/store/2',
//   },
//   // Add more video objects here
// ];



const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/food', { withCredentials: true })
      .then((response) => {
        setVideos(response.data.food);
      })
      .catch((error) => { })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const videoElt = entry.target;
        if (!(videoElt instanceof HTMLVideoElement)) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          videoElt.play();
        } else {
          videoElt.pause();
        }
      });
    }, { threshold: 0.5 });

    const videoElements = document.querySelectorAll('video');
    videoElements.forEach((video) => observer.observe(video));

    return () => {
      videoElements.forEach((video) => observer.unobserve(video));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="video-container">
      {videos.map((video) => (
        <div key={video._id} className="video-wrapper">
          <video src={video.vedio} className="video-player" muted
            preload='metadata'
            autoPlay loop />
          <div className="video-overlay">
            <p className="video-description">{video.description}</p>
            <Link to={'/food-partner/' + video.foodpartner} className="visit-store-button">
              Visit Store
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;