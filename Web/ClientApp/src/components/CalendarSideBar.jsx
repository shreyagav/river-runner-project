import React, { Component } from 'react';
import MultiDropDown from './MultiDropDown/MultiDropDown';
import './Calendar.css'

class CalendarSidebar extends Component {
    static displayName = CalendarSidebar.name;
    
    constructor(props) {
        super(props);
        this.state = {};
        this.passFocusForward = this.passFocusForward.bind(this);
    }

    passFocusForward(e){
        if(e.shiftKey){
            if(this.nationalEventButton){
                this.nationalEventButton.focus();
                return true;
            }
        } else {
            if(!this.props.store.narrowScreen) {
                this.props.forwardToContentRef.focus();
                return true;
            }
        }
        return false;
    }

    render() {
        return (
        <div style={{"position": "relative", "height": "100%"}}>
            <div className='flex-nowrap justify-space-between align-end mb-1 pl-1 pr-1 mt-1'>
                <h3>Chapters</h3>
                {this.props.chapterFilter.length > 0 && 
                    <button 
                        ref={el => {this.nationalEventButton = el; this.props.setBackToSideBarRef(el);}}
                        className='round-button medium-round-button grey-outline-button pr-05 pl-05'
                        onClick = {this.props.clearChapterFilter}
                    >Select All</button>
                }
            </div>
            <MultiDropDown 
                list={this.props.store.chapterList}
                multiSelect={true}
                keyProperty='id'
                textProperty='state'
                expandBy='chapters'
                expandedTextProperty='name'
                expandedKeyProperty='id'
                expandedMultiSelect={true}
                defaultValue={this.props.chapterFilter}
                placeholder='National'
                onDropDownValueChange = {this.props.onSideBarDropDownValueChange}
                hideHeader = {true}
                hideList = {false}
                passFocusForward = {this.passFocusForward}
            />
        </div>
        );
    }
}

export default CalendarSidebar;