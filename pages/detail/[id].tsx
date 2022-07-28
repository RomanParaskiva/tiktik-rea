import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'

import useAuthStore from '../../store/authStore'

import axios from 'axios'
import { BASE_URL } from '../../utils'
import { Video } from '../../types'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'
import Account from '../../components/Account'

interface IProps {
  postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)
  const router = useRouter()

  const { userProfile }: any = useAuthStore()

  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoclick = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [post, isVideoMuted])

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })
      setPost({ ...post, likes: data.likes })
    }
  }

  const addComment = async (e:any) => {
    e.preventDefault()

    if (userProfile && comment) {
      setIsPostingComment(true)

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      })

      setPost({ ...post, comments: data.comments })
      setComment('')
      setIsPostingComment(false)
    }
  }

  if (!post) return null

  return (
    <div className='flex w-full absolute left-0 top-0 
    bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12
       flex justify-center items-center bg-black'>

        <div className='absolute top-6 left-2 lg:left-6 
        flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div>

        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
              ref={videoRef}
              loop
              src={post.video.asset.url}
              onClick={onVideoclick}
              className='h-full cursor-pointer'
            >

            </video>
          </div>

          <div className='absolute top-[45%] left=[45%] cursor-pointer'>
            {!playing && (
              <button onClick={onVideoclick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>

        <div className='absolute bottom-5 lg:bottom-10 right-5 
        lg:right-10 cursor-pointer '>
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
            </button>
          )}
        </div>
      </div>

      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10 px-5'>
         <Account user={undefined} post={post} imageSize={32}/>

          <p className='px-10 text-lg text-gray-600'>
            {post.caption}
          </p>

          <div className='mt-10 px-5'>
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>

          <Comments
            comment={comment}
            comments={post.comments}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
          />

        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }
  : { params: { id: string } }) => {

  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: {
      postDetails: data
    }
  }
}

export default Detail