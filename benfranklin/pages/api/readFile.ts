import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path'

type Res={
    status:string,
    text:string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Res>
  ) {
      try{
        const dirRelativeToPublicFolder = 'text.txt';
        const dir = path.resolve('./public', dirRelativeToPublicFolder);
        fs.readFile(dir, function(err:any, content:any) {
          if(err) res.status(200).json({status: 'failed', text:err});
          else res.status(200).json({status: 'success', text:content.toString()});
        });
      }catch(e){
        console.log(e);
        res.status(200).json({ status: 'error', text:""})
      }
  }