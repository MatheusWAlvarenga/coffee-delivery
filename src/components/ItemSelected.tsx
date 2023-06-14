// vendors
import { Plus, Minus, Trash } from '@phosphor-icons/react'

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
  deleteItem: (item: string) => void
}

export default function ItemSelected({
  props,
  handleCoffeeList,
  deleteItem,
}: CardProps) {
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

  function handleDelete(item: string) {
    deleteItem(item)
  }

  return (
    <div className='flex w-full justify-center items-center bg-base-card border-b border-base-button  gap-4 py-6'>
      <img id='image' src={selectImage(props.image)} width={56} alt='coffee' />

      <div className='flex flex-col w-full gap-1'>
        <span className='font-roboto text-[.75rem]'>{props.name}</span>

        <div className='flex tablet:w-auto w-full gap-2 justify-between'>
          <div className='flex tablet:w-auto w-full items-center justify-between bg-base-button rounded-md px-2 gap-2'>
            <button
              onClick={() => handleItemsAmount(props.image, false)}
              className='flex w-full justify-center '
            >
              <Minus size={14} color='#8047F8' weight='regular' />
            </button>
            <span className='flex justify-center items-center font-roboto text-[.875rem] '>
              {props.amount}
            </span>
            <button
              onClick={() => handleItemsAmount(props.image, true)}
              className='flex w-full justify-center'
            >
              <Plus size={14} color='#8047F8' weight='regular' />
            </button>
          </div>
          <button
            type='button'
            onClick={() => handleDelete(props.image)}
            className='hidden tablet:flex justify-center items-center bg-base-button px-2 py-1 rounded-md gap-2 font-roboto uppercase text-[0.75rem] text-base-subtitle '
          >
            <Trash size={18} color='#8047F8' weight='thin' />
            Remover
          </button>
          <button
            type='button'
            onClick={() => handleDelete(props.image)}
            className='flex tablet:hidden justify-center items-center bg-base-button px-2 py-1 rounded-md gap-2 font-roboto uppercase text-[0.75rem] text-base-subtitle '
          >
            <Trash size={18} color='#8047F8' weight='thin' />
          </button>
        </div>
      </div>

      <div className='flex justify-end h-full w-full text-[1rem] text-right font-roboto text-base-text'>
        {'R$ ' +
          (props.amount * parseFloat(props.price.replace(',', '.')))
            .toFixed(2)
            .replace('.', ',')}
      </div>
    </div>
  )
}
