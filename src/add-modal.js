import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import api from './api';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function TransitionsModal(props) {
    const classes = useStyles();

    const addArticle = async () => {
      const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
        try {
            let article = await api.post('articles',{
                title: article_title.value,
                content: article_content.value,
                author: userId
            });
            if (article.status === 201 && article.data.article) {
              console.log('CREATED', article);
              props.close();
            }
            else {
              console.log('Error create article', article);
            }
        }
        catch (error){
          console.log(error);
        }
    };

  return (
    <Modal aria-labelledby="transition-modal-title"
           aria-describedby="transition-modal-description"
           className={classes.modal}
           open={props.show}
           onClose={props.close}
           closeAfterTransition
           BackdropComponent={Backdrop}
           BackdropProps={{
            timeout: 500,
           }} >
        <Fade in={props.show}>
            <div className={classes.paper}>
                <h2 id="transition-modal-title">Add Article</h2>
                <div id="transition-modal-description">
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField id="article_title" label="Title" variant="outlined" />
                        </div>
                        <div>
                        <TextField multiline 
                                id="article_content"
                                label="Content"
                                rows="4"
                                variant="outlined"/>
                        </div>
                        <div>
                        <Button variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                onClick={addArticle}>
                            Save
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Fade>
    </Modal>
  );
}