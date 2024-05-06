import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';

interface AddNewPostModalProps {
  modalOpen: boolean;
  handleClose: (value: boolean) => void;
  postBody: string;
  setPostBody: (value: string) => void;
  postTitle: string;
  setPostTitle: (value: string) => void;
  onConfirm: Function;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddNewPostModal: React.FC<AddNewPostModalProps> = ({ 
  modalOpen, 
  handleClose, 
  postBody, 
  setPostBody, 
  postTitle, 
  setPostTitle,
  onConfirm, 
}) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add new post
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <TextField 
          id="outlined-basic" 
          label="Title" 
          variant="standard" 
          style={{ display: 'block' }} 
          value={postTitle} 
          onChange={event => setPostTitle(event.target.value)}
        />
        <TextField 
          id="outlined-basic" 
          label="Body" 
          variant="standard"
          style={{ display: 'block' }} 
          value={postBody} 
          onChange={event => setPostBody(event.target.value)}
        />
        <Button onClick={() => onConfirm()} style={{ marginTop: '1rem' }}>Confirm</Button>
      </Box>
    </Modal>
  )
}

export default AddNewPostModal