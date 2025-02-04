import React from "react";
import '../styles/loading.css';
const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <video autoPlay loop muted className="w-1/2 h-1/2 responsive-video">
            <source src="/src/assets/logo.mp4" type="video/mp4" /> 
            </video>
        </div>
    );
};
export default Loading;