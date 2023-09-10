import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as capstoneActions from '../../../store/capstones';
import RenderCapstone from '../RenderCapstone/index';

function AllCapstones() {
  const dispatch = useDispatch();
  const capstones = useSelector((state) => state.capstones.capstones);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(capstoneActions.fetchCapstones(1));
  }, [dispatch]);

  const handleScroll = useCallback(async () => {
    // window.scrollY is how much has scrolled
    // window.innerHeight is how much of the page is showing
    // document.body.offsetHeight is how much of the page is availible
    
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
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
      {capstones && Object.values(capstones).map((capstone, index) => (
        <RenderCapstone key={index} capstone={capstone} />
      ))}
      {!hasMore && <div>No more capstones available.</div>}
    </>
  );
}

export default AllCapstones;
