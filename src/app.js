import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArticleCard from './arcticle';
import Button from '@material-ui/core/Button';

export default function FixedContainer() {
    return (
        <Container fixed>
            <Button variant="contained" color="primary">Add</Button>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <ArticleCard/>
                </Grid>
                <Grid item xs={3}>
                    <ArticleCard/>
                </Grid>
                <Grid item xs={3}>
                    <ArticleCard/>
                </Grid>
                <Grid item xs={3}>
                    <ArticleCard/>
                </Grid>
            </Grid>
        </Container>
    );
  }