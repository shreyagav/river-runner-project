import React, { Component } from 'react';
import ArrowUpSVG from '../svg/ArrowUpSVG';
//import NatureLocationSVG from '../svg/NatureLocationSVG';
import PlusSVG from '../svg/PlusSVG';
import ChapterList from './ChapterList';

import { withStore } from './store';

class Calendar extends Component {
    static displayName = Calendar.name;
    
    constructor(props) {
        super(props);
        this.state = {
            calendar: [],
            currentYear: null,
            currentMonth: null,
            flag: false,
            regularCalendar: true,
            setFocusTo: -1,
            chapters: [],
            events: [],
        };
        this.todayYear = null;
        this.todayMonth = null;
        this.todayDate = null;
        this.setFocusToRef = null;

        this.calendarBodyRef = null;
        this.initialX = null;
        this.initialY = null;
        this.longTouch = false;
        this.narrowScreen = false;
    }

    componentWillMount() {
        let today = new Date();
        this.todayYear = today.getFullYear();
        this.todayMonth = today.getMonth();
        this.todayDate = today.getDate();
        this.createCalendar(this.todayYear, this.todayMonth);
        this.narrowScreen = this.checkIfNarrowScreen();
        if (this.narrowScreen) {this.props.store.set("sideBarIsHidden", true);}
    }

    componentDidMount(){
      var component = this;
      fetch('/Chapters.json')
      .then(function(data){return data.json();})
      .then(function(jjson){
        component.setState({chapters: jjson})
      });
      fetch('/Events.json')
      .then(function(data){return data.json();})
      .then(function(jjson){
        component.setState({events: jjson})
      });

      if (this.sideBarRef !== null){
        window.addEventListener("touchstart", (e) => this.startTouch(e), false);
        window.addEventListener("touchmove", (e) => this.moveTouch(e), false);
        window.addEventListener("resize", () => {this.narrowScreen = this.checkIfNarrowScreen()}, false);
      }
  }

  componentDidUpdate() {
    this.setFocus();
  }

  componentWillUnmount() {
    window.removeEventListener("touchstart", (e) => this.startTouch(e), false);
    window.removeEventListener("touchmove", (e) => this.moveTouch(e), false);
    window.removeEventListener("resize", () => {this.narrowScreen = this.checkIfNarrowScreen()}, false);
  }

  checkIfNarrowScreen() {
    if (window.innerWidth < 1000) {this.props.store.set('narrowScreen', true); return true;}
    else {this.props.store.set('narrowScreen', false); return false;}
  }

  startTouch(e) {
    this.initialX = e.touches[0].clientX;
    this.initialY = e.touches[0].clientY;
    this.longTouch = false;
    setTimeout(() => {this.longTouch = true;}, 200);
  };
 
