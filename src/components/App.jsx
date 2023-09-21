import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, CircularProgress } from '@mui/material';

import FetchPosts from 'service/FetchPosts';

import { ModalWindow } from './ModalWindow/ModalWindow';
import CarouselItem from './CarouselItem/CarouselItem';

export const App = () => {
  const [postsData, setPostsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const handleToggleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let isMounted = true;

    FetchPosts()
      .then(({ data }) => {
        if (isMounted) {
          console.log(data);
          setPostsData(data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Помилка при отриманні постів:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCardChange = index => {
    setSelectedCardIndex(index);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: 'auto',
        maxWidth: '60%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '50px',
        marginBottom: '50px',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Carousel
            autoPlay={false}
            animation="slide"
            indicators={false}
            index={selectedCardIndex}
            onChange={handleCardChange}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 'auto',
              border: '1px solid lightgrey',
              borderRadius: '20px 20px 0px 0px',
              borderBottom: 'none',
              padding: '20px 0px',
              overflowY: 'visible',
            }}
          >
            {postsData.map(post => (
              <div key={post.id}>
                <CarouselItem
                  postData={post}
                  sx={{
                    display: 'flex',
                    height: 'auto',
                    width: '100%',
                    border: 'none',
                    borderRadius: '20px',
                  }}
                />
              </div>
            ))}
          </Carousel>

          <Button
            onClick={handleToggleModal}
            sx={{
              width: 'calc(100% + 2px)',
              border: '1px solid lightgrey',
              borderRadius: '0px 0px 20px 20px',
            }}
          >
            Add post
          </Button>
        </>
      )}

      <ModalWindow handleToggleModal={handleToggleModal} open={open} />
    </div>
  );
};
