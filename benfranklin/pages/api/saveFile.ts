import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

type Res={
    status:string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Res>
  ) {
      try{
        const text = req.body.text;
        fs.writeFile('/text.txt', JSON.stringify(text), function(err:any) {
          if(err) res.status(200).json({status: 'failed'});
          else res.status(200).json({status: 'success'});
        });
      }catch(e){
        console.log(e);
        res.status(200).json({ status: 'error'})
      }
  }