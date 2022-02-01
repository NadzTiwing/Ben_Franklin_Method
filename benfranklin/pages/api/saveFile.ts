import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path'

type Res={
    status:string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Res>
  ) {
      try{
        const text = req.body.text;
        const dirRelativeToPublicFolder = 'text.txt';
        const dir = path.resolve('./public', dirRelativeToPublicFolder);
        fs.writeFile(dir, JSON.stringify(text), function(err:any) {
          if(err) res.status(200).json({status: 'failed'});
          else res.status(200).json({status: 'success'});
        });
      }catch(e){
        console.log(e);
        res.status(200).json({ status: 'error'})
      }
  }