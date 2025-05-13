import React from 'react'
import * as Icons from "react-icons/vsc"
// import { useDispatch } from 'react-redux';
import { useLocation, NavLink, matchPath } from 'react-router-dom';


const SidebarLink = ({link, iconName}) => {
    
    // when we get iconName as children, this is how we can render that
    const Icon = Icons[iconName];
    const location = useLocation();
    // const dispatch = useDispatch();
    
    // matchroute is matching path that we entered with pathname in url
    // this will always be used when we want to show any tab active
    // same thing used in navbar also
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    // active link will be shown through matchroute
    // agar link.path match hokar true return karega to yellow color show hoga
    <NavLink to={link.path} className={`relative px-8 py-2 text-base font-medium ${matchRoute(link.path)
     ? "bg-yellow-800 text-yellow-50" : " bg-opacity-0 text-richblack-300"}
     transition-all duration-200`}>
     {/* side yellow border in very tab */}
     <span 
     className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50
     ${matchRoute(link.path) ? "opacity-100": "opacity-0"}`}></span>

     <div className='flex items-center gap-2'>
        <Icon className="text-lg"/>
        <span>{link.name}</span>
     </div>

    </NavLink>
  )
}

export default SidebarLink