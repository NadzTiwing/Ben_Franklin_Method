import type { NextPage } from 'next'
import Header from './layout/Header'
import {useState, useEffect} from 'react';

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [paragraphs, setParagraphs]= useState([""]);
  const [onEditing, setEditing]= useState(false);
  const [itemIndex, setItemIndex] = useState(-1);
  const [script, setScript]= useState([]);
  const [checkedTexts, setCheckedTexts] = useState([]);

  const onInsert=()=>{
    if(input !== ""){
      let filteredArray = paragraphs.filter(text=>text!=="");
      let newArray = [...filteredArray, input];
      setParagraphs(newArray);
      setInput("");
    }
  }

  const onChangeScript = () =>{
    window.location.href="/Script";
  }

  const readScript = async()=>{
    const script = await fetch("/api/readFile",{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
    });
    const data = await script.json();
    if(data.status === "success"){
      const dataJSON = JSON.parse(data.text);
      setScript(dataJSON);
    }else alert("something wrong happened in reading the file");
    
  }

  const onDeleteItem = (index:number) =>{
    let newArray = [...paragraphs];
    newArray.splice(index, 1);
    setParagraphs(newArray);
}

  const onEditItem = (index:number) =>{
      setEditing(true);
      let newInput = paragraphs[index];
      setInput(newInput);
      setItemIndex(index);
  }

  const onUpdate = ()=>{
    let newArray = [...paragraphs];
    newArray[itemIndex] = input;
    setParagraphs(newArray);
    setEditing(false);
    setInput("");
  }

  const onCheck = () =>{
    let resultArray:any = [];
    paragraphs.map( (paragraph, index) =>{
      let result = "";

      let loweredText = paragraph.toLowerCase();
      let splitTexts = loweredText.match(/.*?[?!.]/g) || []; //split text into sentences
      
      //from script
      let content:string= script[index] || "";
      let loweredContent = content.toLowerCase();
      let splitContent = loweredContent.match(/.*?[?!.]/g) || [];

      //check if the sentences are the same
      splitContent.map( (txt,i) =>{
        if(splitTexts.length > i){
          console.log("index: "+i);
          console.log(splitTexts[i]);
          if(txt === splitTexts[i]){
            result += `<span class="text-success">${txt}</span>`;
          }
          else result += `<del>${splitTexts[i]}</del><span class="text-warning">${txt}</span>`;
        }else result += `<span class="text-danger">${txt}</span>`;
      })
      result+="<br/><br/>"; //break every paragraph
      resultArray.push(result);
      
    })
    //setCheckedTexts([...checkedTexts, result]);
    setCheckedTexts(resultArray);
    console.log(checkedTexts);
  }

  useEffect(()=>{
    readScript();
  },[]);

  const redo = () =>{
    setCheckedTexts([]);
    window.location.href="/";
  }

  return (
    <div className="container mx-auto my-auto">
      <Header/>
      <h1 className="text-success mt-4">Writing practice App:</h1>
      {checkedTexts.length === 0 ? 
      /*start of practicing writing */
      <>
      <div className="d-flex flex-column">
        <button className="btn btn-sm btn-warning w-50 mb-3" onClick={()=>onChangeScript()}>Change based script</button>
        <label htmlFor="#writing-box">Start writing below:</label>
        <textarea id="writing-box" cols={30} rows={15} value={input} onChange={(evt)=>setInput(evt.target.value)}></textarea>
        {onEditing ? 
          <button className="btn btn-lg btn-warning" onClick={()=>onUpdate()}>Update Paragraph</button>
          :
          <button className="btn btn-lg btn-secondary" onClick={()=>onInsert()}>Insert Paragraph</button>
        }
      </div>
      <div className="d-flex flex-column my-5">
        {paragraphs.map((paragraph, index)=>(
            <div className="card" key={"paragraph-"+index}>
                <div className="card-body d-flex flex-column ">
                    <div className="d-flex flex-row-reverse">
                        <button className="btn btn-danger btn-sm" onClick={()=>onDeleteItem(index)}><i className="fa fa-times"></i></button>
                        <button className="btn btn-warning btn-sm mx-1" onClick={()=>onEditItem(index)}>Edit</button>
                    </div> 
                    <div className="d-flex flex-row">
                        <small className='text-muted'>paragraph {index+1}</small>
                    </div> 
                    
                    <p>{paragraph}</p>
                </div>
            </div>
        ))}
        {paragraphs.length > 0 ? <button className="btn btn-success" onClick={()=>onCheck()}>CHECK</button> : ""}
      </div>
      </>
      /*end of writing*/
      : /*result after clicking the check button*/
        <div className="d-flex flex-column">
          {checkedTexts.map( (text, index) =>(
            <div className="content" key={"result"+index} dangerouslySetInnerHTML={{__html: text}}></div>
          ))}
          <button className="btn btn-success" onClick={()=>redo()}>WRITE AGAIN</button>
        </div>
      }
      
      
      
      
    </div>
  )
}

export default Home
