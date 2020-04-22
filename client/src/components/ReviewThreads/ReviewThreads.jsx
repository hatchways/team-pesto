import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import useStyles from './ReviewThreads.css';
import Sidebar from './Sidebar';
import Thread from './Thread';

const ReviewThreads = ({ type, reviews, fetchReviews }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar reviews={reviews} type={type} />
      <div className={classes.threadContainer}>
        <Switch>
          {reviews.map((review) => (
            <Route
              key={review['_id']}
              exact
              path={`/${type}/${review['_id']}`}
              render=
                {() => (
                  <Thread
                    review={review}
                    type={type}
                    fetchReviews={fetchReviews}
                  />
                )}
            />
          ))}

          {reviews.length > 0 ? (
            <Route
              path={`/${type}`}
              render={() => <Redirect to={`/${type}/${reviews[0]['_id']}`} />}
            />
          ) : null}
        </Switch>
      </div>
    </div>
  );
};

export default ReviewThreads;
