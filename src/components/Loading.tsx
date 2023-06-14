import { SpinnerGap } from '@phosphor-icons/react'

export default function Loading() {
  return (
    <div className='absolute w-screen h-screen p-1/2 bg-gray-200 00 bg-opacity-70'>
      <div className='flex w-screen h-screen justify-center items-center bg-transparent'>
        <SpinnerGap
          className='animate-spin h-10 w-10'
          color='#8047F8'
          weight='thin'
        />
      </div>
    </div>
  )
}
