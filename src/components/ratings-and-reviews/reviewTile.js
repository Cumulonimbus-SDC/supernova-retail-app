import React from 'react';
import Stars from './stars.js';
import moment from 'moment';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';

class ReviewTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAll: false
        }; 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let temp = this.state.showAll;
        this.setState({
            showAll: !temp
        })
    }

    render() {
        console.log(this.props.review);
        let date = this.props.review ? moment(this.props.review.date).format("MMMM D, YYYY"): null;
        return(
            <div id='review-tile-container'>
                {(this.props.review) ? <> 
                    <Stars rating={this.props.review.rating}/>
                    <p>{`${this.props.review.reviewer_name}, ${date}`}</p>
                    <p><strong>{this.props.review.summary.length <= 60 ? this.props.review.summary : this.props.review.summary.slice(0, 61)}</strong></p>
                    <p>{this.props.review.body.length > 250 ? (this.state.showAll === false ? <>{this.props.review.body.slice(0, 251)}<br/><span className='link' onClick={this.handleClick}>Show More</span></> : <>{this.props.review.body}<br/><span className='link' onClick={this.handleClick}>Show Less</span></>) : this.props.review.body}</p>
                    <>{this.props.review.photos.map((photo) => {
                        return <img key={photo.id} src={photo.url} />
                    })}</>
                    <p>{this.props.review.recommend === 0 ? <><FaCheck size='.75em'/>I recommend this product</> : null}</p>
                    {this.props.review.response === null ? null : <p className='review-response'>Response from seller: {this.props.review.response}</p>}
                    <p>Helpful? ({this.props.review.helpfulness})    |    Report Link HERE</p> 
                </> : null}
            </div>
        );
    }
}

export default ReviewTile;