// vendors
import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import wait from 'waait'
import { ShoppingCart, MapPin, ArrowFatLeft } from '@phosphor-icons/react'

// assets
import coffeeDeliveryLogo from '../assets/coffee-delivery-logo.svg'

// context
import { ShoppingContext } from '../contexts/ShoppingContext'

export default function Header() {
  const { locale, sumAmountListItems, changeLoading, resetAllContext } =
    useContext(ShoppingContext)
  const nav = useNavigate()

  const currentPage = useLocation()

  async function returnHome() {
    if (currentPage.pathname === '/success') resetAllContext()
    changeLoading(true)
    await wait(500)
    changeLoading(false)
    nav('/')
  }

  return (
    <div className='tablet:flex w-full px-[.2rem] tablet:px-0 py-[1rem]  tablet:py-[2rem] justify-between items-center'>
      <div
        className={`${
          currentPage.pathname === '/success'
            ? 'justify-center'
            : 'justify-between'
        } w-full flex items-center`}
      >
        <div
          className={`${
            currentPage.pathname === '/success' || currentPage.pathname !== '/'
              ? 'hidden '
              : 'flex opacity-0'
          } `}
        >
          {' '}
          <ArrowFatLeft
            className='flex tablet:hidden'
            size={22}
            color='#8047F8'
            weight='fill'
          />
        </div>
        <Link
          className={`${
            currentPage.pathname === '/success' || currentPage.pathname === '/'
              ? 'hidden'
              : 'flex'
          } `}
          to='/'
        >
          <ArrowFatLeft
            className='flex tablet:hidden'
            size={22}
            color='#8047F8'
            weight='fill'
          />
        </Link>
        <button
          className='flex  tablet:w-full '
          type='button'
          onClick={returnHome}
        >
          <img src={coffeeDeliveryLogo} alt='coffee delivery logo' />
        </button>
        <div
          className={`${
            currentPage.pathname === '/success'
              ? 'opacity-0 pointer-events-none w-0'
              : 'opacity-100'
          } flex tablet:hidden tablet:mt-0  justify- tablet:justify-center`}
        >
          <Link
            to='/checkout'
            className={`${
              sumAmountListItems && sumAmountListItems >= 1
                ? 'opacity-100'
                : 'opacity-50 pointer-events-none'
            }   flex p-2 gap-3 rounded-md bg-yellow-light  justify-center items-center`}
          >
            <ShoppingCart
              className='flex text-purple-dark text-sm'
              size={22}
              color='#C47F17'
              weight='fill'
            />
          </Link>

          <div
            className={`${
              currentPage.pathname !== '/success' &&
              sumAmountListItems &&
              sumAmountListItems >= 1
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none '
            } 

           
            
            ${
              currentPage.pathname === '/checkout'
                ? 'pointer-events-none'
                : 'pointer-events-auto'
            }  flex justify-center items-center text-white font-roboto text-sm font-bold -ml-3 -mt-3 h-6 w-6 bg-yellow-dark rounded-full transition duration-200`}
          >
            {sumAmountListItems}
          </div>
        </div>
      </div>
      <div className=' tablet:mt-0 mt-4 w-full  tablet:w-auto tablet:flex gap-[.75rem]'>
        <div className='flex w-full min-w-[14rem] px-4 py-2 gap-3 rounded-md bg-purple-light  justify-center items-center'>
          <MapPin size={22} color='#8047F8' weight='fill' />
          <span className='flex text-purple-dark text-sm font-roboto'>
            {locale === undefined ? 'Localização não encontrada' : locale}
          </span>
        </div>

        <div
          className={`${
            currentPage.pathname === '/success'
              ? 'opacity-0 pointer-events-none w-0'
              : 'opacity-100'
          } hidden tablet:flex  tablet:mt-0 mt-5 justify-end tablet:justify-center`}
        >
          <Link
            to='/checkout'
            className={`${
              sumAmountListItems && sumAmountListItems >= 1
                ? 'opacity-100'
                : 'opacity-50 pointer-events-none'
            } flex p-2 gap-3 rounded-md bg-yellow-light  justify-center items-center`}
          >
            <ShoppingCart
              className='flex text-purple-dark text-sm'
              size={22}
              color='#C47F17'
              weight='fill'
            />
          </Link>

          <div
            className={`${
              currentPage.pathname !== '/success' &&
              sumAmountListItems &&
              sumAmountListItems >= 1
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            } ${
              currentPage.pathname === '/checkout'
                ? 'pointer-events-none'
                : 'pointer-events-auto'
            } flex justify-center items-center text-white font-roboto text-sm font-bold -ml-3 -mt-3 h-6 w-6 bg-yellow-dark rounded-full transition duration-200`}
          >
            {sumAmountListItems}
          </div>
        </div>
      </div>
    </div>
  )
}
