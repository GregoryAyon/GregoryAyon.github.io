import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../Auth/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

const Feedback = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const feedbackListRes = collection(db, "feedbacklist");

  const getFeedbackList = async () => {
    const commentdata = await getDocs(feedbackListRes);
    const getData = commentdata.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFeedbacks(getData);
    const getFilterData = getData.filter((item) => {
      return item.photoid === parseInt(props.id);
    });
    setFeedbacks(getFilterData);
  };

  useEffect(() => {
    getFeedbackList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // dispatch(
    //   fb_create({
    //     g_item_id: parseInt(props.id),
    //     id: feedbackNewList.length + 1,
    //     name: name,
    //     comment: comment,
    //   })
    // );

    addDoc(feedbackListRes, {
      photoid: parseInt(props.id),
      username: name,
      comment: comment,
    });
    setName("");
    setComment("");
    getFeedbackList();
  };

  const user = useSelector((state) => {
    return state.getUser;
  });

  return (
    <>
      <h4 className="card-title">- Feedback Section -</h4> <hr />
      {user ? (
        <div className="card p-2">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="exampleInputEmail1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Feedback</label>
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          If you want to create your feedback please{" "}
          <Link className="link-info me-2" to="/signin">
            Sign In
          </Link>
          or
          <Link className="link-info ms-2" to="/signup">
            Sign up
          </Link>
          !
        </div>
      )}
      <h4 className="card-title mt-3">- User Feedbacks -</h4> <hr />
      {feedbacks.map((item) => {
        return (
          <div
            className="card my-1"
            key={item.id}
            style={{
              boxShadow:
                " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">{item.username}</h5>
              <p className="card-text">{item.comment}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Feedback;
