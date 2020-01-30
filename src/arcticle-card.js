import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import api from './api';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  const remove = async () => {
    try {
        let response = await api.delete(`articles/${props.data._id}`);
        if (response.status === 200, response.data.ok === 1){
          console.log('DELETED');
        }
    }
    catch (error) {
        console.log(error);
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.data.author.username}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.data.title}
        </Typography>
        <Typography variant="body2" component="p">
          {props.data.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">Edit</Button>
        <Button variant="contained" color="secondary" onClick={remove}>Delete</Button>
      </CardActions>
    </Card>
  );
}