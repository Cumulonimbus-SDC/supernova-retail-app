import React from "react";
import Modal from "react-bootstrap/Modal";

class UploadPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
      let temp = this.state.images;
      temp.push(e.target.files[0]);
      this.setState({
          images: temp
      })
  }

  handleUpload(e) {
      console.log(e.target.value);
      this.props.toggleModal(e, this.state.images);
  }

  render() {
    return (
      <Modal
        className="modal"
        show={this.props.showImgModal}
        animation={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <h4>Upload Your Photos</h4>
            <h6>
              <small>{`About the ${this.props.currentProductName}`}</small>
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label className='label-container' htmlFor='photo'>Choose up to 5 photos: <br/>
                {['1', '2', '3', '4', '5'].map((item, i) => {
                    console.log((this.state.images.length === i))
                    return this.state.images.length >= item ? <><img src={`${this.state.images[i].name}`} className="review-photo"/><br/></> : <input type="file" id={i} name="photo" onChange={this.handleChange} accept="image/png, image/jpeg, image/jpg"/>
                }) }
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="main-action-button review-button"
            value={this.state.images}
            onClick={(e) => this.handleUpload(e)}
          >
            Upload
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UploadPhotos;
