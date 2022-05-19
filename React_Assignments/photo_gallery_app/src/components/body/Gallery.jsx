import React, { useState } from "react";
import EmptyList from "../EmptyList";
import { galleryList } from "../../config/data";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Gallery = () => {
  const [galleryItems, setGallery] = useState(galleryList);

  const user = useSelector((state) => {
    return state.getUser;
  });

  // console.log(user);

  return (
    <>
      {!galleryItems.length ? (
        <EmptyList />
      ) : (
        <div>
          <div className="container gallery-container">
            <p className="page-description text-center">
              {user
                ? `User: ${user?.email} is signed in. Please view gallery!`
                : `Gallery View`}
            </p>
            <div className="tz-gallery">
              <div className="row">
                {galleryItems.map((item) => {
                  return (
                    <div className="col-sm-6 col-md-4" key={item.id}>
                      <Link className="lightbox" to={`/GalleryItem/${item.id}`}>
                        <img src={item.cover} alt="Bridge" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
