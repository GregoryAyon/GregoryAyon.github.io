import React, { useEffect, useState } from "react";
import EmptyList from "../EmptyList";
import { useParams } from "react-router-dom";
import { galleryList } from "../../config/data";
import { Link } from "react-router-dom";
import Feedback from "./Feedback";

const GalleryItem = () => {
  const { id } = useParams();
  const [GItem, setGItem] = useState(null);

  useEffect(() => {
    let GItem = galleryList.find((GItem) => {
      return GItem.id === parseInt(id);
    });
    if (GItem) {
      setGItem(GItem);
    }
  }, []);
  return (
    <>
      <div className="container">
        <Link className="my-1 btn btn-dark btn-sm" to="/">
          <span> &#8592;</span> <span>Go Back</span>
        </Link>
        {GItem ? (
          <div className="card">
            <img src={GItem.cover} alt="cover" />
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 col-md-6">
                  <h4 className="card-title fw-bold">{GItem.title}</h4>
                  <div className="row">
                    <div className="col-sm-6 col-md-6">
                      <p className="text-muted fw-bolder">
                        Category: {GItem.category}
                      </p>
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <p className="text-muted">Published: {GItem.createdAt}</p>
                    </div>
                  </div>
                  <p className="card-text">{GItem.description}</p>
                </div>
                <div className="col-sm-6 col-md-6">
                  <Feedback id={id} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
      <br />
      <br />
    </>
  );
};

export default GalleryItem;
