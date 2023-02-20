import React, { useState, useEffect } from 'react';
import {
    Grid,
    Button,
    MenuItem,
    Divider,
    Container,   
} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import OptionMenu from '@/components/OptionMenu';
import ArticlesModal from '@/components/ArticlesModal';



const articles = [
  {
    id: 'uno',
    title: "Article Uno"
  },
  {
    id: 'dos',
    title: "Article Dos"
  }
];

// let { data, error } = await supabase.from('countries').select()



type Props = {
  data: string;
};

const Home = ({ data }: any) => {
    
    const getData = async () => {
      
      //const res = await fetch('https://catfact.ninja/fact');
      //const countries = await data.json();
      console.log(data);
    }

    useEffect(() => {
      // console.log({DATA: countries})
      // console.log({ERROR: error})
      console.log(data)
      //getData();


    }, []);

    const [input, setInput] = useState<string>("");
    const [guideTxt, setGuideTxt] = useState<string>("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isCreate, setCreate] = useState<boolean>(false);
    const [isEdit, setEdit] = useState<boolean>(false);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const open = Boolean(anchorEl);

    const onSubmit = () => {

    }

    const onCreateArticle = () => {
      setEdit(!isEdit);
      setCreate(!isCreate);
      setAnchorEl(null);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSave = () => {
      setEdit(!isEdit);
      setCreate(!isCreate)
    }

    const onEdit = () => {
      setEdit(!isEdit);
      setCreate(!isCreate);
    }

    return(
        <Grid container spacing={2} className="grid-container" >
            <Grid item xs={12} >
                <h3 className='title'>Writing Practice: Ben Franklin Method</h3>
            </Grid>
            <Grid item xs={12} md={6}>
                <Container>
                    <Textarea placeholder="Enter your input here..." 
                    className="write-form" 
                    value={input} 
                    onChange={(text) => setInput(text.target.value)}/>
                    {!isCreate &&
                      <Button variant="outlined" className="check-btn" size="large" onClick={onSubmit}>CHECK</Button>
                    }
                </Container>
            </Grid>
            <Grid item xs={12} md={6}>
                <Container >
                  <div className='option-btn'>
                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                           aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                    >
                        Options
                    </Button>
                    <OptionMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => onEdit()} disableRipple disabled={isEdit}>
                          <EditIcon />
                            Edit
                        </MenuItem>
                        <MenuItem onClick={() => onSave()} disableRipple disabled={!isCreate}>
                          <UploadFileIcon />
                            Save
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={()=>setOpenModal(!isOpenModal)} disableRipple disabled={isCreate}>
                          Change Article
                        </MenuItem>
                        <MenuItem onClick={() => onCreateArticle()} disableRipple disabled={isCreate}>
                          New Article ( + )
                        </MenuItem>
                    </OptionMenu>
                    <ArticlesModal isOpen={isOpenModal} setOpen={setOpenModal} articles={articles}/>
                  </div>
                  <h4 className={isCreate ? "green-txt" : ""}>Guide Section: Article Name</h4>
                  <Textarea placeholder="Enter your guidance or clues here..." 
                    className={isCreate ? "write-form guide-txt green-border":"write-form guide-txt"} 
                    value={guideTxt} 
                    onChange={(text) => setGuideTxt(text.target.value)}
                    disabled={!isEdit}
                  />
                </Container>
            </Grid>
        </Grid>
    );
};

export default Home;