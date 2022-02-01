import Header from './layout/Header'
import {useState, useEffect} from 'react';
const Script = ()=>{
    const [input, setInput] = useState("");
    const [paragraphs, setParagraphs]= useState([""]);
    const [onEditing, setEditing]= useState(false);
    const [itemIndex, setItemIndex] = useState(-1);

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
            setParagraphs(dataJSON);
        }else alert("something wrong happened in reading the file");
        
    }

    useEffect(()=>{
        readScript();
    },[]);

    const onInsert=()=>{
        //remove empty array/strings
        if(input !== ""){
            let filteredArray = paragraphs.filter(text=>text!=="");
            let newArray = [...filteredArray, input];
            setParagraphs(newArray);
            setInput("");
        }
    }

    const onSaveScript = async() =>{
        const response = await fetch('/api/saveFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: paragraphs
            })
        });
        const data = await response.json();
        if(data.status === "success") {
            alert("File saved successfully!");
        }else alert("Ooops, there's something!");
    }
    
    const onReturn = ()=>{
        window.location.href="/";
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

    
    return(
        <div className="container mx-auto my-auto">
        <Header/>
        <h1 className="text-success mt-4">Change Script:</h1>
        <div className="d-flex flex-column">
            <div className="flex-row">
                <button className="btn btn-link float-start mb-3" onClick={()=>onReturn()}>Return to writing page</button>
                <button className="btn btn-lg btn-warning float-end mb-3" onClick={()=>onSaveScript()}>Save Script</button>
            </div>
            <label htmlFor="#writing-box">Paragraph:</label>
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
        </div>
        </div>
    );
}
export default Script;