// vendors
import { Routes, Route } from 'react-router-dom'

// layout
import { DefaultLayout } from './layouts/DefaultLayout'

// pages
import { Home } from './pages/Home'
import { Checkout } from './pages/Checkout'
import { Success } from './pages/Success'

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<Success />} />
      </Route>
    </Routes>
  )
}
