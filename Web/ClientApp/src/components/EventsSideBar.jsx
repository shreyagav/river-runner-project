import React, { Component } from 'react';
import './Calendar.css'
import { withStore } from './store';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import MultiDropDown from './MultiDropDown/MultiDropDown';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import SearchUpSVG from '../svg/SearchUpSVG';
import SearchInput from './SearchInput'
import StatusDraftSVG from '../svg/StatusDraftSVG'
import StatusDeletedSVG from '../svg/StatusDeletedSVG';
import StatusPublishedSVG from '../svg/StatusPublishedSVG';
import StatusCanceledSVG from '../svg/StatusCanceledSVG';

class EventsSideBar extends Component {
    static displayName = EventsSideBar.name;
    
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            dateFrom: null,
            dateTo: null,
            timeFrom: {},
            timeTo: {},
            typeOfEvent: -1,
            status: '',
            color: '',
        };
        this.simpleBarWrapperRef = null;
        this.dateStartDropDownRef = null;
        this.dateEndDropDownRef = null;
        this.timeFromDropDownRef = null;
        this.timeToDropDownRef = null;
        this.typeOfEventDropDownRef = null;
        this.statusDropDownRef = null;
        this.colorDropDownRef = null;
    }

    componentWillMount(){
        /*document.addEventListener('wheel', this.handleWheel, {passive : false});*/
        this.setFilters();
    }
    componentWillUnmount(){
        /*document.removeEventListener('wheel', this.handleWheel, {passive : false});*/
    }

    /*handleWheel = (e) => {
        if (this.simpleBarRef === null || !(this.simpleBarRef.contains(e.target))) {return;}
        var cancelScrollEvent = function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            e.returnValue = false;
            return false;
        };
        var elem = this.simpleBarRef;
        var wheelDelta = e.deltaY;
        var height = elem.clientHeight;
        var scrollHeight = elem.scrollHeight;
        var parent = elem.parentElement;
        var parentTop = parent.getBoundingClientRect().top;
        var top = elem.getBoundingClientRect().top;
        var scrollTop = parentTop - top;
        var isDeltaPositive = wheelDelta > 0;
        if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
            parent.scrollTop = scrollHeight;
            return cancelScrollEvent(e);
        }
        else {
            if (!isDeltaPositive && -wheelDelta > scrollTop) {
                parent.scrollTop = 0;
                return cancelScrollEvent(e);
            }
        }
    }*/

    setFilters() {
        let filters = this.props.filters;
        let datefrom = new Date();
        datefrom.setDate(1);
        let dateto = new Date();
        dateto.setMonth(dateto.getMonth() + 1);
        dateto.setDate(1);
        let initialTitle = '';
        let initialDateFrom = datefrom;
        let initialDateTo = dateto;
        let initialTimeFrom = {activated: false, hours: 8, minutes: 0, am: true};
        let initialTimeTo = {activated: false, hours: 8, minutes: 0, am: true};
        let initialTypeOfEvent = '';
        let initialStatus = '';
        let initialColor = '';
        filters.splice(0, filters.length);
        filters.push({name: "title", value: initialTitle});
        filters.push({name: "dateFrom", value: initialDateFrom});
        filters.push({name: "dateTo", value: initialDateTo});
        filters.push({name: "timeFrom", value: initialTimeFrom});
        filters.push({name: "timeTo", value: initialTimeTo});
        filters.push({name: "typeOfEvent", value: initialTypeOfEvent});
        filters.push({name: "status", value: initialStatus});
        filters.push({ name: "chapters", value: [] });

        let initialState = {
            title: initialTitle, 
            dateFrom: initialDateFrom, 
            dateTo: initialDateTo, 
            timeFrom: initialTimeFrom, 
            timeTo: initialTimeTo,
            typeOfEvent: initialTypeOfEvent,
            status: initialStatus,
            color: initialColor
        };
        this.setState(initialState);
        this.props.updateFilters(filters);
    }

    updateFilter(filterName, value){
        let filters = this.props.filters;
        let element = filters.find(element => element.name === filterName); 
        element.value = value;
        this.props.updateFilters(filters);
    }

    onTextFilterChange(filter, value){
        clearTimeout(this.timeoutVar);
        let newState = this.state;
        newState[filter] = value;
        this.setState({ newState }, () => { 
            this.timeoutVar = setTimeout(() => {this.updateFilter(filter, value)}, 500) 
        });
    }

    render() {
        const chapterFilter = this.props.filters.find(element => {
            if (element.name === 'chapters') { return element }
        })
        return (
            <div style={{"height": "100%"}} data-simplebar >
                <div className = 'mt-1 pl-1 pr-1 filters'>
                    <div className='flex-nowrap justify-space-between align-end mb-1'>
                        <h3>Filters</h3>
                        <button 
                            className='round-button medium-round-button grey-outline-button pr-05 pl-05'
                            onClick={() => this.setFilters()} 
                        >Clear Filters</button>
                    </div>

                    <p>Title:</p>
                    <SearchInput 
                        placeholder='Title'
                        /*wrapperClassName = 'm-1'*/
                        value={this.state.title}
                        onValueChange={(value) => this.onTextFilterChange("title", value)}
                        onClearValueButtonClick={() => this.onTextFilterChange("title", "")}
                    />

                    <p>CHAPTER:</p>
                    <MultiDropDown
                        ref={el => this.chaptersDropDownRef = el}
                        list={this.props.store.chapterList}
                        multiSelect={true}
                        keyProperty='id'
                        textProperty='state'
                        expandBy='chapters'
                        expandedTextProperty='name'
                        expandedKeyProperty='id'
                        expandedMultiSelect={true}
                        defaultValue={chapterFilter ? chapterFilter.value : []}
                        placeholder='National'
                        onDropDownValueChange={value => this.updateFilter("chapters", value)}
                    />

                    <p>From:</p>
                    <DatePicker 
                        value={this.state.dateFrom}
                        maxDate={this.state.dateTo}
                        ref={el => this.dateStartDropDownRef = el}
                        noClearButton={true}
                        onSelect={value => {
                            this.setState({dateFrom: value});
                            this.updateFilter("dateFrom", value);
                        }}
                    />

                    <p>To:</p>
                    <DatePicker 
                        value={this.state.dateTo}
                        minDate={this.state.dateFrom}
                        ref={el => this.dateEndDropDownRef = el}
                        noClearButton={true}
                        onSelect={value => {
                            this.setState({dateTo: value});
                            this.updateFilter("dateTo", value);
                        }}
                    />

                    <p>Start Time:</p>
                    <TimePicker 
                        ref={el => this.timeFromDropDownRef = el}
                        timePickerMode={true} 
                        value={this.state.timeFrom}
                        onChange = {value => {
                            this.setState({timeFrom: value});
                            this.updateFilter("timeFrom", value);
                        }}
                    />
                    <p>End Time:</p>
                    <TimePicker 
                        ref={el => this.timeToDropDownRef = el}
                        timePickerMode={true} 
                        value={this.state.timeTo}
                        onChange = {value => {
                            this.setState({timeTo: value});
                            this.updateFilter("timeTo", value);
                        }}
                    />

                    <p>Type of event:</p>
                    <MultiDropDown
                        ref={el => this.typeOfEventDropDownRef = el}
                        list={this.props.store.eventTypes}
                        keyProperty='id'
                        textProperty='title'
                        defaultValue={this.state.typeOfEvent}
                        placeholder='Type of Event'
                        onDropDownValueChange = {value => {
                            this.setState({typeOfEvent: value});
                            this.updateFilter("typeOfEvent", value);
                        }}
                    />

                    <p>Status:</p>
                    <MultiDropDown
                        ref={el => this.statusDropDownRef = el}
                        list={[{name: 'Draft', img: <StatusDraftSVG />}, {name: 'Published', img: <StatusPublishedSVG />}, /* {name: 'Closed'}, */ {name: 'Deleted', img: <StatusDeletedSVG />}, {name: 'Canceled', img: <StatusCanceledSVG />}]} 
                        keyProperty='name'
                        textProperty='name'
                        defaultValue={this.state.status}
                        placeholder='Status'
                        onDropDownValueChange = {value => {
                            this.setState({status: value});
                            this.updateFilter("status", value);
                        }}
                    />

                    
                </div>
            </div>
        );
    }
}

export default withStore(EventsSideBar);