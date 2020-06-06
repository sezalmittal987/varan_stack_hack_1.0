import React,{useState,useEffect} from 'react';
import axios from 'axios'
import UserRegister from '../user-register-and-preview/user-register-and-preview.component'
import {withRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {setName} from '../../redux/single-event/single-event.actions';
import {selectAdminPresent} from '../../redux/admin/admin.selector'
import {createStructuredSelector} from 'reselect';
import {Grid, CardMedia, Card, Typography,Container,CardContent, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import MapGL,{Marker} from '@urbica/react-map-gl';
import PinDropIcon from '@material-ui/icons/PinDrop';
import CommentBox from '../../components/comment-box/comment-box.component'
import UsersBox from '../../components/users-box/users-box.component'
import UserChart from '../../components/user-ratio-chart/user-ratio-chart.component'
import Spinner from '../../components/spinner/spinner.component'
const useStyles = makeStyles({
    card: {
        flexDirection: 'column',
        height: '100%',
        display: 'flex'
    },
    media: {
        height: "400px"
    },
    container: {
        marginTop: "30px"
    },
    cardContent: {
        flexGrow: 1
    },
    button : {
        margin : "5px"
    }
})
const EventPage = ({match,setName,isAdmin,history}) => {
    const [event,setEvent] = useState({});
    const [viewport, setViewport] = useState({
        latitude: 37.78,
        longitude: -122.41,
        zoom: 11
      });
    useEffect(() => {

        axios({
            method: 'get',
            url: `/event/${match.params.id}`
        }).then(response => {
            setEvent(response.data);
            console.log(response.data);


            const {name} = response.data;
            setName(name);
        }).catch(error => {
            console.log(error);

        })
    },[])
    const {name,_id,description,image,location,comments,users} = event;
        console.log(event);
      const latitude = event.coordinates? event.coordinates.lat: 0;
      const longitude = event.coordinates? event.coordinates.lng: 0;
        const handleDelete = () => {
            axios({
                method: 'get',
                url: `/event/delete/${match.params.id}`,

            }).then(response => {
                alert('Deleted the page')
                history.push("/");

            }).catch(error => {
                alert("Some error occured while deleting")
                history.push("/");
            })
        }
        console.log(match);
        console.log(location);
        const classes = useStyles();
        return(
          <div>
            <Typography align = 'center' variant = 'h3'>{name}</Typography>
           <Container maxWidth = 'md' className = {classes.container} >
           <Card className = {classes.card}>
           <CardMedia
            image = {image}
            className = {classes.media}
            />
            <CardContent className = {classes.cardContent}>
                <Grid container>
                    <Grid item sm = {6} xs = {12}>
                        <Typography>
                            {description}
                        </Typography>
                        <CommentBox eventId = {_id} comments = {comments}/>

                    </Grid>
                    <Grid item sm = {6} xs = {12}>
                    <MapGL
                    style={{ width: '100%', height: '400px' }}
                    mapStyle='mapbox://styles/mapbox/light-v9'
                    accessToken="pk.eyJ1Ijoic2hyZXlkMTIzIiwiYSI6ImNrOG9yZHVscTA1MDYzZnRkY2VtcDd5MWYifQ.G5MQ9uSX90EDrzONZWQ8Hg"
                    latitude={latitude}
                    longitude={longitude}
                    zoom={0}
                    onViewportChange = {setViewport}
                    >
                        <Marker
                            longitude={longitude}
                            latitude={latitude}
                        >
                            <PinDropIcon />
                        </Marker>
                    </MapGL>
                    <UsersBox users = {users}/>
                    <UserChart eventId = {match.params.id} />

                    </Grid>
                </Grid>
                <div style = {{textAlign: "center",marginTop: "20px"

                                }}>
                    <Button variant = "contained" className = {classes.button} onClick = {() => history.push(`${match.url}/register`)} color = "primary">
                        REGISTER
                    </Button>
                    <Button variant = "contained" className = {classes.button} onClick = {() => handleDelete()} color = "secondary">
                        Delete
                    </Button>
                </div>
            </CardContent>
           </Card>

           </Container>

          </div>





        )

}
const mapStateToProps = createStructuredSelector({
    isAdmin: selectAdminPresent
})
const mapDispatchToProps = dispatch => ({
    setName: (name) => dispatch(setName(name))
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EventPage));

//add use effect hook and convert it to a functional component.