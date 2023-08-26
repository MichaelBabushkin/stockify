import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    try {
      // console.log('req ', req)
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
          }
          const {brand_name, brand_svg} = req.body
          console.log(brand_name);
      const client = await db.connect();
      console.log('client ', client);
      const { rows } = await client.sql`INSERT INTO logos (BRAND_NAME,BRAND_SVG)
                                        SELECT ${brand_name}, ${brand_svg} WHERE NOT EXISTS(
                                          SELECT BRAND_NAME from logos 
                                          WHERE BRAND_NAME = ${brand_name}
                                        );`;

          console.log('rows ', rows)
          res.status(200).json({ name:rows })
    }catch(error){
      console.log('error ', error)
      res.status(404).json({ error })
    }
  }