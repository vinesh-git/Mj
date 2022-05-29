import React, {useState} from 'react'
import { Avatar,Button, Paper, Grid, Typography, Container, TextField, Icon } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import {GoogleLogin} from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from './Input';
import { signin, signup } from '../../actions/auth';

import 'bootstrap/dist/css/bootstrap.min.css';

const initalState = {firstName: "" , lastName:"", email:"", password:"", confirmPassword:""}

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();

    const posts = useSelector((state) => state);

    const [ShowPassword, setShowPassword] = useState(null);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initalState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value})
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup) {
            dispatch(signup(formData, history));
        }
        else{
            dispatch(signin(formData, history));
        }

    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        // handleShowPassword(false);

    };

    const googleSuccess = async (res) => {
        //?.(optional changing object) special object..it will not throw error if we don't have access to res
        const result = res?.profileObj;
        const token = res?.tokenId;

        try{
            dispatch( { type: 'AUTH', data: { result, token, success:true }});

            history('/');
        }catch(error) {
            console.log(error);
        }
        
    };

    const googleFailure = () => {
        console.log('Google Sign In was unseccessful.Try Again');
    };

  return (
    
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography  variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid Container spacing={2}>
                    {
                        isSignup && (
                            <div>
                                <Input name="firstName"  label="First Name" handleChange={handleChange} autoFocus  />
                                <Input name="lastName"  label="Last Name" handleChange={handleChange} autoFocus  />
                            </div>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={ShowPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                
                <Button type="submit" fullWidth className={classes.signinButton} variant="contained" style={{background:"#ff793fce"}}>
                    { isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <div clas></div>
                <GoogleLogin
                    clientId='532261741975-e5hsdrt26j7mo4j0kj2it22dt31esbfg.apps.googleusercontent.com'
                    render={(renderProps) => (
                        <Button className={classes.googleButton} style={{background:"#ff793fce"}} fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled}  variant='contained'>
                            Google  Login
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                
                <Grid container justifyContent="flex-end">
                    <Grid item>
                         <Button  onClick={switchMode} style={{ backgroundColor:"#F5F5F5", padding:1, border:'1px solid #E8E8E8'}}>
                             { isSignup ? 'Sign In': 'Create an account'}
                         </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth
