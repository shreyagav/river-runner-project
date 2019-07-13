import React, { Component } from 'react';
import MultiDropDown from '../MultiDropDown/MultiDropDown';
import DatePicker from '../DatePicker';
import CheckBoxSVG from '../../svg/CheckBoxSVG';
import { withStore } from '../store';
import CheckBox from '../CheckBox';

class MemberTRRInfo extends Component {

    render() {
        return (
            <div className = 'ml-1 mt-3 mr-1'>
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
                        <li>
                            <p>Sponsored By:</p>
                            <MultiDropDown
                                ref={this.props.setSponsoredByDropDownRef}
                                list={[{name:'Sponsored By Option 1'}, {name:'Sponsored By Option 2'}, {name:'Sponsored By Option 3'}]}
                                multiSelect={false}
                                keyProperty='name'
                                textProperty='name'
                                defaultValue={this.props.member.sponsoredBy}
                            placeholder="Sponsored By"
                            disabled={true}
                                onDropDownValueChange={value => this.props.updateMemberProperty("sponsoredBy", value)}
                            />
                        </li>

                        <li>
                            <p>Status:</p>
                            <MultiDropDown
                                ref={this.props.setStatusDropDownRef}
                                list={[{name:'Staff', id:53}, {name:'Paddler', id: 54}]}
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
                                list={[{name:'AuthLevel 1'}, {name:'AuthLevel 2'}, {name:'AuthLevel 3'}]}
                                multiSelect={false}
                                keyProperty='name'
                                textProperty='name'
                                defaultValue={this.props.member.authLevel}
                                placeholder="Select Authentification Level"
                                onDropDownValueChange={value => this.props.updateMemberProperty("authLevel", value)}
                            />
                        </li>
                        <li>
                            <p>TRR User Type:</p>
                            <MultiDropDown
                                ref={this.props.setUserTypeDropDownRef}
                                list={[{ name: 'Staff', id: 53 }, { name: 'Paddler', id: 54 }]}
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