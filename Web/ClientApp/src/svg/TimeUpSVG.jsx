import React, { Component } from 'react';

class TimeUpSVG extends React.Component {
    render() {
        return (
                <svg className={'svg-container '+this.props.svgClassName} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" >
                    <path className='svg' d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M20.7,16.8L19.4,16l-0.1,0.3l1.2,0.7
	c-0.8,1.4-2,2.6-3.4,3.5l-0.7-1.2l-0.3,0.1l0.7,1.2c-1.3,0.7-2.7,1.2-4.3,1.3v-2h-1.2v2c-1.5-0.1-2.9-0.5-4.2-1.2l0.7-1.2l-0.3-0.1
	L7,20.5c-1.4-0.8-2.6-2-3.4-3.4l1.2-0.7l-0.1-0.3l-1.2,0.7c-0.7-1.3-1.2-2.7-1.3-4.3h2v-1.2H3.5c0-1.1,0.3-2.2,0.7-3
	c0.1-0.1,0-0.2-0.1-0.3C4,8,3.9,8.1,3.8,8.2c-0.4,0.9-0.7,2-0.7,3.2h-1c0.1-1.5,0.5-2.9,1.2-4.1l1.2,0.7l0.1-0.3L3.4,7
	c0.8-1.4,2-2.6,3.4-3.5l0.7,1.2l0.3-0.1L7.1,3.4c1.3-0.7,2.7-1.2,4.3-1.3v2h1.2v-2c1.5,0.1,2.9,0.5,4.1,1.2L16,4.5l0.3,0.1l0.7-1.2
	c1.4,0.8,2.6,2,3.5,3.4l-1.2,0.7l0.1,0.3l1.2-0.7c0.7,1.3,1.2,2.7,1.3,4.3h-2v1.2h2C21.8,14.1,21.4,15.5,20.7,16.8z M15.8,8.2
	l0.7,0.9l-3.4,2.7c0,0.1,0,0.1,0,0.2c0,0.6-0.5,1.2-1.2,1.2s-1.2-0.5-1.2-1.2c0-0.2,0.1-0.5,0.2-0.6L5.1,6.6l0.2-0.2l5.9,4.7
	c0.2-0.2,0.5-0.3,0.8-0.3c0.1,0,0.3,0,0.4,0.1L15.8,8.2z M4.9,6.9C5,7,5,7.1,4.9,7.2C4.9,7.3,4.9,7.3,4.8,7.4c0,0.1-0.1,0.1-0.2,0.1
	c0,0-0.1,0-0.1,0c-0.1-0.1-0.1-0.2,0-0.3C4.5,7,4.6,7,4.6,6.9C4.7,6.8,4.9,6.8,4.9,6.9z"/>
                </svg>
        );
    }
}

export default TimeUpSVG;