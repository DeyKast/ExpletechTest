import { useState, useEffect } from 'react';

import { Card } from '@mui/material';
import { FetchUser } from 'service/FetchUser';
import FetchComments from 'service/FetchComments';
import { CommentsList } from 'components/CommentsList/CommentsList';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import css from './carouselItem.module.css';

const CarouselItem = ({ postData }) => {
  const [user, setUser] = useState(null);
  const [openComments, setOpenComments] = useState(false);
  const [commentsListData, setCommentsListData] = useState([]);

  const { userId, id, title, body } = postData;

  useEffect(() => {
    FetchUser(userId)
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        console.error('Помилка при отриманні даних користувача:', error);
      });
  }, [userId]);

  const handleToggleComments = id => {
    setOpenComments(!openComments);
    if (!openComments) {
      FetchComments(id)
        .then(data => {
          console.log(data);
          setCommentsListData(data);
        })
        .catch(error => {
          console.error('Помилка при отриманні коментарів:', error);
        });
    }
  };

  return (
    <>
      <Card
        key={id}
        className={css.carouselCard}
        sx={{
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginLeft: '20px',
            marginRight: '20px',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            textAlign: 'flex-start',
            wordWrap: 'break-word',
            marginLeft: '20px',
            marginRight: '20px',
          }}
        >
          {body}
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {user ? (
            <>
              <p
                style={{
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: '16px',
                  marginBottom: '0px',
                }}
              >
                {user.username}
              </p>
              <p
                style={{
                  textAlign: 'center',

                  fontSize: '14px',
                  color: 'grey',
                  marginBottom: '0px',
                  marginTop: '5px',
                }}
              >
                {user.name}
              </p>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
          <button
            className={css.showCommentsBtn}
            onClick={() => handleToggleComments(id)}
          >
            {openComments ? 'Hide comments ' : 'Show comments '}
            {openComments ? <ExpandLessIcon /> : <KeyboardArrowDownIcon />}
          </button>
          {openComments ? (
            <CommentsList
              data={commentsListData}
              commentsState={openComments}
            />
          ) : null}
        </div>
      </Card>
    </>
  );
};

export default CarouselItem;
