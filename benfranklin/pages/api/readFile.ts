import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

type Res={
    status:string,
    text:string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Res>
  ) {
      try{
        fs.readFile('https://practice-method-hqj3m4fmc-nadztiwing.vercel.app/text.txt', function(err:any, content:any) {
          if(err) res.status(200).json({status: 'failed', text:err});
          else res.status(200).json({status: 'success', text:content.toString()});
        });
      }catch(e){
        console.log(e);
        res.status(200).json({ status: 'error', text:""})
      }
  }