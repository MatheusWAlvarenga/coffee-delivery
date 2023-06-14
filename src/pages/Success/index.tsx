// vendors
import { useContext } from 'react'
import { MapPin, CurrencyDollar, Timer } from '@phosphor-icons/react'

// assets
import imageDelivery from '../../assets/image-delivery.png'

// context
import { ShoppingContext } from '../../contexts/ShoppingContext'

export function Success() {
  const { street, number, district, city, state, card } =
    useContext(ShoppingContext)

  return (
    <div className='overflow-y-scroll tablet:overflow-y-hidden flex flex-col gap-8 tablet:mt-[5rem]'>
      <div className='tablet:flex w-full gap-[1rem] tablet:gap-[6rem]'>
        <div className='flex flex-col w-full gap-8'>
          <div className='flex flex-col w-full gap-1 tablet:mt-[1rem] mt-[2rem]'>
            <span className='flex text-center tablet:text-start font-baloo2 text-[2rem] text-yellow-dark'>
              Uhu! Pedido confirmado
            </span>
            <span className='font-roboto text-[1.25rem] text-base-subtitle'>
              Agora é só aguardar que logo o café chegará até você
            </span>
          </div>
          <div className='flex tablet:hidden w-full mt-[1rem] justify-center items-center'>
            <img
              src={imageDelivery}
              width={250}
              alt='Delivery man riding his motorcycle'
            />
          </div>
          <div className='flex  flex-col gap-8 p-[.04rem] border bg-gradient-to-br from-yellow-standard  to-purple-standard rounded-[10px]  rounded-bl-[38px]  rounded-tr-[38px]'>
            <div className='flex  flex-col gap-8 p-[2.5rem] border-0 rounded-[8px]  rounded-bl-[36px]  rounded-tr-[36px] bg-white'>
              <div className='flex gap-2'>
                <div className='flex h-full justify-center items-center'>
                  <div className='h-8 w-8 rounded-full justify-center items-center flex bg-purple-standard'>
                    <MapPin size={18} color='white' weight='fill' />
                  </div>
                </div>
                <div className='flex flex-col gap-[.875]'>
                  <span className='flex font-roboto text-[1rem] text-base-text'>
                    Entrega em
                    <span className='font-semibold ml-1'>{` ${street}, ${number}`}</span>
                  </span>
                  <span className='flex font-roboto text-[.95rem] text-base-text'>
                    {`${district} - ${city}, ${state}`}
                  </span>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='flex h-full justify-center items-center'>
                  <div className='h-8 w-8 rounded-full justify-center items-center flex bg-yellow-standard'>
                    <Timer size={18} color='white' weight='fill' />
                  </div>
                </div>
                <div className='flex flex-col gap-[.875]'>
                  <span className='flex font-roboto text-[1rem] text-base-text'>
                    Previsão de entrega
                  </span>
                  <span className='flex font-semibold text-[.95rem] text-base-text'>
                    20 min - 30 min
                  </span>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='flex h-full justify-center items-center'>
                  <div className='h-8 w-8 rounded-full justify-center items-center flex bg-yellow-dark'>
                    <CurrencyDollar size={18} color='white' weight='regular' />
                  </div>
                </div>
                <div className='flex flex-col gap-[.875]'>
                  <span className='flex font-roboto text-[1rem] text-base-text'>
                    Pagamento na entrega
                  </span>
                  <span className='flex font-semibold text-[.95rem] text-base-text'>
                    {card == 'credit'
                      ? 'Cartão de Crédito'
                      : card == 'debit'
                      ? 'Cartão de Débito'
                      : 'Dinheiro'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden tablet:flex w-full mt-[7rem] justify-center items-center'>
          <img
            src={imageDelivery}
            width={500}
            alt='Delivery man riding his motorcycle'
          />
        </div>
      </div>
    </div>
  )
}
