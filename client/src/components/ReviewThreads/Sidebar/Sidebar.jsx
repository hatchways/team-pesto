import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Drawer, Typography, Card, Box } from '@material-ui/core';
import { HourglassEmpty, Check, CheckCircle } from '@material-ui/icons';

import useStyles from './Sidebar.css';
import formatDate from 'utils/formatDate';

const Sidebar = ({ reviews, type }) => {
  const classes = useStyles();
  const activeId = useParams().id;

  const title = type[0].toUpperCase() + type.slice(1);

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <HourglassEmpty color='primary' />
      case 'accepted':
        return <Check color='primary' />
      case 'completed':
        return <CheckCircle color='primary' />
      default:
        return null;
    }
  };

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
          {title} <span className={classes.quantity}>({reviews.length})</span>
        </Typography>

        {reviews.map((review) => (
          <Link
            key={review['_id']}
            className={classes.link}
            to={`/${type}/${review['_id']}`}
          >
            <Card
              className={
                `${classes.card} ${review['_id'] === activeId ? classes.active: null}`
              }
              data-id={review.id}
              variant="outlined"
            >
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <div>
                  <Typography className={classes.reviewTitle}>{review.title}</Typography>
                  <Typography className={classes.date}>
                    {formatDate(review.date)}
                  </Typography>
                </div>

                {renderStatusIcon(review.status)}
              </Box>
            </Card>
          </Link>
        ))}
      </div>
    </Drawer>
  );
};

export default Sidebar;
