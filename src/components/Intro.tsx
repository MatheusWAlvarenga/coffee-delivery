import imageIntro from '../assets/image-intro.png'

import { ShoppingCart, Timer, Package, Coffee } from '@phosphor-icons/react'

export default function Intro() {
  return (
    <div className='flex tablet:py-[5.75rem] pb-[3rem] justify-center items-center '>
      <div className='flex flex-col desktop:grid desktop:grid-cols-2 gap-[3.5rem]'>
        <div className='flex flex-col gap-8 tablet:gap-16'>
          <div className='flex tablet:hidden mt-8 justify-center items-end'>
            <img src={imageIntro} alt='' width={300} />
          </div>
          <div className='flex flex-col items-center w-full tablet:items-start gap-4'>
            <h1 className='text-center tablet:text-start text-4xl font-baloo2'>
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <span className='text-center tablet:text-start text-lg font-roboto'>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </span>
          </div>

          <div className='flex flex-col  items-start px-[5rem]  w-full tablet:px-0 tablet:grid tablet:grid-cols-2 gap-5 tablet:gap-0'>
            <div className='flex flex-col items-center gap-5 '>
              <div className='flex items-center gap-2'>
                <div className='flex justify-center items-center rounded-full h-6 w-6 bg-yellow-dark'>
                  <ShoppingCart size={14} color='white' weight='fill' />
                </div>
                <span className='text-xs font-roboto'>
                  Compra simples e segura
                </span>
              </div>
              <div className='flex justify-center items-center gap-2'>
                <div className='flex justify-center items-center rounded-full h-6 w-6 bg-yellow-standard'>
                  <Timer size={14} color='white' weight='fill' />
                </div>
                <span className='text-xs font-roboto'>
                  Entrega rápida e rastreada
                </span>
              </div>
            </div>
            <div className='flex flex-col items-center gap-5'>
              <div className='flex items-center gap-2'>
                <div className='flex justify-center items-center rounded-full h-6 w-6 bg-base-text'>
                  <Package size={14} color='white' weight='fill' />
                </div>
                <span className='text-xs font-roboto'>
                  Embalagem mantém o café intacto
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex justify-center items-center rounded-full h-6 w-6 bg-purple-standard'>
                  <Coffee size={14} color='white' weight='fill' />
                </div>
                <span className='text-xs font-roboto'>
                  O café chega fresquinho até você
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden tablet:flex justify-center items-end'>
          <img src={imageIntro} alt='' width={400} />
        </div>
      </div>
    </div>
  )
}
