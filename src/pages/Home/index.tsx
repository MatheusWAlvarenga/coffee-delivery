// vendors
import { useContext } from 'react'

// components
import Card from '../../components/Card'
import Intro from '../../components/Intro'
import EmptyProducts from '../../components/EmptyProducts'

// constext
import { ShoppingContext } from '../../contexts/ShoppingContext'

// interface
interface CardProps {
  name: string
  image: string
  type: string[]
  label: string
  price: string
  amount: number
}

export function Home() {
  const { coffeeList, handleCoffeeList } = useContext(ShoppingContext)

  return (
    <div className='flex flex-col h-screen w-full px-full'>
      <Intro />

      {coffeeList.length ? (
        <div className='flex flex-col  min-h-[80vh] items-center laptop:grid laptop:grid-cols-2  desktop:grid-cols-3 monitor:grid-cols-4 gap-14 '>
          {coffeeList.map((coffee: CardProps) => {
            return (
              <Card
                key={coffee.name}
                props={coffee}
                handleCoffeeList={(item, plus) => handleCoffeeList(item, plus)}
              />
            )
          })}
        </div>
      ) : (
        <div className='flex justify-center items-center w-full'>
          <EmptyProducts />
        </div>
      )}
    </div>
  )
}
