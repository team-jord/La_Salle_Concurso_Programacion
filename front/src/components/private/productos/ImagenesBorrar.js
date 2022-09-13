import React, { Component, Fragment } from "react";

const ImagenesBorrar = ({ previewImages }) => {
  return (
    <Fragment>
      {previewImages.length > 0 &&
        previewImages.map((element, index) => {
          return (
            <div className="galleryUploader" key={index}>
              {element ? (
                <img
                  src={element}
                  width="600"
                  height="400"
                />
              ) : null}
            </div>
          );
        })}
    </Fragment>
  );
};

export default ImagenesBorrar;
