import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"

import { topicPostsQuery } from "../../../utils/queries"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET'){
  
      const { topic } = req.query

      const videosQuery = topicPostsQuery(topic)
      
      const videos = await client.fetch(videosQuery)

      res.json(videos)
    }
}

export default handler