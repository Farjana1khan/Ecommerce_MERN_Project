import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'

    
  },
  {
    title: 'About',
    path: '/about',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaShoppingCart />,
    cName: 'nav-text'
  },
  {
    title: 'Contact',
    path: '/contact',
    icon: <MdIcons.MdContactMail />,
    cName: 'nav-text'
  },

  {
    title: '',
    path: '/search',
    icon: <IoIcons.IoMdSearch />,
    cName: 'nav-text'
  },
  {
    title: '',
    path: '/login',
    icon: <IoIcons.IoMdLogIn />,
    cName: 'nav-text'
  },
 

  

  
 

  
  
];