  moveTouch(e) {
    if (!this.narrowScreen) {return;}
    if (this.initialX === null) {return;} 
    if (this.initialY === null) {return;} 
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY; 
    let diffX = this.initialX - currentX;
    let diffY = this.initialY - currentY;
 
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
        if (diffX > 0) {
        // swiped left
        if(this.sideBarRef.contains(e.target) && !this.longTouch){
          //this.setState(() => ({sideBarTransform: 'translate3d(-260px,0,0)'}));
          this.props.store.set("sideBarIsHidden", true);
        }
      } else {
        // swiped right
        if(this.calendarBodyRef.contains(e.target) && this.initialX < 100 && this.props.store.sideBarIsHidden && !this.longTouch ){
          //this.setState(() => ({sideBarTransform: 'translate3d(0px,0,0)'}));
          this.props.store.set("sideBarIsHidden", false);
        }
      }  
    }
    /*else {
      // sliding vertically
      if (diffY > 0) {
        // swiped up
        console.log("swiped up");
      } else {
        // swiped down
        console.log("swiped down");
      }  
    } */
    this.initialX = null;
    this.initialY = null; 
  };

    setFocus() {
        if (this.setFocusToRef !== null) {
          this.setFocusToRef.focus();
        }
    }

    leapYear (year){
        if (year % 4 === 0) {
          if (year % 100 === 0) {
            if (year % 400 === 0) {
              return true;
            } else {return false}
          } else {return true};
        } else {return false}
    }
      
    amountOfDays (month, year){
        const monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let leap = this.leapYear (year);
        if (month === 1 && leap) { 
          return monthArray[month] += 1;
        } else return monthArray[month];
    }

    createCalendar (year, month) {
        
        let todayYear = this.todayYear;
        let todayMonth = this.todayMonth;
        let todayDate = this.todayDate;
        let firstDayOfMonth = (new Date(year, month, 1)).getDay();
        let calendar = [];
        let prevMonth, prevYear, nextMonth, nextYear, prevMonthNumberOfDays;
        let thisMonthNumberOfDays = this.amountOfDays(month, year);
        if (month > 0) {
          prevMonthNumberOfDays = this.amountOfDays (month - 1, year);
          prevMonth = month - 1; 
          prevYear = year;
        }
        else {
          prevMonthNumberOfDays = this.amountOfDays (11, year - 1);
          prevMonth = 11; 
          prevYear = year - 1;
        }
        if (month < 11) {
          nextMonth = month + 1; 
          nextYear = year;
        } 
        else {
          nextMonth = 0; 
          nextYear = year + 1;
        }
        //PREVIOUS MONTH
        for (let i = prevMonthNumberOfDays - firstDayOfMonth + 1; i < prevMonthNumberOfDays + 1; i++){
            calendar.push({label:i, className:'last-month', date:new Date(prevYear, prevMonth, i)});
        } 
        //CURRENT MONTH
        for (let i = 0; i < thisMonthNumberOfDays; i++){
            if ((year === todayYear)&&(month === todayMonth)&&(i+1===todayDate)) { 
              calendar.push({label:i+1, className:'today', date:new Date(year, month, i+1)});
            } else calendar.push({label:i+1, className:'current-month', date:new Date(year, month, i+1)})
        }
        //NEXT MONTH
        for (let i = 0; i < 42 - thisMonthNumberOfDays - firstDayOfMonth; i++){
            calendar.push({label:i+1, className:'next-month', date:new Date(nextYear, nextMonth, i+1)});
        }
        //check if to toggle the calendar
        if (this.state.regularCalendar){
            this.setState(() => ({calendar: calendar, currentYear: year, currentMonth: month}));
        }
        else {
            this.setState(() => ({calendar: calendar, currentYear: year, currentMonth: month, regularCalendar: true, setFocusTo: -1}));}
        console.log(calendar);
    }

    incrementMonth(){
        if (this.state.currentMonth < 11){
          this.createCalendar (this.state.currentYear, this.state.currentMonth+1);
        } else this.createCalendar (this.state.currentYear+1, 0);
    }
      
    decrementMonth(){
        if (this.state.currentMonth > 0){
          this.createCalendar (this.state.currentYear, this.state.currentMonth-1);
        } else this.createCalendar (this.state.currentYear-1, 11);
    }

    incrementYear(){
        let currentYear = this.state.currentYear;
        if(currentYear < this.todayYear + 100) {
            this.setState(() => ({currentYear: currentYear + 1}));
        }
    }
      
    decrementYear(){
        let currentYear = this.state.currentYear;
        if(currentYear > this.todayYear - 100) {
            this.setState(() => ({currentYear: currentYear - 1}));
        }
    }

    onArrowClick(increment){
        switch(increment) {
            case true:
                if(this.state.regularCalendar) {this.incrementMonth()}
                else{this.incrementYear()};
                break;
            case false:
                if(this.state.regularCalendar) {this.decrementMonth()}
                else{this.decrementYear()};
                break;
        }
    }

    toggleCalendar() {
        let calendar = this.state.regularCalendar;
        this.setState(() => ({regularCalendar: !calendar, setFocusTo: -1}));
    }

    monthPickerKeyDownHandler(e, index) {
        switch (e.keyCode)
        {
          case 13: //enter
            this.createCalendar(this.state.currentYear, index);
            break;
          case 39: // Right Arrow
            if (index<11) {this.setState(()=>({setFocusTo: index+1}))};
            break;
          case 37: //Left arrow
            if (index>0) {this.setState(()=>({setFocusTo: index-1}))};
            break;
          case 38: //Up Arrow
            if (index>3) {this.setState(()=>({setFocusTo: index-4}))};
            e.preventDefault();
            break;
          case 40: //Down Arrow
            if (index<9) {this.setState(()=>({setFocusTo: index+4}))};
            e.preventDefault();
            break;
          case 9: //tab
            this.toggleCalendar();
            break;
          default: break;
        }
    }

    calendarKeyDownHandler(e, index) {
        switch (e.keyCode)
        {
          case 13: //enter 
            break;
          case 39: // Right Arrow
            if (index < 41) {this.setState(()=>({setFocusTo: index+1}))};
            break;
          case 37: //Left arrow
            if (index > 0) {this.setState(()=>({setFocusTo: index-1}))};
            break;
          case 38: //Up Arrow
            if (index > 6) {this.setState(()=>({setFocusTo: index-7}))};
            e.preventDefault();
            break;
          case 40: //Down Arrow
            if (index < 35) {this.setState(()=>({setFocusTo: index+7}))};
            e.preventDefault();
            break;
          default: break;
        }
    }

    render() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var maxWidth = {};
        if (!this.state.regularCalendar) {maxWidth = {'maxWidth' : '500px'}};
        return (
          <div className={'lm-wrapper'} >
            <div ref={el => this.sideBarRef = el} style={ (this.props.store.narrowScreen && this.props.store.sideBarIsHidden) ? {"left":"-260px"} : {"left":"0px"}} >
              <div style={{"paddingRight": '0.9rem', "paddingLeft": '0.9rem'}}>
                <button className='big-blue-button mt-1'>National Event Calendar</button>
                <h3>Event calendar By Regions and chapters:</h3>
              </div>
              <ChapterList chapterList={this.state.chapters}/>
            </div>
            <div className = {(this.narrowScreen && !this.props.store.sideBarIsHidden) ? "black-layer-visible" : "black-layer-invisible"}></div>
            <div ref={el => this.calendarBodyRef = el} style={this.props.store.narrowScreen ? {"paddingLeft": "1rem"} : {"paddingLeft":"260px"}} className='flex-nowrap flex-flow-column align-center cw-100'>
                <div className='flex-nowrap justify-space-between align-end'>
                    <h1 className='h2 uppercase-text'><strong>Event Calendar</strong></h1>
                    <span>
                    {
                        !(this.state.currentMonth === this.todayMonth && this.state.currentYear === this.todayYear && this.state.regularCalendar) && 
                        <button
                            style={{'flexShrink' : '0'}}
                            className='round-button medium-round-button grey-outline-button' 
                            onClick={() => this.createCalendar(this.todayYear, this.todayMonth)}
                        >
                            <span>to Current Month</span>
                        </button>
                    }
                    </span>
                </div>
                <span className='mb-1 light-grey-text'><strong>Alabama,</strong> San Diego, California, <strong>Alabama,</strong> San Diego, California</span>

                <div className='month-picker mb-1 align-center' style={maxWidth}>
                    <button className='grey-SVG-button' onClick={() => this.onArrowClick(false)}>
                      <ArrowUpSVG />
                    </button>
                    <button className='h1' onClick={() => this.toggleCalendar()} disabled={this.state.regularCalendar ? false : true}>
                        {this.state.regularCalendar && monthNames[this.state.currentMonth] + ' '}<strong><b>{this.state.currentYear}</b></strong>
                    </button>
                    <button className='grey-SVG-button' onClick={() => this.onArrowClick(true)}>
                      <ArrowUpSVG svgClassName='flip180' />
                    </button>
                </div>

                {this.state.regularCalendar &&
                    <ul className='calendar-grid calendar-header light-grey-text uppercase-text nonselect'>
                        <li>Su</li>
                        <li>Mo</li>
                        <li>Tu</li>
                        <li>We</li>
                        <li>Th</li>
                        <li>Fr</li>
                        <li>Sa</li>
                    </ul>
                }
                {this.state.regularCalendar &&
                    <ul className='calendar-grid calendar-content dark-grey-text'>
                        {this.state.calendar.map((element, index) =>
                        {
                          let eventKey = element.date.getMonth().toString()+'-'+element.date.getDate().toString();
                            return (
                            <li 
                                key={index} 
                                className={element.className} 
                                tabIndex='0'
                                onKeyDown={(e) => this.calendarKeyDownHandler(e, index)}
                                ref={el => {if (index === this.state.setFocusTo) {this.setFocusToRef = el}}}
                            >
                              <div className={element.className}>
                                <span>
                                  <strong>{element.label}</strong>
                                  <a className='round-button small-round-button light-grey-outline-button' href='./event'>
                                    <PlusSVG />
                                  </a>
                                </span>
                                {this.state.events[eventKey] !== undefined &&
                                  <ul className='calendar-events-list'>{this.state.events[eventKey].map((event, index) => 
                                    <li key={index}>
                                      <span style={{'backgroundColor':event.color}}>{('0'+ event.hours.toString()).slice(-2)+':'+('0'+ event.minutes.toString()).slice(-2)+' '+(event.am ? "AM":"PM")}</span>
                                      <span style={{'color':event.color}}>{event.name}</span>
                                    </li>
                                    )}
                                  </ul>
                                }
                              </div>
                            </li>
                          );
                        }
                        )}
                    </ul>
                }
                {!this.state.regularCalendar &&
                    <div className='flex-nowrap justify-center'> 
                        <ul className='calendar-grid month-calendar-grid calendar-content dark-grey-text'>
                            {monthNames.map((element, index) =>
                                <li 
                                    key={index} 
                                    tabIndex='0'
                                    onClick={() => this.createCalendar(this.state.currentYear, index)}
                                    onKeyDown={(e) => this.monthPickerKeyDownHandler(e, index)}
                                    className={(this.state.currentYear === this.todayYear && index === this.todayMonth) ? 'today' : ''}
                                    ref={el => {if (index === this.state.setFocusTo) {this.setFocusToRef = el}}}
                                >
                                    <div>
                                        <span>
                                            <strong className='uppercase-text'>{element.slice(0,3)}</strong>
                                        </span>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                }
            </div>
          </div>
        );
    }
}

export default withStore(Calendar);