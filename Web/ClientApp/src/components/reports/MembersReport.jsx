﻿import React, { Component, useState, useRef } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { withStore } from '../store'
import Alert from '../Alert'
import { Service } from '../ApiService'
import Loader from '../Loader'
import SaveToExcelSVG from '../../svg/SaveToExcelSVG'
import './report.css'

class MembersReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        }
        this.reactTable = null;
        this.donwloadExcel = this.donwloadExcel.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        Service.getMembersReport().then(members => {
            this.setState({ data: members, loading: false })
        });
    }

    donwloadExcel() {
        this.setState({ loading: true });
        Service.download('/api/Reports/MembersToExcel').then(blob => {
            Service.throwBlob(blob, 'Members.xlsx');
            this.setState({ loading: false });
        });
    }

    handleTrProps = (state, rowInfo, column) => {
        var me = this;
        return {
            onClick: () => {
                me.props.history.push('/member/' + rowInfo.original.id);
            },
            style: {
                cursor: 'pointer'
            },
            className:'report-row'
        };
    }

    render() {
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        const columns = [
            { Header: "Name", columns: [{ Header: "First", accessor: 'firstName', filterable: true }, { Header: "Last", accessor: 'lastName', filterable: true }, { Header: "User", accessor: 'userName', filterable: true }]},
            { Header: "Contact", columns: [{ Header: "Email", accessor: 'email', filterable: true }, { Header: "Phone", accessor: 'phone', filterable: true }]},
            { Header: "Basic Info", columns: [{ Header: "Gender", accessor: 'gender', filterable: true }, { Header: "Chapter", accessor: 'chapter', filterable: true }, { Header: "Joined", accessor: 'joined', filterable: true, Cell: props => <span className='number'>{new Date(props.value).toLocaleString('en-US', options)}</span> }]},
            { Header: "Emergency Contact", columns: [{ Header: "Name", accessor: 'emergencyContactName', filterable: true },{ Header: "Email", accessor: 'emergencyContactEmail', filterable: true },{ Header: "Phone", accessor: 'emergencyContactPhone', filterable: true }]},
            { Header: "Options", columns: [{ accessor: 'options', filterable: true, Cell: props => <span className='number'>{props.value.map(a => a + ", ")}</span> }]},
        ]
        return (
        <div>
            <div className='filter-nav-wrapper'>
                <div className='filter-wrapper'>
                </div>
                <button className='round-button medium-round-button outline-on-hover' onClick={this.donwloadExcel} >
                    <SaveToExcelSVG />
                    <span>Excel</span>
                </button>
            </div>
            {this.state.loading && <Loader />}
            <h3 className='mr-05 ml-05 mt-2 mb-2 uppercase-text'><strong>Members</strong> report</h3>
                <ReactTable ref={r => (this.reactTable = r)} data={this.state.data} columns={columns} getTrProps={this.handleTrProps} onFilteredChange={() => console.log(this.reactTable.getResolvedState().sortedData)} />
        </div>);
    }

}
export default withStore(MembersReport);