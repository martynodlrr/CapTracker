import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as capstoneActions from '../../../store/capstone';
import RenderCapstone from '../RenderCapstone/index';

import './index.css';

function AllCapstones() {
  const dispatch = useDispatch();
  const capstones = useSelector((state) => state.capstones.allCapstones);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(capstoneActions.fetchCapstones(1));
    dispatch(capstoneActions.fetchUserCapstone());
  }, [dispatch]);

  const handleScroll = useCallback(async () => {
    // window.scrollY is how much has scrolled
    // window.innerHeight is how much of the page is showing
    // document.body.offsetHeight is how much of the page is availible

    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000;
    if (nearBottom && hasMore) {
      setPageNumber((prevNumber) => {
        const newNumber = prevNumber + 1;
        dispatch(capstoneActions.fetchCapstones(newNumber)).then((newCapstones) => {
          if (!newCapstones || newCapstones.length < 10) {
            setHasMore(false);
          }
        });
        return newNumber;
      });
    }
  }, [hasMore, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="all-capstones-container">
        {capstones && [...Object.values(capstones)].reverse().map((capstone, index) => (
          <div className="capstone-item" key={index}>
            <RenderCapstone capstone={capstone} />
          </div>
        ))}
        {!hasMore && <div className="no-more-capstones">No more capstones available.</div>}
      </div>
    </>
  );
}

export default AllCapstones;
