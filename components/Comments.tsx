import React, { Dispatch, SetStateAction } from 'react'

import useAuthStore from '../store/authStore'
import NoResults from './NoResults'
import { IUser } from '../types'
import Account from './Account'

interface IProps {
  isPostingComment: boolean,
  comment: string,
  setComment: Dispatch<SetStateAction<string>>,
  addComment: (e: React.FormEvent) => void,
  comments: IComment[]
}

interface IComment {
  comment: string,
  lenght?: number,
  _key: string,
  postedBy: { _ref: string; _id?: string; }
}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {

  const { userProfile, allUsers } = useAuthStore()

  return (
    <div className='border-t-2 border-gray-200 h-full
     pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll h-[100%]'>
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {allUsers.map((user: IUser) => (
                user._id === (item.postedBy._id || item.postedBy._ref)
                && (
                  <div className='p-2 items-center' key={idx}>
                    <div className='flex flex-col items-start gap-3'>
                      <Account user={user} post={undefined} imageSize={34} />
                      <div>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </>
          ))
        ) : (
          <NoResults text="No comments yet!" />
        )}
      </div>

      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6
         px-2 md:px-10'>
          <form onSubmit={addComment} className='flex gap-4'>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Add comment...'
              className='bg-primary px-6 py-4 text-md 
              font-medium border-2 w-[250px] md:w-[700px]
               lg:w-[350px] border-gray-100 
               focus:outline-none focus:border-2 
               focus:border-gray-300 flex-1 rounded-lg'
            />
            <button className='text-md text-gray-400'
              onClick={addComment} >
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments