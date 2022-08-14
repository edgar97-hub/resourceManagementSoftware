import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import "./userProfile.scss";
//import { userProfileData } from '../../../data/dummy';
import { Button } from '../../../components';
import { useStateContext } from '../../../contexts/ContextProvider';
import avatar from '../../../data/avatar3.png';
import { FiSettings} from "@react-icons/all-files/fi/FiSettings";
import { AiOutlineCalendar} from "@react-icons/all-files/ai/AiOutlineCalendar";
import { Link } from "react-router-dom";
import {useRef, useEffect} from 'react';



const UserProfile = () => {

  const { currentColor } = useStateContext();

  var userProfileData =
  [
    {
      icon: <FiSettings size={20}/>,
      title: 'Settings',
      path: 'setting',
      desc: 'Account Settings',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
    },
    {
      icon: <AiOutlineCalendar size={20}/>,
      title: 'Calendar',
      desc: 'Messages & Emails',
      path: 'calendar',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
    },
  ]

  return (
    <div className="user-profile">
      <div className="user-detail">
        <p className="button-user">perfil del usuario</p>
        <Button
          icon={<MdOutlineCancel size={25}/>}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          bgColor="white"
          size="1xl"
          borderRadius="90%"
          height="40px"
        />
      </div>

      <div className="user-wrapp">
        <img
          className="user-img"
          src={avatar}
          alt="user-profile"
        />
        <div className='info-user'>
          <p className="p-1"> Michael Roberts </p>
          <p className="p-2">  Administrator   </p>
          <p className="p-3"> info@shop.com </p>
        </div>
      </div>


      <div className=''>
        {userProfileData.map((item, index) => (
          <div key={index} className="items" style={{height:"80px"}}>

            
            <Link to={{ pathname: "/"+ item.path}}  target="_blank" style={{ textDecoration: "none" }}>

              <button
                type="button"
                style={{ 
                  color: item.iconColor, 
                  backgroundColor: item.iconBg,
                  padding:"0.75rem",
                  //fontSize:"1.25rem",
                  lineHeight:"1.75rem", 
                  borderRadius:"0.5rem",
                  height:"50px",
                  border:"0",
                  //border: "0.5px rgb(48, 46, 46) solid"
                }}
                  className=""
              >
                {item.icon}
              </button>
            </Link>

            <Link to={{ pathname: "/"+ item.path}}  target="_blank" style={{ textDecoration: "none" }}>

              <div style={{ 
                                        //border: "0.5px rgb(48, 46, 46) solid",
                                        height:"50px",
                                        width:"190px"
                          }}>
                <p className=""style={{ 
                                        fontWeight: "600",
                                        //border: "0.5px rgb(48, 46, 46) solid",
                                        margin:"3px 5px",
                                      }}
                  >{item.title}</p>
              
                <p className=""
                              style={{
                                color: "#6B7280",
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                                margin:"0px 5px ",
                                //border: "0.5px rgb(48, 46, 46) solid",

                              }}> {item.desc} </p>
              </div>
            </Link>
          </div>
        ))}
      </div>


      <div className="btn-logout">

        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="100%"
          height="40px"
        />
      </div>
    </div>


  );
};

export default UserProfile;
