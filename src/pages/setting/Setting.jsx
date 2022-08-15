import React from 'react'
import "./setting.scss"
import {useRef, useEffect} from 'react';
import { Test, Roles, Users} from "../../components";

const Setting = () => {
    useEffect(() => {
        const tabs = document.querySelectorAll("[data-tab-target]");
        const tabContents = document.querySelectorAll("[data-tab-content]");
        tabs.forEach(tab =>{
            tab.addEventListener('click',()=>{
                const target = document.querySelector(tab.dataset.tabTarget);
                tabContents.forEach(item =>{
                    item.classList.remove("active");
                });
                target.classList.add("active");
                tabs.forEach(item =>{
                    item.classList.remove("active");
                });
                tab.classList.add("active");
                target.classList.add("active");
            });
        });
      }, []);

  return (
    <div className="wrapper-setting">
   
        <ul className='tabs'>    
            <li data-tab-target="#home" className='active tab'>Roles</li>
            <li data-tab-target="#pricing" className='tab'>Organigrama</li>
            <li data-tab-target="#about" className='tab'>Procesos</li>
            <li data-tab-target="#usuarios" className='tab'>Usuarios</li>
        </ul>
        <div className='tab-content'>
            <div id='home' data-tab-content className='active'>
                <Roles/>
            </div>
            <div id='pricing' data-tab-content>
                
            </div>
            <div id='about' data-tab-content>
                <h1>Procesos</h1>
                <h1>this is the about</h1>
            </div>
            <div id='usuarios' data-tab-content>
            <Users/>

            </div>
        </div> 
    </div>

  )
}

export default Setting