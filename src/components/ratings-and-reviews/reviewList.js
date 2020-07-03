import React from 'react';
import ReviewTile from './reviewTile.js';
import MoreReviewsButton from './moreReviewsButton.js';
import AddReviewButton from './addReviewButton.js';
import SortBy from './sortBy.js';
import apiMaster from '../../apiMaster.js';

class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            sortedReviews: [], 
            isSorted: false
        };
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.filterReviews = this.filterReviews.bind(this);
    }
    
    filterReviews(sortString) {
        if (sortString === 'date') {
            return this.state.reviews.sort(function(a, b) {
                let dateA = new Date(a.date);
                let dateB = new Date(b.date)
                return dateB - dateA;
            });
        } else {
            return this.state.reviews.sort(function(a, b) {
                return b.helpfulness - a.helpfulness;
            });
        }
    }
    
    handleSortByChange(sortString) {
        let reviewsToRender;
        if (sortString === 'date' || sortString === 'helpfulness') {
            reviewsToRender = this.filterReviews(sortString);
            this.setState({
                sortedReviews: reviewsToRender,
                isSorted: true  
            });
        } else {
            this.setState({
                sortedReviews: [],
                isSorted: false
            })
        }
    }

    componentDidMount() {
        apiMaster.getReviewsOfProduct(this.props.currentProductId)
          .then(({ data }) => {
            data.results.sort((a, b) => {
                let dateA = new Date(a.date);
                let dateB = new Date(b.date);
                return dateB - dateA;
            });
            this.setState({
              reviews: data.results
            })
          })
          .catch(err => {
            console.error(err);
          })
    }

    render() {
        return (
            <>
                {this.state.reviews.length === 0 ? 
                    <div className='review-list-container'>
                        <AddReviewButton /> 
                    </div>
                    : <div className='review-list-container'>
                        <SortBy onSelect={this.handleSortByChange}/>
                        {this.state.isSorted === false ? 
                            <>
                                {
                                    this.state.reviews.map(review => {
                                        return <ReviewTile key={review.review_id} review={review}/>
                                    })
                                }
                            </> :
                            <>
                                {
                                    this.state.sortedReviews.map(review => {
                                        return <ReviewTile key={review.review_id} review={review}/>
                                    })
                                }
                            </>
                        }
                        {this.state.reviews.length > 2 ? <MoreReviewsButton /> : null}
                        <AddReviewButton />
                    </div>
                }           
            </>
        );
    }
}

export default ReviewList;