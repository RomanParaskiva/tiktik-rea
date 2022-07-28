import { useState, useEffect } from 'react'
import axios from 'axios'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'

import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'
import Account from '../../components/Account'

interface IProps {
  data: {
    user: IUser,
    userVideos: Video[],
    userLikedVideos: Video[]
  }
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState(true)
  const [videoList, setVideoList] = useState<Video[]>([])

  const { user, userVideos, userLikedVideos } = data

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

  useEffect(() => {
    if(showUserVideos) {
      setVideoList(userVideos)
    } else {
      setVideoList(userLikedVideos)
    }
  }, [showUserVideos, userLikedVideos, userVideos])


  return (
    <div className='w-full'>
      <div className='flex gap-6 mdgap-10 mb-4 bg-white w-full'>
        <Account user={data.user} post={undefined} imageSize={128} />
      </div>

      <div className='flex gap-10 my-10 border-b-2 border-gray-200
       bg-white w-full'>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
          onClick={() => setShowUserVideos(true)}
        >Videos</p>

        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
          onClick={() => setShowUserVideos(false)}
        >Liked</p>
      </div>

      <div className='flex gap-6 flex-wrap md:justify-start justify-center'>
        {videoList.length > 0 ? (
          videoList.map((post:Video, idx: number) => (
            <VideoCard key={idx} post={post} />
          ))
        ) : <NoResults text={`No ${showUserVideos ? '' : 'Liked'} videos yet.`}/>}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id } }: { params: { id: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: {
      data: res.data
    }
  }
}

export default Profile