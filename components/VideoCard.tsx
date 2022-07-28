import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'


import { Video } from '../types'
import Account from './Account'

interface IProps {
    post: Video
}

const VideoCard = ({ post }: IProps) => {
    const [isHover, setIsHover] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [isVideoMuted, setIsVideoMuted] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const onVideoPress = () => {
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
    }, [isVideoMuted])

    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
            <Account post={post} user={undefined} imageSize={64} />

            <div className='lg:ml-20 flex gap-4 relative'>
                <div
                    className='rounded-3xl relative'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}>
                    <Link href={`/detail/${post._id}`}>
                        <video
                            loop
                            ref={videoRef}
                            className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px]
                             rounded-2xl cursor-pointer bg-gray-100'
                            src={post?.video?.asset.url}
                        >
                        </video>
                    </Link>
                    {isHover && (
                        <div className='absolute bottom-6 cursor-pointer left-0 flex gap-10 justify-around w-full p-3'>
                            {playing ? (
                                <button onClick={onVideoPress}>
                                    <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                                </button>
                            ) : (
                                <button onClick={onVideoPress}>
                                    <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                                </button>
                            )}
                            {isVideoMuted ? (
                                <button onClick={() => setIsVideoMuted(false)}>
                                    <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                                </button>
                            ) : (
                                <button onClick={() => setIsVideoMuted(true)}>
                                    <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoCard