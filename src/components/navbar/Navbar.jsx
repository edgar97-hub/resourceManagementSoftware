import "./navbar.scss";
import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {  Chat, Notification, UserProfile }  from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import avatar from '../../data/avatar3.png';
import Tooltip from 'react-tooltip-lite';
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Tooltip2 from "@material-ui/core/Tooltip";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (

  <Tooltip background= "#595d64" color="white" content={title} position="BottomCenter" className="test">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="button-background-icon"
    >
      <span
        style={{ background: dotColor }}
        className="button-span"
      />
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="navbar">
 
       <div className="wrapper-2" style={{ display: "flex"}}>
        
        <NavButton   title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton  title="Notificación" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />

        <Tooltip style={{ borderRadius: "10px" }} background= "#595d64"  color="white" content="perfil del usuario" position="BottomCenter" className="Tooltip">
          <div
            className="tooltip-user-profile"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="tooltip-user-profile-img"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="span-text-1">Hi,</span>{' '}
              <span className="span-text-2">
                Michael
              </span>
            </p>
            <MdKeyboardArrowDown  style={{ color: "#9CA3AF" }}/>
          </div>
        </Tooltip>

        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
      </div>

    </div>
  );
};

export default Navbar;
