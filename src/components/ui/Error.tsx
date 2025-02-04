import { ReactNode } from 'react'

function Error({ children }: { children: ReactNode }) {
  return (
    <div className='text-red-500'>{children}</div>
  )
}

export default Error