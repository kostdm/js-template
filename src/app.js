import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArticleCard from './arcticle-card';
import LoginBox from './login-box';
import Button from '@material-ui/core/Button';

const data = {
    _id: '45345345',
    title: 'Title',
    author: 'Author',
    content: 'Content',
}

const AuthedUser = () => {
    return (
        <Container fixed>
            <Button variant="contained" color="primary">Add</Button>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <ArticleCard data={data}/>
                </Grid>
                <Grid item xs={3}>
                    <ArticleCard data={data}/>
                </Grid>
                <Grid item xs={3}>
                    <ArticleCard data={data}/>
                </Grid>
                <Grid item xs={3}>
                    <ArticleCard data={data}/>
                </Grid>
            </Grid>
        </Container>
    );
}

const LoginUser = () => {
    return (
        <Container fixed>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={3}>
                    <LoginBox/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default function FixedContainer() {
    return (
        <div>
            <AuthedUser/>
            {/* <LoginUser/> */}
        </div>
    );
  }