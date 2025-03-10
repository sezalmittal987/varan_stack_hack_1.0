import React,{useEffect, useState} from 'react';
import axios from 'axios'
import firebase from 'firebase'
import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {TextField, Select, FormControl, InputLabel, Container, Avatar, CssBaseline} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import {withRouter,Redirect} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {setAdmin} from '../../redux/admin/admin.actions'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectEventName} from '../../redux/single-event/single-event.selectors'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {userLogin} from '../../redux/admin/admin.actions'
import {selectUser} from '../../redux/admin/admin.selector';
import firebaseConfig from '../../firebase';


const useStyles = makeStyles((theme) => ({
    previewText: {
        textAlign: "center",
        width: "300px"
    },
    paper: {
        marginTop: "80px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
      avatar: {
        margin: "8px",
        backgroundColor: "#f48fb1",
        width: "100px",
        height: "100px",
      },
      fieldName: {
          textAlign: 'left'
      },
      submit: {
        marginTop: "20px"
        // margin: theme.spacing(3, 0, 2),
      },
}))
const UserProfile = ({match,userLogin,userToken}) => {
    console.log(match.params.id)
    const classes = useStyles();
    const [file,setFile] = useState(null);
    const [userCredentials, setUserCredentials] =
    useState({
        name: '',
        email: '',
        password : '',
        isVaccinated: false,
    });
    const handleChange = event => {
        const {name,value} = event.target;
        // console.log(value);
        setUserCredentials({...userCredentials, [name]: value});
        console.log(event.target);
        // console.log(userCredentials);
    }

    const handleCheckbox = event => {
        let checked = userCredentials.isVaccinated;
        checked = !checked;
        setUserCredentials({...userCredentials, isVaccinated: checked});
        console.log(userCredentials);
    }

    const handleSubmit = () =>{
        // After entering the details, this funciton is called with all the data
        // userCredentials contains the name, email and vaccination status
        // file uploaded is in 'file' variable
        // const auth = getAuth();
        // createUserWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     const user = userCredential.user;
        //     console.log(user);
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     /// TODO - error message
        // });
        // console.log(userToken);
        let token = "dfddfd";
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            ///TODO : store this token
            console.log(token);
            // return response.json({ token });
            axios({
                method: 'post',
                url: `http://localhost:5000/userapi/register`,
                headers:{
                    Authorization: 'Bearer '+token,
                },
                data : {
                    name : name,
                    email : email,
                    password : password,
                    isVaccinated : isVaccinated,
                    vaccinationCertificate : file,
                }
            }).then(response => {
                if(response.data.message === 0) throw new Error(response.data.message);
                alert("Successful Request");
            }).catch(error => {
                console.log(error);
                alert("Error Occured");
                firebase.auth().currentUser.delete().then(() => {
                }).catch((error) => {
                    alert('unable to login!');
                });
            })
        })
        .catch((error) => {
            console.error(error);

            alert('please try again!');
        })
        console.log(userCredentials);
        console.log(file);
        userLogin(token); // add bearer token in parameter

    }
    const {name,email,isVaccinated, password} = userCredentials;
    const handleFileChange = (event) =>{
            const file = event.target.files[0];
           setFile(file);
            var storage = firebase.storage();
            storage.ref(`/files/VC_${name}_${Date.now()}`).put(file).then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                console.log(url);
                setUserCredentials({...userCredentials, file : url})
                console.log('File Uploaded');
                alert("File Uploaded");
            })
       }
    return(
                                <Container component = "main" maxWidth = "xs">
                                    <CssBaseline />
                                    <div className = {classes.paper}>
                                        <TextField
                                        variant="standard"
                                        margin="normal"
                                        className = {classes.previewText}
                                        label = "Name"
                                        name="name"
                                        type="Text"
                                        id = "user_name"
                                        autoComplete="user-name"
                                        onChange = {handleChange}
                                        />
                                        <TextField
                                        variant="standard"
                                        margin="normal"
                                        className = {classes.previewText}
                                        label = "Email"
                                        name="email"
                                        type="Text"
                                        id = "user_email"
                                        autoComplete="user-email"
                                        onChange = {handleChange}
                                        />
                                        <TextField
                                        variant="standard"
                                        margin="normal"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        id = "user_password"
                                        className = {classes.previewText}
                                        onChange = {handleChange}
                                        />
                                        <FormControlLabel
                                        control={
                                          <Checkbox
                                            onChange={handleCheckbox}
                                            name="checkedB"
                                            color="primary"
                                          />
                                        }
                                        label="Vaccinated"
                                        />
                                        <input type = "file" onChange = {handleFileChange} label = "Vaccination Certificate"/>
                                        <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick = {() => handleSubmit()}
                                        >

                SignUp
            </Button>
                                    </div>
                                 </Container>
    )
}

const mapDispatchToProps = dispatch => ({
    userLogin: token => dispatch(userLogin(token))
})

const mapStateToProps = createStructuredSelector({
    userToken: selectUser
})
export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);