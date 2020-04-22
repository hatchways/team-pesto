import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import useStyles from './Reviews.css';
import MainContainer from 'components/MainContainer';
import ReviewSidebar from 'components/ReviewSidebar';
import SingleView from 'components/SingleView';
import { getToken } from 'utils/storage';

const Reviews = ({ match }) => {
  const classes = useStyles();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    try {
      const token = getToken();
      (async () => {
        const { data } = await axios.get("/api/reviews/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(data.reviews);
      })();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className={classes.root}>
      <ReviewSidebar reviews={reviews} active={match.params.id} />
      <div className={classes.threadContainer}>
        <Switch>
          {reviews.map((review) => (
            <Route
              key={review['_id']}
              exact
              path={`/reviews/${review['_id']}`}
              render={() => <SingleView singleRequestView={review} />}
            />
          ))}

          {reviews.length > 0 ? (
            <Route
              exact
              path={`/reviews`}
              render={() => <Redirect to={`/reviews/${reviews[0]['_id']}`} />}
            />
          ) : null}
        </Switch>
      </div>
    </div>
  );
};

export default Reviews;
