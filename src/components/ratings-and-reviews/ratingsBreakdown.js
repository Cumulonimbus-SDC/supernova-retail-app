import React from "react";
import Stars from "./stars.js";
import RatingFilters from "./ratingFilters.js";

const RatingsBreakdown = (props) => {
  let chars;
  props.currentRating !== undefined &&
  props.currentRating.characteristics !== undefined
    ? (chars = props.currentRating.characteristics)
    : (chars = null);
  return (
    <div id="ratings-breakdown-container">
      {props.currentProductRatings &&
      props.averageRating &&
      (props.recommend === 0 || props.recommend) &&
      props.currentRating ? (
        <>
          <div id="avg-rating">
            <h1>
              <strong>{Number(props.averageRating).toFixed(1)}</strong>
            </h1>
            <Stars rating={Number(props.averageRating)} />
          </div>
          <small>{`${props.currentProductRatings.length} Reviews of this product`}</small>
          <RatingFilters
            class="ratings-filters-container"
            recommend={props.recommend}
            currentProductRatings={props.currentProductRatings}
            currentRating={props.currentRating}
            handleFilter={props.handleFilter}
          />
          <small>{`${props.recommend.toFixed(0)}% of reviews recommend this product`}</small> <br/>
          <RatingFilters
            class="characteristics-ratings-container"
            recommend={props.recommend}
            currentProductRatings={props.currentProductRatings}
            currentRating={props.currentRating}
            handleFilter={props.handleFilter}
          />
        </>
      ) : null}
    </div>
  );
};

export default RatingsBreakdown;

{
  /* <span key={i} id='rating-filter-container'><label className='filter-elem'>{`${i + 1} Stars`}</label><ProgressBar now={this.findPercentage(i + 1)} className='progress-gray'/><>{'   '}</><small className='filter-elem'>{`${this.getReviewsWithRating(i + 1)} Reviews`}</small></span>;


chars !== null ? 
                        Object.entries(chars).map(([char, val]) => {
                            return <p key={val.id}>{`${char}: ${val.value}`}</p>
                        })
                        : null */
}
