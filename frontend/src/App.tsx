import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('temp')

  useEffect(() => {
    (
      async () => {
        try {
          const res = await fetch('http://localhost:5000/hello')

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
