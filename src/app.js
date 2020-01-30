import React, {useState, useEffect} from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArticleCard from './arcticle-card';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AddModal from './add-modal';

import api from './api';

export default function FixedContainer() {
    const [articles, setArticles] = useState([]);
    const [addShow, setAddShow] = useState(false);
    
    useEffect(() => {
        async function getData(){
            let response = await api.get('articles');
            setArticles(response.data.articles);
        }
        
        getData();
    }, [articles]);

    function ShowAdd(){
        setAddShow(true);
    }
    function CloseAdd(){
        setAddShow(false);
    }

    return (
        <div>
            <Container fixed>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                    <Button variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={ShowAdd}>
                        Add new
                    </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                {articles.map(item => (
                    <Grid item xs={3} key={item._id}>
                        <ArticleCard data={item}/>
                    </Grid>
                ))}
                </Grid>
            </Container>
            <AddModal show={addShow} close={CloseAdd}/>
        </div>
    );
  }