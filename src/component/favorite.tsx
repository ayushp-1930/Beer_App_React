import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, IconContainerProps, Rating, styled, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { clearFavoriteList, toggleFavoriteBeer, rateFavoriteBeer } from '../features/beer/beerSlice';
import { AppDispatch, RootState } from '../store/store';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

export default function BeerList() {

  const dispatch = useDispatch<AppDispatch>()
  const beerState = useSelector((state: RootState) => state)

  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));

  const customIcons: {
    [index: string]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  const clearFavorite = (e: any) => {
    dispatch(clearFavoriteList())
  }

  const removeFromFavorite = (id: any) => {
    dispatch(toggleFavoriteBeer(id))
  }

  const rateBeer = (value: any, beerId: any) => {
    const data = { value: value, beerId: beerId }
    dispatch(rateFavoriteBeer(data))
  }

  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px', justifyContent: 'center' }}>
        {beerState.beer.favoriteBeer.map((beer: any) =>
          <Card sx={{ maxWidth: 345, minHeight: '40%', margin: '10px' }}>
            <CardMedia
              component="img"
              height="140"
              image={beer.image_url}
              alt="green iguana"
              sx={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography gutterBottom variant="subtitle1" component="div">
                {beer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {beer.description.substring(0, 100)}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
              <IconButton aria-label="favorites" onClick={() => removeFromFavorite(beer.id)}>
                <FavoriteIcon sx={{ color: '#EB1D36' }} />
              </IconButton>
              <StyledRating
                name="highlight-selected-only"
                defaultValue={beer.rating ? beer.rating : 1}
                IconContainerComponent={IconContainer}
                getLabelText={(value: number) => customIcons[value].label}
                highlightSelectedOnly
                onChange={(event, value) => rateBeer(value, beer.id)}
              />
            </CardActions>
          </Card>
        )}
      </Box>
      {beerState.beer.favoriteBeer.length > 0 ?
        <Box sx={{ textAlign: 'center' }}>
          <Button variant='outlined' size='large' sx={{ maring: '20px' }} onClick={clearFavorite}>Clear List</Button>
        </Box> :
        <Box sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="subtitle1" component="div">
            No Beer in Favorite List.
          </Typography>
        </Box>}
    </Box>
  );
}
