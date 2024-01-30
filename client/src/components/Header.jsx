import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//To check wether the user is sign in or not we will use redux toolkit's useSelector
import { toggleTheme } from '../redux/theme/themeSlice';
export default function Header() {
    const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  //To check wether the user signed in or not
  const { currentUser } = useSelector((state) => state.user);

  const {theme} = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 rounded-lg text-white'>Varun's</span>
            Blog
        </Link>
        <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill onClick={() => dispatch(toggleTheme())}
          >
             {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {/* <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link> */}

{currentUser ? (
  <Dropdown arrowIcon={false} inline={true} label={<Avatar alt="User settings" img={currentUser?.profilePicture} rounded={true} />
  }
  >
    <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />

            <Dropdown.Item>SignOut</Dropdown.Item>
  </Dropdown>


) : (
  <Link to='/sign-in'>
    <Button gradientDuoTone='purpleToBlue' outline>
      Sign In
    </Button>
  </Link>
)}

        
          {/* For hamburger */}
          <Navbar.Toggle /> 
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
            <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
          </Navbar.Collapse>
    </Navbar>
  )
}
