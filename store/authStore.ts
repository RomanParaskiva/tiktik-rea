import axios from 'axios'
import create from 'zustand'
import { persist } from 'zustand/middleware'

import { IUser } from '../types'
import { BASE_URL } from '../utils'

const authStore = (set: any) => ({
    userProfile: null,
    allUsers: [],

    addUser: (user: IUser) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),

    fetchAllUsers: async () => {
        const res = await axios.get(`${BASE_URL}/api/users`)

        set({ allUsers: res.data})
    }
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore