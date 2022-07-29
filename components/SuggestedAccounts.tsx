import React, { useEffect } from 'react'
import useAuthStore from '../store/authStore'
import { IUser } from '../types'
import Account from './Account'


const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore()

  useEffect(() => {
    fetchAllUsers()
    
  }, [fetchAllUsers])

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3
       mt-4 hidden xl:block'>Suggested Accounts</p>

      <div className='hidden xl:block'>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Account key={user._id} user={user} post={undefined} imageSize={32}/>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts