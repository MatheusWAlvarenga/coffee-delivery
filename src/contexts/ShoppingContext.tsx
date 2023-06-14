// vendors
import { useEffect, useState, createContext, ReactNode } from 'react'

// products
import { products } from '../products'

// utility
import { key } from '../utility'

// interfaces
interface CardTypes {
  name: string
  image: string
  type: string[]
  label: string
  price: string
  amount: number
}

interface ShoppingContextType {
  coffeeList: CardTypes[]
  locale: string
  sumAmountListItems: number
  cep: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  state: string
  card: string
  userName: string
  loading: boolean
  handleCoffeeList: (item: string, plus: boolean) => void
  handleDelete: (item: string) => boolean
  handleFormChange: (item: string, type: string) => void
  changeLoading: (item: boolean) => void
  resetAllContext: () => void
}

interface ShoppingContextProviderProps {
  children: ReactNode
}

// context
export const ShoppingContext = createContext({} as ShoppingContextType)

export function ShoppingContextProvider({
  children,
}: ShoppingContextProviderProps) {
  const [coffeeList, setCoffeeList] = useState<CardTypes[]>(products)
  const [locale, setLocale] = useState<string>('Buscando localização...')
  const [sumAmountListItems, setSumAmountListItems] = useState(0)
  const [cep, setCep] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [complement, setComplement] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [card, setCard] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  function userAddressAutoFill(address: any) {
    setDistrict(address.suburb || '')
    setCity(
      address.city
        ? address.city
        : address.town
        ? address.town
        : address.residential || '',
    )
    setState(stateFormat(address.state) || '')
  }

  function stateFormat(state: string) {
    const braziliansStates = [
      { 'cod': 'AC', 'name': 'Acre' },
      { 'cod': 'AL', 'name': 'Alagoas' },
      { 'cod': 'AP', 'name': 'Amapá' },
      { 'cod': 'AM', 'name': 'Amazonas' },
      { 'cod': 'BA', 'name': 'Bahia' },
      { 'cod': 'CE', 'name': 'Ceará' },
      { 'cod': 'DF', 'name': 'Distrito Federal' },
      { 'cod': 'GO', 'name': 'Goiás' },
      { 'cod': 'ES', 'name': 'Espirito Santo' },
      { 'cod': 'MA', 'name': 'Maranhão' },
      { 'cod': 'MT', 'name': 'Mato Grosso' },
      { 'cod': 'MS', 'name': 'Mato Grosso do Sul' },
      { 'cod': 'MG', 'name': 'Minas Gerais' },
      { 'cod': 'PA', 'name': 'Pará' },
      { 'cod': 'PB', 'name': 'Paraíba' },
      { 'cod': 'PR', 'name': 'Paraná' },
      { 'cod': 'PE', 'name': 'Pernambuco' },
      { 'cod': 'PI', 'name': 'Piauí' },
      { 'cod': 'RJ', 'name': 'Rio de Janeiro' },
      { 'cod': 'RN', 'name': 'Rio Grande do Norte' },
      { 'cod': 'RS', 'name': 'Rio Grande do Sul' },
      { 'cod': 'RO', 'name': 'Rondônia' },
      { 'cod': 'RR', 'name': 'Roraima' },
      { 'cod': 'SP', 'name': 'São Paulo' },
      { 'cod': 'SC', 'name': 'Santa Catarina' },
      { 'cod': 'SE', 'name': 'Sergipe' },
      { 'cod': 'TO', 'name': 'Tocantins' },
    ]

    const indexItem = braziliansStates.findIndex((e) => e.name == state)

    if (indexItem < 0) return state

    return braziliansStates[indexItem].cod
  }

  function changeLoading(item: boolean) {
    setLoading(item)
  }
  function resetAllContext() {
    setCoffeeList(products)
    setLocale('Buscando localização...')
    setSumAmountListItems(0)
    setCep('')
    setStreet('')
    setNumber('')
    setComplement('')
    setDistrict('')
    setCity('')
    setState('')
    setCard('')
    setUserName('')
  }

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          },
        )

        const urlLocaleConsult = `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        // const urlLocaleConsult = `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=-15.6702&lon=-48.2006&format=json` // test

        fetch(urlLocaleConsult)
          .then((resp: any) => resp.json())
          .then((response: any) => {
            if (response.address) userAddressAutoFill(response.address)
            setLocale(
              response.address.city
                ? `${response.address.city}, ${response.address.state}`
                : response.address.town
                ? `${response.address.town}, ${response.address.state}`
                : `${response.address.residential}, ${response.address.state}`,
            )
          })
          .catch((err: ErrorEvent) => console.log('err: ', err))
      } catch (error) {
        console.error('Error retrieving geolocation data:', error)
      }
    }

    fetchGeolocation()
  }, [locale])

  const handleCoffeeList = (item: string, plus: boolean) => {
    const findItemIndex = coffeeList.findIndex((e) => e.image === item)

    let newList = [...products]

    if (plus) newList[findItemIndex].amount++

    if (!plus && newList[findItemIndex].amount > 0)
      newList[findItemIndex].amount--

    setCoffeeList(newList)
  }

  const handleDelete = (item: string) => {
    const findItemIndex = coffeeList.findIndex((e) => e.image === item)

    let newList = [...products]

    newList[findItemIndex].amount = 0

    const amount = newList.map((item) => {
      let amountItems = 0

      amountItems += item.amount

      return amountItems
    })

    setCoffeeList(newList)
    if (amount.reduce((partialSum, a) => partialSum + a, 0) > 0) return false

    return true
  }

  function sumAllAmount() {
    let amountItems = 0
    coffeeList.map((coffee) => {
      amountItems += coffee.amount
    })

    return amountItems
  }

  useEffect(() => {
    if (!coffeeList) return

    setSumAmountListItems(sumAllAmount())
  }, [coffeeList])

  function handleFormChange(item: string, ref: string) {
    switch (ref) {
      case 'cep':
        return setCep(item)

      case 'street':
        return setStreet(item)

      case 'number':
        return setNumber(item)

      case 'complement':
        return setComplement(item)

      case 'district':
        return setDistrict(item)

      case 'city':
        return setCity(item)

      case 'state':
        return setState(item)

      case 'card':
        return setCard(item)

      case 'name':
        return setUserName(item)
    }
  }
  return (
    <ShoppingContext.Provider
      value={{
        coffeeList,
        locale,
        sumAmountListItems,
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
        loading,
        resetAllContext,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  )
}
