import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'

import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'
import Account from '../../components/Account'
import useAuthStore from '../../store/authStore'

const Search = ({ videos }: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(true)
    const router = useRouter()
    const { allUsers } = useAuthStore()

    const { searchTerm }: any = router.query

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  
    const searchedAccounts =  allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className='w-full'>
            <div className='flex gap-10 my-10 border-b-2 
            border-gray-200 bg-white w-full'>
                <p className={`text-xl font-semibold cursor-pointer 
                mt-2 ${accounts}`}
                    onClick={() => setIsAccounts(true)}
                >Accounts</p>

                <p className={`text-xl font-semibold cursor-pointer
                 mt-2 ${isVideos}`}
                    onClick={() => setIsAccounts(false)}
                >Videos</p>
            </div>

            {isAccounts ? (
                <div className='md:mt-16'>
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user: IUser, idx: number) => (
                            <Account key={idx} user={user} post={undefined} imageSize={32} /> 
                        ))
                    ) : <NoResults text={`No video results for ${searchTerm}`}/>}
                </div>
            ) : 
             <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                {videos.length ? (
                    videos.map((video: Video, idx: number) => (
                        <VideoCard key={idx} post={video} />
                    ))
                ) : <NoResults text={`No video results for ${searchTerm}`}/>}
             </div>   
            }
        </div>
    )
}

export const getServerSideProps = async ({
    params: { searchTerm } }: { params: { searchTerm: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
        props: {
            videos: res.data
        }
    }
}

export default Search