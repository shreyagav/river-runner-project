import React, { Component } from 'react';
import EventSVG from '../svg/EventSVG';
import ChaptersSVG from '../svg/ChaptersSVG';
import MembersSVG from '../svg/MembersSVG';
import ReportsSVG from '../svg/ReportsSVG';
import LogoSVG from '../svg/LogoSVG';
import UserSVG from '../svg/UserSVG';
import  CalendarSVG from '../svg/CalendarSVG';
import SignInSVG from '../svg/SignInSVG';
import SignOutSVG from '../svg/SignOutSVG';
import MenuSVG from '../svg/MenuSVG';
import { Link } from 'react-router-dom';

import { withStore } from './store';

class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
      this.state = {};
      this.signOut = this.signOut.bind(this);
    }

    signOut() {
        var me = this;
        fetch('/api/Account/SignOut')
            .then(function (data) { return data.json(); })
            .then(function (jjson) {
                if (jjson.result=='ok')
                    me.props.store.set('userInfo', null);
                    me.props.history.push('/');
            });
    }

  toggleChapters() {
    let sideBarIsHidden = this.props.store.sideBarIsHidden;
    this.props.store.set("sideBarIsHidden", !sideBarIsHidden);
  }

    render() {
        const showLogo = !this.props.store.narrowScreen;
        const user = this.props.store.userInfo;
    return (
      <header className="main-nav-wrapper">
            {this.props.store.narrowScreen && this.props.store.withSideBar &&
              <ul className="flex-nowrap main-nav">
                    <li hint='Filters' >
                    <button onClick={() => this.toggleChapters()}>
                        <div className='round-button big-round-button grey-outline-button'>
                            <MenuSVG />
                        </div>
                        <span>Filters</span>
                    </button>
                    </li>
              </ul>
            }
            
            {showLogo &&
                <a href="http://www.teamriverrunner.org" target="_self" style={{ "width": "260px", "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                <LogoSVG />
              </a>
            }
        
            <ul className="flex-nowrap main-nav">
                {this.props.match.path != "/" && <li hint='Calendar'>
                    <Link to="/">
                        <CalendarSVG />
                        <span>Calendar</span>
                    </Link>
                </li>}
                {this.props.match.path != "/chapters" && user && user.authType=="Admin" && <li hint='Chapters'>
                    <Link to="/chapters">
                        <ChaptersSVG />
                        <span>Chapters</span>
                    </Link>
                </li>}
                {this.props.match.path != "/events" && user && (user.authType == "Admin" || user.authType == "Secretary" )&&  <li hint="Events">
                    <Link to="/events">
                        <EventSVG />
                        <span>Events</span>
                    </Link>
                </li>}
                {this.props.match.path != "/members" && user && (user.authType == "Admin" || user.authType == "Secretary") &&<li hint='Member'>
                    <Link to="/members">
                        <MembersSVG />
                        <span>Members</span>
                    </Link>
                </li>}
                {this.props.match.path != "/reports" && user && (user.authType == "Admin" || user.authType == "Secretary") && <li hint='Reports'>
                    <Link to="/reports">
                        <ReportsSVG />
                        <span>Reports</span>
                    </Link>
                </li>}
        </ul>
        <ul className="flex-nowrap main-nav">
                {this.props.match.path != "/profile" && user && <li hint='Profile'>
                    <Link to="/profile">
                        <UserSVG />
                        <span className='sign-in ml-05' style={{ 'textTransform': "none" }}>Profile</span>
                    </Link>
                </li>}
                {user == null && (<li hint='Sign In'>
                    <Link to="/SignIn">
                        <SignInSVG />
                        <span className='sign-in' style={{ 'textTransform': "none" }}>Sign In</span>
                    </Link>
                </li>)}
                {user != null && (<li hint='Sign Out'>
                    <a href="javascript:" onClick={this.signOut}>
                        <SignOutSVG />
                        <span className='sign-in' style={{ 'textTransform': "none" }}>Sign Out</span>
                    </a>
                </li>)}
        </ul>
      </header>
    );
  }
}

export default withStore(NavMenu);
