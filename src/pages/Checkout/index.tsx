// vendors
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import wait from 'waait'
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from '@phosphor-icons/react'

// components
import ItemSelected from '../../components/ItemSelected'

// contexts
import { ShoppingContext } from '../../contexts/ShoppingContext'

// interfaces
interface CardTypes {
  name: string
  image: string
  type: string[]
  label: string
  price: string
  amount: number
}

export function Checkout() {
  const [sum, setSum] = useState('0.00')
  const [deliveryCost, setDeliveryCost] = useState('3.50')
  const navigate = useNavigate()

  const {
    coffeeList,
    handleCoffeeList,
    handleDelete,
    cep,
    street,
    number,
    complement,
    district,
    city,
    state,
    card,
    userName,
    handleFormChange,
    changeLoading,
  } = useContext(ShoppingContext)

  const paymentMethods = [
    {
      item: 'credit',
      label: 'Cartão de Crédito',
      icon: <CreditCard size={18} color='#8047F8' weight='thin' />,
    },
    {
      item: 'debit',
      label: 'Cartão de Débito',
      icon: <Bank size={18} color='#8047F8' weight='thin' />,
    },
    {
      item: 'money',
      label: 'Dinheiro',
      icon: <Money size={18} color='#8047F8' weight='thin' />,
    },
  ]

  function changeCep(e: string) {
    let cepFormatted = e.toString()

    if (cepFormatted.length === 6 && !cepFormatted.includes('-'))
      cepFormatted =
        cepFormatted.substring(0, 5) + '-' + cepFormatted.substring(5, 6)

    handleFormChange(cepFormatted, 'cep')
  }

  useEffect(() => {
    if (cep && cep.length > 8) {
      const url = `https://viacep.com.br/ws/${cep.replace('-', '')}/json/`
      try {
        fetch(url)
          .then((resp: any) => resp.json())
          .then((response: any) => {
            handleFormChange(response.logradouro, 'street')
            handleFormChange(response.complemento, 'complement')
            handleFormChange(response.bairro, 'district')
            handleFormChange(response.localidade, 'city')
            handleFormChange(response.uf, 'state')

            //Changes the value of the delivery charge according to the change of the zip code. ;)
            setDeliveryCost(
              (Math.random() * (12.99 - 0.5) + 0.5).toFixed(2).toString(),
            )
          })
          .catch((err: ErrorEvent) => console.log('err: ', err))
      } catch (error) {}
    }
  }, [cep])

  function beforeDelete(item: string) {
    handleDelete(item)
  }

  useEffect(() => {
    let amount = 0
    let cost = 0
    coffeeList.map((e) => {
      amount += e.amount
      cost += parseFloat(
        (e.amount * parseFloat(e.price.replace(',', '.'))).toFixed(2),
      )
    })

    cost = parseFloat(cost.toFixed(2))
    setSum(cost.toString())
    if (amount < 1) navigate('/')
  }, [coffeeList])

  function real(value: string) {
    if (value.length < 1) return

    let formatted = 'R$ ' + parseFloat(value).toFixed(2).replace('.', ',')

    return formatted
  }

  function amountCost() {
    let amount = parseFloat(sum) + parseFloat(deliveryCost)
    return amount.toString()
  }

  async function confirmOrder() {
    changeLoading(true)
    await wait(1000)
    changeLoading(false)
    navigate('/success')
  }

  return (
    <div className='flex flex-col px-[1rem] tablet:px-0 gap-8'>
      <div className='h-screen tablet:flex w-full gap-4'>
        <div className='flex flex-col w-full tablet:w-[60%]'>
          <header className='font-baloo2 text-lg text-base-subtitle mb-4'>
            Complete seu pedido
          </header>
          <body className='flex flex-col p-[.85rem] tablet:p-[2.5rem] mb-3 gap-8 bg-base-card rounded-md'>
            {/*  title */}
            <div className='flex gap-2'>
              <MapPinLine size={22} color='#C47F17' weight='regular' />
              <div className='flex flex-col'>
                <span className='text-base-subtitle font-roboto text-base'>
                  Dados de Entrega
                </span>
                <span className='text-base-text font-roboto text-xs'>
                  Informe o endereço onde deseja receber seu pedido
                </span>
              </div>
            </div>

            {/* form   */}
            <form className='flex flex-col w-full gap-4'>
              <input
                className='tablet:w-full p-2 bg-base-input border border-base-button rounded-md placeholder:text-base-label placeholder:text-[.875rem] placeholder:font-roboto tex-base-text'
                placeholder='Nome'
                type='text'
                value={userName}
                onChange={(e) => handleFormChange(e.target.value, 'name')}
              />
              <input
                className='w-full tablet:w-[12.5rem] p-2 bg-base-input border border-base-button rounded-md placeholder:text-base-label placeholder:text-[.875rem] placeholder:font-roboto tex-base-text'
                placeholder='CEP'
                type='text'
                value={cep}
                onChange={(e) => changeCep(e.target.value)}
                maxLength={9}
              />
              <input
                className='w-full p-2 bg-base-input border border-base-button rounded-md placeholder:text-base-label placeholder:text-[.875rem] placeholder:font-roboto tex-base-text'
                placeholder='Rua'
                type='text'
                value={street}
                onChange={(e) => handleFormChange(e.target.value, 'street')}
              />
              <div className='tablet:flex w-full gap-2'>
                <input
                  className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  w-[12.5rem] p-3 bg-base-input border border-base-button rounded-md placeholder:text-base-label placeholder:text-[.875rem] placeholder:font-roboto tex-base-text'
                  placeholder='Número'
                  type='number'
                  value={number}
                  onChange={(e) => handleFormChange(e.target.value, 'number')}
                />
                <div className='flex tablet:w-full mt-4 tablet:mt-0 '>
                  <input
                    name='component'
                    className={`${
                      complement ? 'border-r-0 rounded-r-none ' : ''
                    } w-full p-2  bg-base-input border  border-base-button rounded-md  placeholder:text-base-label placeholder:text-[.875rem] placeholder:font-roboto tex-base-text`}
                    placeholder='Complemento'
                    type='text'
                    value={complement}
                    onChange={(e) =>
                      handleFormChange(e.target.value, 'complement')
                    }
                  />
                  {!complement && (
                    <label
                      itemRef='component'
                      className='flex italic text-[.75rem] z-30 -ml-[5.45rem] text-base-label font-roboto rounded-r-md text-italic justify-center items-center bg-transparent px-3'
                    >
                      Opcional
                    </label>
                  )}
                </div>
              </div>
              <div className='tablet:flex w-full gap-2'>
                <input
                  className='w-full tablet:w-[8rem] p-2 bg-base-input border border-base-button rounded-md placeholder:text-base-label placeholder:text-[.875rem] placeholder:font-roboto tex-base-text'
                  placeholder='Bairro'
                  type='text'
                  value={district}
                  onChange={(e) => handleFormChange(e.target.value, 'district')}
                />
                <input
                  className='w-full mt-4 tablet:mt-0  p-2 bg-base-input border border-base-button rounded-md placeholder:text-base-label placeholder:text-[.875rem] placeholder:font-roboto tex-base-text'
                  placeholder='Cidade'
                  type='text'
                  value={city}
                  onChange={(e) => handleFormChange(e.target.value, 'city')}
                />
                <input
                  className='mt-4 tablet:mt-0 w-[3.75rem] p-2 bg-base-input border border-base-button rounded-md placeholder:text-base-label placeholder:text-[.875rem] placeholder:font-roboto tex-base-text'
                  placeholder='UF'
                  type='text'
                  value={state}
                  onChange={(e) => handleFormChange(e.target.value, 'state')}
                />
              </div>
            </form>
          </body>
          <footer className='flex flex-col p-[0.85rem] tablet:p-10 gap-8 bg-base-card rounded-md'>
            <div className='flex gap-2'>
              <CurrencyDollar size={22} color='#8047F8' weight='regular' />
              <div className='flex flex-col'>
                <span className='text-base-subtitle font-roboto text-base'>
                  Pagamento
                </span>
                <span className='text-base-text font-roboto text-xs'>
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </span>
              </div>
            </div>
            <div className='tablet:flex  justify-between gap-2 w-full'>
              {paymentMethods.map((payment) => {
                return (
                  <button
                    key={payment.item}
                    type='button'
                    onClick={() => handleFormChange(payment.item, 'card')}
                    className={`${
                      card === payment.item
                        ? 'bg-purple-light border-purple-standard pointer-events-none'
                        : 'border-transparent bg-base-button hover:bg-base-hover'
                    } flex mt-4 tablet:mt-0  justify-start items-center border text-base-text font-roboto uppercase gap-2 text-[.60rem] p-4 rounded-md w-full`}
                  >
                    {payment.icon}
                    <span>{payment.label}</span>
                  </button>
                )
              })}
            </div>
          </footer>
        </div>

        <div className='flex flex-col w-full tablet:w-[40%] tablet:mt-0 mt-8'>
          <header className='font-baloo2 text-lg text-base-subtitle mb-4'>
            Cafés selecionados
          </header>
          <body className='flex flex-col p-[.85rem] tablet:p-[2.5rem] bg-base-card rounded-[6px]  rounded-bl-[36px]  rounded-tr-[36px]'>
            {coffeeList.map((coffee: CardTypes) => {
              if (coffee.amount > 0) {
                return (
                  <ItemSelected
                    key={coffee.name}
                    props={coffee}
                    handleCoffeeList={(item, plus) =>
                      handleCoffeeList(item, plus)
                    }
                    deleteItem={(item) => beforeDelete(item)}
                  />
                )
              }
            })}

            <div className='flex flex-col p-4 gap-2'>
              <div className='flex justify-between items-center'>
                <span className='text-[1rem] font-roboto text-base-text'>
                  Total de itens
                </span>
                <span className='text-[1rem] font-roboto text-base-text'>
                  {real(sum)}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[1rem] font-roboto text-base-text'>
                  Entrega
                </span>
                <span className='text-[1rem] font-roboto text-base-text'>
                  {real(deliveryCost)}
                </span>
              </div>
              <div className='flex  justify-between items-center'>
                <span className='text-[1.25rem] font-roboto text-base-subtitle'>
                  Total
                </span>
                <span className='text-[1.25rem] font-roboto text-base-subtitle'>
                  {real(amountCost())}
                </span>
              </div>

              <button
                type='button'
                onClick={confirmOrder}
                className={`${
                  cep &&
                  street &&
                  number &&
                  district &&
                  city &&
                  state &&
                  card &&
                  userName
                    ? 'opacity-100'
                    : 'opacity-50 pointer-events-none'
                } flex font-roboto bg-yellow-standard text-white text-[.875rem] uppercase justify-center items-center py-3 px-6 mt-4 rounded-md transition-opacity duration-100`}
              >
                Confirmar Pedido
              </button>
            </div>
          </body>
        </div>
      </div>
    </div>
  )
}
