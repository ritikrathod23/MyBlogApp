import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../appwrite/Auth'
import { useEffect, useState } from 'react'
import userIcon from '../svg/userIcon.svg'
import mylogo from '../svg/mylogo.png'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const navigate = useNavigate();
  const [session , setSession] = useState(null);
  const [user , setUser] = useState(null);

  useEffect(()=>{
  const checkSession = async() =>{
    const getsession = await AuthService.getUserSession();
    const  getUser = await AuthService.getCurrentUser();
    setUser(getUser)
    setSession(getsession)
    }
    checkSession();
  },[])

  const handleLogout = async () => {
    try {
      const currentSession = await AuthService.getUserSession();
      if (currentSession) {
        console.log("A session is already active. Logging out the current session...");
        await AuthService.logOut();
        setSession(null)
        setUser(null)
        navigate('/');
      }
    } catch (error) {
      console.error("Error logging out:", error.message || error);
    }
  };

  const navigation = [
    { name: 'Dashboard', url: '/', current: true },
    { name: 'Team', url: '/', current: false },
    { name: 'Projects', url: '/', current: false },
    { name: 'Calendar', url: '/', current: false },
  ]
  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src={mylogo}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <li className='list-none' key={item.name}>
                    <button
                    onClick={() => navigate(item.url)}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium  ',
                    )}
                  >
                    {item.name}
                    </button>
                  </li>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button> */}

            {/* Profile dropdown */}
            {session && (
            <div>
            
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img width={35}
                      alt=""
                      src={userIcon}
                      className=" invert rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  {/* <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Settings
                    </a>
                  </MenuItem> */}
                  <MenuItem>
                    <Link onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700">
                      Sign out
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>

            
            </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              onClick={() => navigate(item.url)}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
