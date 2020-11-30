import { decode } from 'jsonwebtoken';

import { openDB } from '../../openDB';
import handler from '../../handler';

export default handler.get(
    async (req, res) => {
        const db = await openDB();
        const people = await db.all('select * from person');


        const decoded = decode(req.headers.authorization!);
        console.log(decoded);

        res.status(200).json(
            {
                id: decoded.id,
                name: decoded.name,
                people
            }
        );
    }
).post(

    async (req, res) => {

        //JWT内のユーザid情報で処理制御
        const decoded = decode(req.headers.authorization!);
        if (+decoded.id !== 9999) {
            res.status(401).json(
                { message: 'sorry you are not 9999' }
            );

            return; //後続処理はしないのでreturnする
        }

        const db = openDB();
        const { lastID } = await (await db).run(
            'INSERT INTO Person (name,details,vgroupId) values(?,?,?)',
            req.body.name,
            req.body.details,
            req.body.vgroupId
        );
        res.status(201).json({ ...req.body, id: lastID });
    }
)