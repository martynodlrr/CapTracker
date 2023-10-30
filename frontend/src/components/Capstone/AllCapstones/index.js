import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as capstoneActions from '../../../store/capstone';
import RenderCapstone from '../RenderCapstone/index';

import './index.css';

function AllCapstones() {
  const dispatch = useDispatch();
  const capstones = useSelector((state) => state.capstones.allCapstones);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(capstoneActions.fetchCapstones(1));
    dispatch(capstoneActions.fetchUserCapstone());
  }, [dispatch]);

  const handleScroll = useCallback(async () => {
    // window.scrollY is how much has scrolled
    // window.innerHeight is how much of the page is showing
    // document.body.offsetHeight is how much of the page is availible
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000;

    if (nearBottom && hasMore && !isLoading) {
      setIsLoading(true); // set loading state
      setPageNumber((prevNumber) => {
        const newNumber = prevNumber + 1;
        dispatch(capstoneActions.fetchCapstones(newNumber)).then((newCapstones) => {
          setIsLoading(false);
          if (!newCapstones || newCapstones.length < 10) {
            setHasMore(false);
          }
        }).catch(() => {
          setIsLoading(false);
        });
        return newNumber;
      });
    }
  }, [hasMore, dispatch, isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="capstones-container">
        {capstones && Object.values(capstones)
          .filter(capstone => Object.keys(capstone).length > 0)
          .reverse()
          .map((capstone, index) => (
            <RenderCapstone key={index} capstone={capstone} />
          ))
        }
        {!hasMore && <div>No more capstones available.</div>}
      </div>
    </>
  );
}

export default AllCapstones;
