import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'

import { IUser, Video } from '../types'

const Account = ({ post, user }: { post: Video | undefined, user: IUser | undefined }) => {
    const withHover = 'hover:bg-primary'
    const imageSrc = post ? post?.postedBy?.image : (user ? user.image : '')    
    const userName = post ? post.postedBy.userName : (user ? user.userName : '')
    return (
        <div>
            <div className={`flex gap-3 p-2 cursor-pointer
             font-semibold rounded ${user ? withHover : ''}`}>
                <div className={`${user ? 'w-8 h-8' : 'md:w-16 md:h-16 w-10 h-10'}`}>
                    <Link href={`/profile/${user?._id || post?.userId}`}>
                        <>
                            <Image
                                width={user ? 34 : 62}
                                height={user ? 34 : 62}
                                className='rounded-full'
                                src={imageSrc || 'http://localhost:3000/vercel.svg'}
                                alt="profile"
                                layout='responsive'
                            />
                        </>
                    </Link>
                </div>
                <div>
                    <Link href={`/profile/${user?._id || post?.userId}`}>
                        <div className='flex flex-col items-start gap-1'>
                            <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{userName} {' '}
                                <GoVerified className='text-blue-400 text-md' />
                            </p>
                            <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{userName}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Account