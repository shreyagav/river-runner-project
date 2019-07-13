import React, { Component } from 'react';

class StatusDraftSVG extends React.Component {
    render() {
        return (
                <svg className={'svg-container '+this.props.svgClassName} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 14 16" >
                    <path className='svg' d="M3.3,2.6V1.3c0-0.2,0.1-0.3,0.3-0.3h0.9V0.5C4.5,0.2,4.7,0,5,0h4c0.3,0,0.5,0.2,0.5,0.5V1h0.9
	c0.2,0,0.3,0.1,0.3,0.3v1.3c0,0.2-0.1,0.3-0.3,0.3H3.5C3.4,2.9,3.3,2.8,3.3,2.6z M12.7,0.9H12v2.6c0,0.3-0.3,0.5-0.5,0.5H2.6
	c-0.3,0-0.5-0.3-0.5-0.5V0.9H1.3C0.5,0.9,0,1.5,0,2.2v12.5C0,15.5,0.6,16,1.3,16h11.5c0.7,0,1.3-0.6,1.3-1.3V2.2
	C14,1.5,13.4,0.9,12.7,0.9z M9.8,9.1c-1.3,1.3-2.6,2.6-4,4c-0.1,0.1-0.2,0.2-0.3,0.2C4.7,13.4,2.9,14,2.8,14
	c0.2-0.9,0.5-1.8,0.8-2.6c0-0.2,0.2-0.3,0.2-0.4c1.2-1.2,2.6-2.6,3.8-3.8C7.7,7,7.8,7,7.8,7C8,7.1,8.3,7.4,8.4,7.5
	C7,8.9,5.5,10.4,4,11.9c-0.1-0.1-0.2-0.2-0.2-0.2c-0.1,0.2-0.2,0.3-0.2,0.5c-0.2,0.5-0.2,0.6,0.1,0.9c0.4,0.4,0.4,0.2,1,0.2
	c0.2,0,0.4-0.2,0.5-0.2c-0.3-0.2-0.6-0.5-0.9-0.8c1.6-1.6,3-3,4.4-4.4C9.2,8.1,9.6,8.5,10,8.9C9.9,8.9,9.9,9,9.8,9.1z M11,7.9
	c-0.2,0.2-0.5,0.5-0.7,0.8C9.6,8,8.9,7.3,8.2,6.6c0.1-0.1,0.2-0.1,0.2-0.2C8.5,6.3,8.7,6.1,8.8,6C9.2,5.6,9.7,5.6,10,6
	s0.6,0.6,0.9,0.9C11.2,7.1,11.2,7.5,11,7.9z"/>
                </svg>
        );
    }
}

export default StatusDraftSVG;