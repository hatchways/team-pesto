import React from 'react';
import { Drawer, Paper, Typography, Link, Card } from '@material-ui/core';

import useStyles from './ReviewSidebar.css';
import formatDate from 'utils/formatDate';

const ReviewSidebar = ({ reviews }) => {
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
            to={`/requests/${review.id}`}
          >
            <Card
              className={classes.card}
              data-id={review.id}
              variant="outlined"
              // style={borderColor(review["_id"])}
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
