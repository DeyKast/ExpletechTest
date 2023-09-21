import { Modal, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './modalWindow.module.css';

export const ModalWindow = ({ handleToggleModal, open }) => {
  const [title, setTitle] = useState(sessionStorage.getItem('title') || '');
  const [content, setContent] = useState(
    sessionStorage.getItem('content') || ''
  );
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('title', title);
    sessionStorage.setItem('content', content);
  }, [title, content]);

  const handleSubmit = event => {
    event.preventDefault();

    const isTitleValid = title.length >= 5;
    const isContentValid = content.length >= 50;

    setTitleError(!isTitleValid);
    setContentError(!isContentValid);

    if (isTitleValid && isContentValid) {
      console.log(title, content);

      sessionStorage.removeItem('title');
      sessionStorage.removeItem('content');

      setTitle('');
      setContent('');

      handleToggleModal();

      Notify.success('Post successfully added !');

      // ability to use post function
    }
  };

  return (
    <Modal
      className={css.modalWindow}
      open={open}
      onClose={handleToggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        className={css.modalForm}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2>Add your post</h2>
        <TextField
          label="Post Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          required
          variant="outlined"
          fullWidth
          sx={{
            mb: 3,
          }}
          error={titleError}
          helperText={titleError ? 'Title should be at least 5 characters' : ''}
        />

        <TextField
          label="Post Content"
          multiline
          minRows={3}
          value={content}
          variant="outlined"
          fullWidth
          onChange={event => setContent(event.target.value)}
          required
          error={contentError}
          helperText={
            contentError ? 'Content should be at least 50 characters' : ''
          }
          sx={{
            mb: 3,
          }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!title || !content}
        >
          SUBMIT
        </Button>
      </form>
    </Modal>
  );
};
