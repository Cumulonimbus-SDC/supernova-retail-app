import React, { useState } from 'react';
import SearchQuestion from './searchQuestion';
import QuestionDisplay from './questionDisplay';
import AskQuestionModal from './questionForm.js';
import AddAnswerModal from './addAnswerModal.js';
import Button from 'react-bootstrap/Button';
import MoreQuestions from './moreQuestions';

const QuestionsAndAnswers = (props) => {
  const [AddQuestionModal, setAddQuestionModal] = useState(false);
  const [AddAnswer, setAddAnswer] = useState(false);

  const closeModal = () => {
    setAddQuestionModal(false);
  };

  const closeAddQuestionModal = () => {
    setAddAnswer(false);
  };

  const showAddAnswerModal = () => {
    setAddAnswer(true);
  };

  if (AddQuestionModal) {
    return (
      <AskQuestionModal
        closeModal={closeModal}
        show={AddQuestionModal}
        name={props.currentProductName}
        productID={props.currentProductID}
      />
    );
  } else if (AddAnswer) {
    return (
      <AddAnswerModal
        closeModal={closeAddQuestionModal}
        show={AddAnswer}
        name={props.currentProductName}
        productID={props.currentProductID}
      />
    );
  } else {
    return (
      <div>
        <h1>Questions and Answers</h1>
        <SearchQuestion />
        <div className="allCards">
          <QuestionDisplay
            productID={props.currentProductID}
            showModal={showAddAnswerModal}
          />
        </div>
        <hr></hr>
        <MoreQuestions />
        <Button
          variant="success"
          className="qa-button"
          onClick={() => {
            setAddQuestionModal(true);
          }}
        >
          Add A Question
        </Button>
      </div>
    );
  }
};

export default QuestionsAndAnswers;
