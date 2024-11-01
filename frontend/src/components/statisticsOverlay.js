import React, { useState } from 'react';

const StatisticsOverlay = ({ onClose }) => {



    return (
        <div className='overlay'> 
            <div className='overlay-container'>
            <button className='close-btn' onClick={onClose}>X</button>
            <h1>Statistics</h1>
            </div>
            
        </div>

    );
};

export default StatisticsOverlay;