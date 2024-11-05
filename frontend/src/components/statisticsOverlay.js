import React, { useState } from 'react';

const StatisticsOverlay = ({ onClose }) => {



    return (
        <section className='overlay'> 
            <div className='overlay-container'>
            <button className='close-btn' onClick={onClose}>X</button>
            <h1>Statistics</h1>
            </div>
            
        </section>

    );
};

export default StatisticsOverlay;