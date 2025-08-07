import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full space-y-6 text-center">
      <div className="space-y-3">
        <h1 className="font-bold text-4xl tracking-tighter sm:text-5xl">
          404 Page Not Found
        </h1>
        <p className="text-gray-500">
          Sorry, we couldn&#x27;t find the page you&#x27;re looking for.
        </p>
      </div>
      <Button className="p-5" onClick={() => navigate('/')}>
        Return to website
      </Button>
    </div>
  )
}

export default NotFound
