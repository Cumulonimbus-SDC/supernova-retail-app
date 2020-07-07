import React from "react";
import Stars from "./stars.js";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { FaCheck, FaCheckCircle } from "react-icons/fa";

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      showImgModal: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
  }

  handleClick() {
    let temp = this.state.showAll;
    this.setState({
      showAll: !temp,
    });
  }

  handleImgClick(e) {
    let temp = this.state.showImgModal;
    this.setState({
      showImgModal: !temp,
    });
  }

  render() {
    let date = this.props.review
      ? moment(this.props.review.date).format("MMMM D, YYYY")
      : null;
    return (
      <div id="review-tile-container">
        {this.props.review ? (
          <>
            <Stars rating={Number(this.props.review.rating)} />
            <p>{`${this.props.review.reviewer_name}, ${date}`}</p>
            <p>
              <strong>
                {this.props.review.summary.length <= 60
                  ? this.props.review.summary
                  : this.props.review.summary.slice(0, 61)}
              </strong>
            </p>
            <p>
              {this.props.review.body.length > 250 ? (
                this.state.showAll === false ? (
                  <>
                    {this.props.review.body.slice(0, 251)}
                    <span className="link" onClick={this.handleClick}>
                      ...Show More
                    </span>
                  </>
                ) : (
                  <>
                    {this.props.review.body}
                    <span className="link" onClick={this.handleClick}>
                      ...Show Less
                    </span>
                  </>
                )
              ) : (
                this.props.review.body
              )}
            </p>
            <>
              {this.props.review.photos.map((photo) => {
                return (
                  <img
                    className="review-photo"
                    key={photo.id}
                    src={photo.url}
                    value={photo.url}
                    onClick={(e) => this.handleImgClick(e)}
                  />
                );
              })}
            </>
            <Modal
              show={this.state.showImgModal}
              animation={false}
              onHide={(e) => this.handleImgClick(e)}
            >
              <Modal.Header closeButton />
              <Modal.Body>Image goes here!</Modal.Body>
            </Modal>
            <p>
              {this.props.review.recommend === 0 ? (
                <>
                  <FaCheck size=".75em" />I recommend this product
                </>
              ) : null}
            </p>
            {this.props.review.response === null ? null : (
              <p className="review-response">
                Response from seller: {this.props.review.response}
              </p>
            )}
            <p>Helpful? ({this.props.review.helpfulness}) | Report Link HERE</p>
          </>
        ) : null}
      </div>
    );
  }
}

export default ReviewTile;
