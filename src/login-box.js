import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


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
  inputs: {
    paddingTop: '20px'
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Please enter
        </Typography>
        <Typography variant="body2" component="p" className={classes.inputs}>
          <TextField id="outlined-basic" label="Login" variant="outlined" />
        </Typography>
        <Typography variant="body2" component="p" className={classes.inputs}>
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">Login</Button>
        <Button variant="contained" color="secondary">Register</Button>
      </CardActions>
    </Card>
  );
}