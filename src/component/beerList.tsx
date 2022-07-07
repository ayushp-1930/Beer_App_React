import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeers, fetchFilteredData, toggleFavoriteBeer } from '../features/beer/beerSlice';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../store/store';

export default function BeerList() {

    const dispatch = useDispatch<AppDispatch>()
    const beerState = useSelector((state: RootState)=> state)
    const [page, setPage] = useState<number>(1)
 
    useEffect(() => {
        dispatch(fetchBeers(page))
    },[])

    useEffect(() => {
        dispatch(fetchBeers(page))
    },[page])

    useEffect(() => {
        console.log(window.location.pathname)
    },[beerState])

    const addToFavorite = (id: any) => {
        console.log(id)
        console.log(beerState.beer.data.filter( (x:any) => x.id == id ))
        dispatch(toggleFavoriteBeer(id))
    }

    const loadNextPage = (e:any) => {
        setPage(page+1)
    }

    const loadPreviousPage = (e:any) => {
        if(page>1){
            setPage(page-1)
        }
    }

    const handleChange = (event: any) => {
        if(event.target.value.length > 5 ){
            const str = event.target.value.replace(' ', '_');
            dispatch(fetchFilteredData(str))
        }
    }

  return (
    <Box component='div' sx={{ '& button': { m: 1 } }}>
        <Box sx={{textAlign:'center', marginTop: '10px'}}>
            <TextField id="outlined-basic" label="Filter By Food Pairing" variant="outlined" onChange={handleChange} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' , marginTop:'20px', justifyContent:'center' }}>
            {beerState.beer.data.map((beer:any) => 
                <Card sx={{ maxWidth: 345 ,minHeight:'40%' , margin:'10px'}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={beer.image_url}
                        alt="green iguana"
                        sx={{objectFit: 'contain'}}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="subtitle1" component="div">
                        {beer.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {beer.description.substring(0,100)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="add to favorites" onClick={ () => addToFavorite(beer.id)}>
                            <FavoriteIcon sx={{ color : beerState.beer.favoriteBeer.filter( (x:any) => x.id==beer.id).length > 0 ? '#EB1D36' : '#0000008a'}} />
                        </IconButton>
                    </CardActions>
                </Card>
            )}
        </Box>
        <Box sx={{textAlign:'center'}}>
            <Button variant='outlined' size='large' sx={{maring : '20px'}} disabled={ (page == 1) ? true: false} onClick={loadPreviousPage}>Previous</Button>
            <Button variant='outlined' size='large' sx={{maring : '20px'}} onClick={loadNextPage}>Next</Button>
        </Box>
    </Box>
  );
}
