import React, { createContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [crudLoading, setCRUDLoading] = useState(false);

  const getComments = async (bookId) => {
    const commentQuery = query(
      collection(db, "comment"),
      where("bookId", "==", bookId)
    );

    const data = await getDocs(commentQuery);
    const getData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // console.log(getData);
    setComments(getData);
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        crudLoading,
        getComments,
        setCRUDLoading,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
