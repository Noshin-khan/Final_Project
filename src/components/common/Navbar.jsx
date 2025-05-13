import React, { useEffect, useState } from 'react'
import {NavbarLinks} from '../../data/navbar-links'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { Link, matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"

import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { ACCOUNT_TYPE } from '../../utils/constants'
import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI'
import { setCategory } from '../../slices/courseSlice'


const Navbar = () => {
  // console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  
  const location = useLocation();
  const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
      }

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState([]);
  const fetchSublinks = async() => {
    setLoading(true);
     const result = await fetchCourseCategories()
    //  console.log(result)
     if(result.length > 0) {
      setSubLinks(result);
      dispatch(setCategory(result))
     }
    setLoading(false);
  }
  useEffect(() => {
     fetchSublinks();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // console.log("sub links", subLinks)

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700
                    ${location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        {/* Logo */}
          <Link to={'/'}>
             <img src={Logo}
                 alt='AppLogo' loading='lazy' width={160} height={42}
                />
          </Link>
         
        {/* NavLinks */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center text-richblack-800">Loading...</p>
                        ) : subLinks.length > 0 ? (
                          <>
                            {subLinks.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/SignUp/Dashboard */}
        <div className='flex gap-x-4 items-center'>
             {
              user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to="/dashboard/cart" className='relative flex text-white '>
               
                <AiOutlineShoppingCart size={20}/>
                {
                  totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }

                </Link>
              )
             }
             {
              token === null && (
                <Link to='/login'> 
                        <button className='border border-richblack-700 bg-richblack-800 px-[14px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-900 hover:text-richblack-25 transition-all duration-200'>
                          LogIn
                        </button>
                </Link>
              )
             }

             {
              token === null && (
                <Link to='/signUp'> 
                <button className='border border-richblack-700 bg-richblack-800 px-[14px] py-[8px] text-richblack-100 rounded-md hover:bg-richblack-900 hover:text-richblack-25 transition-all duration-200'>

                  SignUp
                </button>

                </Link>
              )
             }
             {
              token !== null && <ProfileDropDown/>
             }
        </div>
        </div> 
    </div>
  )
}

export default Navbar
