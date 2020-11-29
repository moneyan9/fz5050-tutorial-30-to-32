import { openDB } from '../../openDB';
import handler from '../../handler';

export default handler.get(
    async (req, res) => {
        const db = await openDB();
        const people = await db.all('select * from person');
        res.status(200).json(people);
    }
).post(
    (req, res) => {
        //何かしらのエラーを投げる
        throw new Error('method is Not Allowed !');
    }
    /*
    async (req,res)=>{
        const db = openDB();
        const {lastID} = await (await db).run(
            'INSERT INTO Person (name,details,vgroupId) values(?,?,?)',
            req.body.name,
            req.body.details,
            req.body.vgroupId
        );
        res.status(201).json({...req.body,id:lastID});
    }
    */
);