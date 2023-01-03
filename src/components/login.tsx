import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { AlertDialog } from "./dialogs/simpleDialog";

export const Login = () => {
    //oauth
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? '';
    const [showLogout, setShowLogout] = useState<boolean>(false);
    const [showGLogin, setShowGLogin] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [loginDialogMsg, setLoginDialogMsg] = useState<string>('');
    const [loginDialogTitle, setLoginDialogTitle] = useState<string>('');
    const SUCCESSFULL_LOGIN_MSG = "You are logged in using your Google ID";
    const FAILED_LOGIN_MSG = "Login with Google ID failed";

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: GOOGLE_CLIENT_ID,
                scope: ''
            });
        }
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res: any) => {
        if (res.profileObj) {
            setLoginDialogMsg(SUCCESSFULL_LOGIN_MSG);
            setLoginDialogTitle('Hi '+ res.profileObj.givenName);
            setShowLogout(true);
            setShowGLogin(false);
            setOpenDialog(true);
        }
    }

    const onFailure = (res: any) => {
        setLoginDialogMsg(`${FAILED_LOGIN_MSG} - ${res.error}`);
        setLoginDialogTitle('Login Failed');
        setOpenDialog(true);
    }
    const logout = () => {
        setShowLogout(false);
        setShowGLogin(true);
        setOpenDialog(false);
        setLoginDialogTitle('Logged out');
        setLoginDialogMsg('Logout successful');
        setOpenDialog(true);
    }
    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <Card>
            {showGLogin ? <GoogleLogin clientId={GOOGLE_CLIENT_ID}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
            /> : ''
            }
            <Divider />
            {showLogout ? <GoogleLogout onLogoutSuccess={logout}
                clientId={GOOGLE_CLIENT_ID} />
                : ''}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {loginDialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {loginDialogMsg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>

        </Card>
    )
}