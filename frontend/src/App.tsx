import { useEffect, useState } from 'react'
import { baseURL } from './lib/utils'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    (
      async () => {
        try {
          const res = await fetch(`${baseURL}/hello`)

          const data = await res.json()

          setMessage(data.message)
        } catch (error) {
          setMessage('failed to fetch')
          console.log({ error })
        }
      }
    )()
  }, [])

  return (
    <main className='container h-full my-auto bg-gray-100'>
      <div className='py-4'>
        <p className='text-center font-semibold'>{message}</p>
      </div>
    </main>
  )
}

export default App
