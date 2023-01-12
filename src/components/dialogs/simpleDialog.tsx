import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const SimpleDialog = (props: any) => {
    const  {
      openDialog,
      handleClose, 
      dialogHeader,
      dialogMessage
    } = props;
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        data-testid="simpleDialog"
      >
        <DialogTitle id="alert-dialog-title">
          { dialogHeader }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { dialogMessage }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    );
}