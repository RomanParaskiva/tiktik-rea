// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"
import { allPostsQuery } from "../../../utils/queries"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET'){
      const query = allPostsQuery()
  
      const data = await client.fetch(query)
      
      res.json(data)
    } else if (req.method === 'POST'){
      const document = req.body

      client.create(document).then(() => res.status(201).json('Success '))
    }
 
}

export default handler
