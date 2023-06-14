// vendors
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

// components
import Header from '../components/Header'
import Loading from '../components/Loading'

// context
import { ShoppingContext } from '../contexts/ShoppingContext'

export function DefaultLayout() {
  const { loading } = useContext(ShoppingContext)

  return (
    <div className='flex flex-1'>
      <div
        className={`${
          loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition duration-300`}
      >
        <Loading />
      </div>
      <div className='flex px-[1rem] tablet:px-[10.4375rem] pb-28 monitor:px-[25%] flex-col flex-1 '>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
