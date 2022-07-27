import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../utils/client"
import { allUsersQuery } from "../../utils/queries"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {

        const data = await client.fetch(allUsersQuery())

        if (data) {
            res.json(data)
        } else {
            res.json([])
        }
    }
}

export default handler