import React, {useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import {useLibraries} from "../hooks/useLibraries";
import {Card, CardContent, CardHeader, CardMedia, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '40%',
    marginLeft: '15px'
  },
  card: {
    position: "relative",
    zIndex: 10,
    padding: '0 20px',
    height: '98vh',
    margin: '5px 0 5px 5px',
    overflow: 'auto',
    boxShadow: '39px 4px 44px 0px rgba(0, 0, 0, 0.1)'
  },
  back: {
    position: 'absolute',
    zIndex: 100,
    padding: '0 10px',
    height: '100vh',
    width: '40px',
    background: 'rgba(0,0,0,0.4)',
    transform: 'translateX(-40px)',

    '&:hover': {
      transform: 'translateX(0)',
    }
  },
  backIcon: {
    position: 'absolute',
    color: '#FFFFFF',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%)',
  }
}));

export const InformationLib = ({ match }) => {
  const { getLibrary, library } = useLibraries()
  const classes = useStyles()

  useEffect(() => {
    getLibrary({regionId: match.params.region_id, libId: match.params.lib_id})
  }, [])


  return (library ? (<Grid container>
      <div className={classes.back}>
        <NavLink to='/' className={classes.link}>
          <ArrowBackIosIcon fontSize="large" className={classes.backIcon}/>
        </NavLink>
      </div>
      <Grid item xs={12} sm={8}>
        <Card className={classes.card}>
          <CardHeader
            title={library?.name}
            subheader={library?.address?.fullAddress}
          />
          <img className={classes.image} src={library?.image?.url} alt=""/>
          <CardContent>
            <p dangerouslySetInnerHTML={{__html: library?.description}}/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <YMaps>
          <Map
            width="100%"
            height="100vh"
            defaultState={{ center: [library?.address?.mapPosition?.coordinates[1],library?.address?.mapPosition?.coordinates[0]], zoom: 19 }}
          >
            <Placemark geometry={[library?.address?.mapPosition?.coordinates[1],library?.address?.mapPosition?.coordinates[0]]} />
          </Map>
        </YMaps>
      </Grid>
    </Grid>) : null)
}
