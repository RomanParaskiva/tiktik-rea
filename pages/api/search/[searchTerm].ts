import type { NextApiRequest, NextApiResponse } from "next"

import { searchPostsQuery } from "../../../utils/queries"
import { client } from "../../../utils/client"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {

        const { searchTerm } = req.query

        const videosQuery  = searchPostsQuery(searchTerm)

        const videos = await client.fetch(videosQuery)

        res.json(videos)

    }
}

export default handler