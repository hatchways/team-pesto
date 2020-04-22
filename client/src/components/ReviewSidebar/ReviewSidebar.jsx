import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Typography, Card } from '@material-ui/core';

import useStyles from './ReviewSidebar.css';
import formatDate from 'utils/formatDate';

const ReviewSidebar = ({ reviews, active }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant='permanent'
      className={classes.drawer}
      PaperProps={{
        className: classes.reviewSidebarPaper,
        elevation: 8,
      }}
    >
      <div className={classes.drawerContainer}>
        <Typography variant="h3" className={classes.title}>
          Reviews <span className={classes.quantity}>({reviews.length})</span>
        </Typography>

        {reviews.map((review) => (
          <Link
            key={review.id}
            className={classes.link}
            to={`/reviews/${review['_id']}`}
          >
            <Card
              className={
                `${classes.card} ${review['_id'] === active ? classes.active: null}`
              }
              data-id={review.id}
              variant="outlined"
            >
              <Typography className={classes.reviewTitle}>{review.title}</Typography>
              <Typography className={classes.date}>
                {formatDate(review.date)}
              </Typography>
            </Card>
          </Link>
        ))}
      </div>
    </Drawer>
  );
};

export default ReviewSidebar;
