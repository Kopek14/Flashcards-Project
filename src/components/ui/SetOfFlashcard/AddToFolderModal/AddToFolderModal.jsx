import React from 'react';

import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useDispatch, useSelector } from 'react-redux';
import addSetToFolder from '../../../../store/fetchs/folderFetchs/addSetToFolderFetch';

const AddToFolderModal = ({
  openAddToFolderModal,
  setopenAddToFolderModal,
  classes,
  setId,
}) => {
  const dispatch = useDispatch();
  const { folders } = useSelector(state => state.folder);

  const handleAddSetToFolder = folder => {
    dispatch(
      addSetToFolder({
        ...folder,
        sets: [...folder.sets.map(set => set._id), setId],
      })
    );
  };

  const handleRemoveSetFromFodler = folder => {
    dispatch(
      addSetToFolder({
        ...folder,
        sets: [...folder.sets.filter(set => set._id !== setId)],
      })
    );
  };

  return (
    <Modal
      aria-labelledby='modal-add-to-folder'
      aria-describedby='add-to-folder-modal'
      open={openAddToFolderModal}
      onClose={() => setopenAddToFolderModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box
        component={Grid}
        rowGap={1}
        container
        className={classes.boxAddToFolder}
      >
        {folders.map(folder => (
          <Paper
            key={folder._id}
            component={Grid}
            item
            container
            justifyContent='space-between'
            p={2}
          >
            <Grid item>
              <Typography variant='h6'>{folder.title}</Typography>
            </Grid>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
              {folder.sets.find(set => set._id === setId) === undefined ? (
                <AddCircleOutlineIcon
                  onClick={() => handleAddSetToFolder(folder)}
                />
              ) : (
                <RemoveCircleOutlineIcon
                  onClick={() => handleRemoveSetFromFodler(folder)}
                />
              )}
            </Grid>
          </Paper>
        ))}
      </Box>
    </Modal>
  );
};

export default AddToFolderModal;
