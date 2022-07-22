// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"
import { postDetailQuery } from "../../../utils/queries"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query
        const query = postDetailQuery(id)

        const data = await client.fetch(query)

        res.json(data[0])
    }
}

export default handler