// vendors
import { ShoppingCart, Plus, Minus } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

// assets
import coffeeAmericano from '../assets/coffees/coffeeAmericano.png'
import coffeeArabe from '../assets/coffees/coffeeArabe.png'
import coffeeCafeComLeite from '../assets/coffees/coffeeCafeComLeite.png'
import coffeeCafeGelado from '../assets/coffees/coffeeCafeGelado.png'
import coffeeCapuccino from '../assets/coffees/coffeeCapuccino.png'
import coffeeChocolateQuente from '../assets/coffees/coffeeChocolateQuente.png'
import coffeeExpresso from '../assets/coffees/coffeeExpresso.png'
import coffeeExpressoCremoso from '../assets/coffees/coffeeExpressoCremoso.png'
import coffeeHavaiano from '../assets/coffees/coffeeHavaiano.png'
import coffeeIrlandes from '../assets/coffees/coffeeIrlandes.png'
import coffeeLatte from '../assets/coffees/coffeeLatte.png'
import coffeeMacchiato from '../assets/coffees/coffeeMacchiato.png'
import coffeeMochaccino from '../assets/coffees/coffeeMochaccino.png'
import coffeeCubano from '../assets/coffees/coffeeCubano.png'

// interfaces
interface CardProps {
  props: {
    name: string
    image: string
    type: string[]
    label: string
    price: string
    amount: number
  }
  handleCoffeeList: (item: string, plus: boolean) => void
}

export default function Card({ props, handleCoffeeList }: CardProps) {
  function selectImage(item?: string) {
    switch (item) {
      case 'coffeeCubano':
        return coffeeCubano

      case 'coffeeAmericano':
        return coffeeAmericano

      case 'coffeeArabe':
        return coffeeArabe

      case 'coffeeCafeComLeite':
        return coffeeCafeComLeite

      case 'coffeeCafeGelado':
        return coffeeCafeGelado

      case 'coffeeCapuccino':
        return coffeeCapuccino

      case 'coffeeChocolateQuente':
        return coffeeChocolateQuente

      case 'coffeeExpresso':
        return coffeeExpresso

      case 'coffeeExpressoCremoso':
        return coffeeExpressoCremoso

      case 'coffeeHavaiano':
        return coffeeHavaiano

      case 'coffeeIrlandes':
        return coffeeIrlandes

      case 'coffeeLatte':
        return coffeeLatte

      case 'coffeeMacchiato':
        return coffeeMacchiato

      case 'coffeeMochaccino':
        return coffeeMochaccino
    }
  }

  function handleItemsAmount(item: string, type: boolean) {
    handleCoffeeList(item, type)
  }

  return (
    <div className='flex flex-col justify-start items-center h-[19.375rem] w-[16rem] bg-base-card rounded-[6px]  rounded-bl-[36px]  rounded-tr-[36px] gap-3 p-2'>
      {/* Coffee Image */}
      <img
        id='image'
        className='flex -mt-7'
        src={selectImage(props.image)}
        alt='coffee'
      />
      {/* Coffee type */}
      <div className='flex w-full  overflow-hidden justify-center items-center gap-1'>
        {props.type.map((type: string) => {
          return (
            <div
              key={type}
              className='flex justify-center items-center uppercase rounded-full text-[0.55rem] bg-yellow-light text-yellow-dark font-robotoBold px-4 py-1'
            >
              {type}
            </div>
          )
        })}
      </div>
      {/* Coffee Description  */}
      <div className='flex flex-col items-center'>
        <h2 className='flex font-baloo2 text-[1.4rem] text-base-subtitle'>
          {props.name}
        </h2>
        <label className='flex text-center text-base-label font-roboto text-sm'>
          {props.label}
        </label>
      </div>
      {/* Coffee footer  */}
      <footer className='flex justify-between items-center w-full py-2 px-4'>
        <div className='text-[1rem] font-roboto'>
          R${' '}
          <span className='text-[1.8rem] font-baloo2 text-base-text'>
            {props.price}
          </span>
        </div>
        <div className='flex gap-2 justify-between'>
          <div className='flex items-center justify-between bg-base-button rounded-md px-1 min-w-[4.5rem]'>
            <button
              onClick={() => handleItemsAmount(props.image, false)}
              className='flex justify-center w-[1.5rem]'
            >
              <Minus size={14} color='#8047F8' weight='bold' />
            </button>
            <span className='flex justify-center items-center font-roboto text-[1.2rem] '>
              {props.amount}
            </span>
            <button
              onClick={() => handleItemsAmount(props.image, true)}
              className='flex justify-center w-[1.5rem]'
            >
              <Plus size={14} color='#8047F8' weight='bold' />
            </button>
          </div>
          <Link
            to='/checkout'
            className={`${
              props.amount && props.amount >= 1
                ? 'bg-purple-dark'
                : 'bg-purple-light pointer-events-none'
            } flex justify-center items-center  px-2 rounded-md `}
          >
            <ShoppingCart size={16} color='white' weight='fill' />
          </Link>
        </div>
      </footer>
    </div>
  )
}
