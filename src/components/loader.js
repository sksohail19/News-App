import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Loader() {
  return (
    <div className="row">
      {[...Array(10)].map((_, index) => (
        <div className="col-md-4 mb-3" key={index}>
          <Skeleton height="30vh" borderRadius="10px" enableAnimation={true} />
        </div>
      ))}
    </div>
  );
}

export default Loader;
