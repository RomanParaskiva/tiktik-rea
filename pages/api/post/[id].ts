// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { uuid } from "uuidv4"
import { client } from "../../../utils/client"
import { postDetailQuery } from "../../../utils/queries"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query
        const query = postDetailQuery(id)

        const data = await client.fetch(query)

        res.json(data[0])
    } else if (req.method === 'PUT'){
        const { comment, userId } = req.body
        const { id }:any = req.query

        const data =
            await client
            .patch(id)
            .setIfMissing({ comments: [] })
            .insert('after', 'comments[-1]', [
                {
                    comment,
                    _key: uuid(),
                    postedBy: { _ref: userId, _type: 'postedBy' }
                }
            ])
            .commit()

            res.status(201).json(data)
    }
}

export default handler