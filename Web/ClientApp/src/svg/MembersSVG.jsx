import React, { Component } from 'react';

class MembersSVG extends React.Component {
    render() {
        return (
            <div className='round-button big-round-button grey-outline-button'>
                <svg
                    style={{'height' : '100%'}} 
                    version="1.1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    x="0px" y="0px" viewBox="0 0 25 25" 
                >
                    <path className="svg" d="M3.3,18.1c-1.1-0.2-2.1-0.7-3-1.3c-0.9-0.6,0.5-5.8,2.2-6.3c0.8,0.6,1.7,1,2.6,1c0.8,0,1.5-0.3,2.2-0.8
	c0.2,0.5,0.4,1,0.7,1.4C5.6,13.1,4,15.1,3.3,18.1z M7.7,3.9C7.2,3.1,6.3,2.7,5.1,2.7c-4.8,0-4.2,7.8,0,7.8c0.7,0,1.3-0.2,1.8-0.6
	C6.8,9.1,6.6,8.4,6.6,7.6C6.6,6.2,7,4.9,7.7,3.9z M21.7,18.1c1.1-0.2,2.1-0.7,3-1.3c0.9-0.6-0.5-5.8-2.2-6.3c-0.8,0.6-1.7,1-2.6,1
	c-0.8,0-1.5-0.3-2.2-0.8c-0.2,0.5-0.4,1-0.7,1.4C19.4,13.1,21,15.1,21.7,18.1z M17.3,3.9c0.5-0.7,1.4-1.2,2.6-1.2
	c4.8,0,4.2,7.8,0,7.8c-0.7,0-1.3-0.2-1.8-0.6c0.2-0.7,0.3-1.4,0.3-2.2C18.4,6.2,18,4.9,17.3,3.9z M16,13.2c-1.1,0.8-2.2,1.4-3.5,1.4
	S10.1,14,9,13.2c-3,1-4.4,3.5-4.8,7c2,2.1,4.6,3.5,8.3,3.5s6.3-1.4,8.3-3.5C20.3,16.7,19,14.1,16,13.2z M12.5,2.7
	c6.4,0,5.6,10.5,0,10.5S6.1,2.7,12.5,2.7z"/>
                </svg>
            </div>
        );
    }
}

export default MembersSVG;