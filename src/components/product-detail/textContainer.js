import React from "react";
import apiMaster from "../../apiMaster";

import Stars from "../ratings-and-reviews/stars.js";
import { GrFormCheckmark } from "react-icons/gr";
import { FiChevronDown } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

class TextContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bagError: "",
      bagMessage: "Add to Bag",
      bagIcon: <FiPlus />,
      favoriteStatus: false,
      favoriteIcon: <AiOutlineStar />,
      currentlySelectedSize: "Select Size",
      currentlySelectedQuantity: "-",
    };

    this.handleAddToBag = this.handleAddToBag.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  handleAddToBag() {
    if (
      this.state.currentlySelectedSize !== "Select Size" &&
      this.state.currentlySelectedQuantity !== "-"
    ) {
      apiMaster
        .addToCart(parseInt(this.props.userToken), this.props.product.id)
        .then(() => {
          this.setState({
            bagMessage: "Added",
            bagIcon: <GrFormCheckmark />,
          });
          setTimeout(
            () =>
              this.setState({ bagMessage: "Add to Bag", bagIcon: <FiPlus /> }),
            3000
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({
        bagError: "Please select a size and quantity!",
      });
    }
  }

  handleFavorite() {
    if (this.state.favoriteStatus === false) {
      this.setState({
        favoriteStatus: true,
        favoriteIcon: <AiFillStar />,
      });
    } else {
      this.setState({
        favoriteStatus: false,
        favoriteIcon: <AiOutlineStar />,
      });
    }
  }

  selectSize(event) {
    if (this.state.currentlySelectedSize === "Select Size") {
      this.setState({
        currentlySelectedQuantity: 1,
      });
    } else if (event.target.id === "Select Size") {
      this.setState({
        currentlySelectedQuantity: "-",
      });
    }

    this.setState({
      bagError: "",
      currentlySelectedSize: event.target.id,
    });

    if (
      this.props.selectedStyle.skus[event.target.id] <
      this.state.currentlySelectedQuantity
    ) {
      this.setState({
        currentlySelectedQuantity: this.props.selectedStyle.skus[
          event.target.id
        ],
      });
    }
  }

  selectQuantity(event) {
    this.setState({
      bagError: "",
      currentlySelectedQuantity: event.target.id,
    });
  }

  render() {
    return (
      <div
        id="product-detail-text-container"
        className={this.props.textContainerVisibility}
      >
        <Stars rating={this.props.averageRating} />
        <a href="#reviews-ratings-container" id="reviews-link">
          Read all reviews
        </a>
        <div id="product-category">{this.props.product.category}</div>
        <div id="product-name">{this.props.product.name}</div>
        {this.props.selectedStyle !== null ? (
          <div id="product-price">
            {this.props.selectedStyle !== null &&
            this.props.selectedStyle.sale_price != 0 &&
            this.props.selectedStyle.sale_price !==
              this.props.selectedStyle.original_price ? (
              <span>
                <span id="overridden-price">
                  ${this.props.selectedStyle.original_price}
                </span>
                ${this.props.selectedStyle.sale_price}
              </span>
            ) : (
              <span>${this.props.selectedStyle.original_price}</span>
            )}
          </div>
        ) : null}
        <div id="styles-menu">
          <div id="styles-menu-heading">
            <strong>STYLE ></strong>
            {this.props.selectedStyle !== null ? (
              <span> {this.props.selectedStyle.name}</span>
            ) : null}
          </div>
          <div id="product-style-icon-container">
            {this.props.styles !== []
              ? this.props.styles.map((style, index) => (
                  <div
                    className="product-style-icon"
                    style={{
                      backgroundImage: `url(${style.photos[0].thumbnail_url})`,
                    }}
                    onClick={() => this.props.updateSelectedStyle(index)}
                  >
                    {this.props.selectedStyle === style ? (
                      <span>
                        <span id="selected-style-checkmark-frame"></span>
                        <span id="selected-style-checkmark">
                          <GrFormCheckmark />
                        </span>
                      </span>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="main-action-dropdown">
          <span className="main-action-button" id="size-selector">
            {this.state.currentlySelectedSize}
            <span className="main-action-button-symbol main-action-button-symbol-floated">
              <FiChevronDown />
            </span>
            <div className="main-action-dropdown-content">
              {this.props.selectedStyle !== null ? (
                this.state.currentlySelectedSize !== "Select Size" ? (
                  <a
                    id="Select Size"
                    onClick={(event) => this.selectSize(event)}
                  >
                    Select Size
                  </a>
                ) : null
              ) : null}
              {this.props.selectedStyle !== null
                ? Object.keys(this.props.selectedStyle.skus).map((key) => (
                    <a id={key} onClick={(event) => this.selectSize(event)}>
                      {key}
                    </a>
                  ))
                : null}
            </div>
          </span>
        </div>
        <div className="main-action-dropdown">
          <span className="main-action-button" id="quantity-selector">
            {this.state.currentlySelectedQuantity}
            <span className="main-action-button-symbol main-action-button-symbol-floated">
              <FiChevronDown />
            </span>
            <div className="main-action-dropdown-content">
              {this.props.selectedStyle !== null &&
              this.state.currentlySelectedSize === "Select Size" ? (
                this.state.currentlySelectedQuantity !== "-" ? (
                  <a id="-" onClick={(event) => this.selectQuantity(event)}>
                    -
                  </a>
                ) : null
              ) : null}
              {this.props.selectedStyle !== null &&
              this.state.currentlySelectedSize !== "Select Size"
                ? [
                    ...Array(
                      this.props.selectedStyle.skus[
                        this.state.currentlySelectedSize
                      ]
                    ),
                  ].map((item, i) => (
                    <a
                      id={i + 1}
                      onClick={(event) => this.selectQuantity(event)}
                    >
                      {i + 1}
                    </a>
                  ))
                : null}
            </div>
          </span>
        </div>
        <span
          className="main-action-button"
          id="add-to-bag-button"
          onClick={(event) => this.handleAddToBag(event)}
        >
          {this.state.bagMessage}
          <span className="main-action-button-symbol main-action-button-symbol-floated">
            {this.state.bagIcon}
          </span>
        </span>
        <span
          className="main-action-button"
          id="favorite-button"
          onClick={(event) => this.handleFavorite(event)}
        >
          <span className="main-action-button-symbol">
            {this.state.favoriteIcon}
          </span>
        </span>
        <div id="bag-error">{this.state.bagError}</div>
      </div>
    );
  }
}

export default TextContainer;
