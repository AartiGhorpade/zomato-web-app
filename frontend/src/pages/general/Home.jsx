import React, { useEffect, useRef } from 'react'
import './Home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = React.useState([]);
    const videoRefs = useRef([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3000/api/food", {
            withCredentials: true,
        })
            .then(res => setData(res.data.foodItems))
            .catch(err => console.log(err.response?.data));
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.8 // Video must be 80% visible to play
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    // Video is mostly visible, play it
                    video.play().catch(err => console.log('Video play failed:', err));
                } else {
                    // Video is not mostly visible, pause it
                    video.pause();
                }
            });
        }, observerOptions);

        // Observe all video elements
        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            observer.disconnect();
        };
    }, [data]);

    const setVideoRef = (index) => (el) => {
        videoRefs.current[index] = el;
    };


    return (
        <main className="reels-container" aria-label="Video Reels">
            {data?.length === 0 ? (
                <div className="no-videos">No reels available</div>
            ) : (
                data.map((reel, index) => (
                    <section key={reel._id} className="reel-item" role="group" aria-label={`Reel ${reel._id}`}>
                        <video
                            ref={setVideoRef(index)}
                            className="reel-video"
                            src={reel.video}
                            muted
                            loop
                            playsInline
                            controls={false}
                            preload='metadata'
                        />
                        <div className="reel-overlay">
                            <p className="reel-description">{reel.description}</p>
                            <a className="visit-store-button" onClick={() => navigate(`foodPartner/${reel._id}`)}>Visit Store</a>
                        </div>
                    </section>
                ))
            )}
        </main>
    )
}

export default Home