import React from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';
import { connect } from 'react-redux'
import { history } from '../../store'

const Profile = ({user}) => (

    <AppHeaderDropdown direction="down">
      <DropdownToggle nav>
        <img src={'/assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
      </DropdownToggle>
      <DropdownMenu right style={{ right: 'auto' }}>
        <DropdownItem header tag="div" className="text-center"><strong>Account({user?user.username:''})</strong></DropdownItem>
        <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
        <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
        <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
        <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
        <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
        <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
        <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
        <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
        <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
        <DropdownItem divider />
        <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
        <DropdownItem onClick={() => {history.push('/logout')}}><i className="fa fa-lock"></i> Logout</DropdownItem>
      </DropdownMenu>
    </AppHeaderDropdown>

)

function mapStateToProps(state) {
  return {
      user: state.user.user
  }
}

export default connect(mapStateToProps)(Profile);
