import React, { Component } from 'react';
import MultiDropDown from '../MultiDropDown/MultiDropDown';
import DatePicker from '../DatePicker';
import CheckBoxSVG from '../../svg/CheckBoxSVG';
import { withStore } from '../store';
import CheckBox from '../CheckBox';
import { filterSearch } from '../filterSearch'

class MemberTRRInfo extends Component {

    render() {
        return (
            <div>
                <CheckBox 
                    className = 'mb-05'
                    onClick = {() => this.props.updateMemberProperty("releaseSigned", !this.props.member.releaseSigned)}
                    checked = {this.props.member.releaseSigned}
                    labelClassName = 'uppercase-text bold-text'
                    labelText = 'Release Signed'
                />

                <CheckBox 
                    className = 'mb-05'
                    onClick = {() => this.props.updateMemberProperty("liabilitySigned", !this.props.member.liabilitySigned)}
                    checked = {this.props.member.liabilitySigned}
                    labelClassName = 'uppercase-text bold-text'
                    labelText = 'Liability Signed'
                />
                <CheckBox
                    className='mb-05'
                    onClick={() => this.props.updateMemberProperty("trrBackgroundCheck", !this.props.member.trrBackgroundCheck)}
                    checked={this.props.member.trrBackgroundCheck}
                    labelClassName='uppercase-text bold-text'
                    labelText='TRR Background Check'
                />
                <CheckBox
                    className='mb-05'
                    onClick={() => this.props.updateMemberProperty("codeOfConductTraining", !this.props.member.codeOfConductTraining)}
                    checked={this.props.member.codeOfConductTraining}
                    labelClassName='uppercase-text bold-text'
                    labelText='Code Of Conduct Training'
                />
                <CheckBox
                    className='mb-05'
                    onClick={() => this.props.updateMemberProperty("otherBackgroundCheck", !this.props.member.otherBackgroundCheck)}
                    checked={this.props.member.otherBackgroundCheck}
                    labelClassName='uppercase-text bold-text'
                    labelText='Other Background Check'
                />
                {this.props.member.otherBackgroundCheck && (<div><p>Other Background Check:</p>
                    <textarea
                        placeholder='Other Background Check Comments'
                    value={this.props.member.otherBackgroundCheckComment}
                        onChange={e => this.props.updateMemberProperty("otherBackgroundCheckComment", e.target.value)}
                    /></div>)}
                <div className = 'flex-nowrap align-center mt-2 mb-2'>
                    <span className='line'></span>
                        <p className='pr-05 pl-05'><strong>ACTIVE</strong></p>
                    <span className='line'></span>
                </div>

                <div className='flex-nowrap justify-left align-center'>
                    <ul className='input-fields first-child-text-125'>
                        <li>
                            <CheckBox 
                                style = {{"marginTop":"0.6rem"}}
                                onClick = {() => this.props.updateMemberProperty("activeMember", !this.props.member.activeMember)}
                                checked = {this.props.member.activeMember}
                                labelClassName = 'uppercase-text bold-text'
                                labelText = 'Active'
                            />

                            {!this.props.member.activeMember &&
                                <div className='flex-nowrap justify-left align-center break-at-500'>
                                    <p className='break-at-500-p'>Deactive Cause:</p>
                                    <input 
                                        type='text' 
                                        placeholder='Deactive Cause' 
                                        value={this.props.member.deactiveCause}
                                        onChange={e => this.props.updateMemberProperty("deactiveCause", e.target.value)}
                                    />
                                </div>
                            }
                        </li>
                    </ul>
                </div>
                <div className = 'flex-nowrap align-center mt-2 mb-2'>
                    <span className='line'></span>
                    <p className='pr-05 pl-05'><strong>INFO</strong></p>
                    <span className='line'></span>
                </div>
                <ul className='input-fields first-child-text-125 mt-3'>
                        <li>
                            <p>Join Date:</p>
                            <DatePicker 
                                ref={this.props.setJoinDateDropDownRef}
                                value={this.props.member.joinDate}
                                onSelect={value => {this.props.updateMemberProperty("joinDate", value)}}
                            />
                        </li>
                    {/*<li>
                            <p>Sponsored By:</p>
                            <MultiDropDown
                                ref={this.props.setSponsoredByDropDownRef}
                                list={this.props.sponsors}
                                search={(list, filter, param) => { 
                                    return filterSearch(list, filter, ['name']);
                                    //return list.filter(a => a.name.indexOf(filter) >= 0) 
                                }}
                                multiSelect={false}
                                keyProperty='id'
                                textProperty='name'
                                defaultValue={this.props.member.sponsoredById}
                                placeholder="Sponsored By"
                                onDropDownValueChange={value => { this.props.updateMemberProperty("sponsoredById", value) }}
                            />
                        </li>*/}

                        <li>
                            <p>Status:</p>
                            <MultiDropDown
                                ref={this.props.setStatusDropDownRef}
                            list={[{ name: 'Discharged', id: 88 }, { name: 'Unknown', id: 89 }, { name: 'None', id: 92 }, { name: 'Active', id: 51 }, { name: 'Retired', id: 52 }]}
                                multiSelect={false}
                                keyProperty='id'
                                textProperty='name'
                                defaultValue={this.props.member.status}
                                placeholder="Status"
                                onDropDownValueChange={value => this.props.updateMemberProperty("status", value)}
                            />
                        </li>
                        <li>
                            <p>Role:</p>
                            <MultiDropDown
                            ref={this.props.setAuthLevelDropDownRef}
                            list={this.props.roles}
                                multiSelect={true}
                                keyProperty='id'
                                textProperty='name'
                                defaultValue={this.props.member.roles}
                                placeholder="Select Authentification Level"
                            onDropDownValueChange={value => this.props.updateMemberProperty("roles", value)}
                            />
                        </li>
                        <li>
                            <p>TRR User Type:</p>
                            <MultiDropDown
                                ref={this.props.setUserTypeDropDownRef}
                                list={[{ name: 'Civilian', id: 54 }, { name: 'Veteran', id: 53 }, { name: 'Veteran Family/Caregiver', id: 55 }]}
                                multiSelect={false}
                                keyProperty='id'
                                textProperty='name'
                                defaultValue={this.props.member.userType}
                                placeholder="Select User Type"
                                onDropDownValueChange={value => this.props.updateMemberProperty("userType", value)}
                            />
                        </li>
                        <li>
                            <p>Comments:</p>
                            <textarea 
                                placeholder='Comments'
                                value={this.props.member.comments}
                                onChange={e => this.props.updateMemberProperty("comments", e.target.value)}
                            />
                        </li>
                    </ul>
            </div>
        );
    }
}

export default withStore(MemberTRRInfo);