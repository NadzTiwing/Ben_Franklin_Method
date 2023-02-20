import React, { useState } from "react";
import { 
    Modal, 
    Box, 
    Typography, 
    Button, 
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";

interface IArticle {
    id: string,
    title: string
}

interface IArticles {
    isOpen: boolean,
    setOpen: any,
    articles: IArticle[]
}
const ArticlesModal= ({ isOpen, setOpen, articles }: IArticles)  => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
    ) => {
      setSelectedIndex(index);
    };

    const onSelect = () => {

    }
    
    return(
        <Modal
        open={isOpen}
        onClose={() => setOpen(!isOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box className="articles-modal">
                <Typography id="modal-modal-title" variant="h6" component="h2"> List of Articles </Typography>
                <nav aria-label="main mailbox folders">
                    <List>
                        {articles.map( (article, index) => (
                            <ListItem disablePadding key={`article-${article.id}`}>
                                <ListItemButton
                                    selected={selectedIndex === index}
                                    onClick={(event) => handleListItemClick(event, index)}
                                >
                                    <ListItemText primary={article.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </nav>
                <Grid container alignItems="flex-end" justifyContent="flex-end" className="modal-btns" >
                    <Button variant="contained" onClick={() => onSelect()}> SELECT </Button>
                    <Button variant="outlined" onClick={() => setOpen(!isOpen)}> CANCEL </Button>
                </Grid>
            </Box>
        </Modal>
    );
}

export default ArticlesModal;