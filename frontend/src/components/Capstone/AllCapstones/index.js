import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import * as capstoneActions from '../../../store/capstone';
import RenderCapstone from '../RenderCapstone/index';

import './index.css';

function AllCapstones() {
  const dispatch = useDispatch();
  const capstones = useSelector((state) => state.capstones.allCapstones);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth0();

  useEffect(() => {
    dispatch(capstoneActions.fetchCapstones(1));
    dispatch(capstoneActions.fetchUserCapstone(user.id));
  }, [user, dispatch]);

  const handleScroll = useCallback(async () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000;
    if (nearBottom && hasMore && !isLoading) {
      setIsLoading(true);
      setPageNumber((prevNumber) => {
        const newNumber = prevNumber + 1;
        dispatch(capstoneActions.fetchCapstones(newNumber)).then((newCapstones) => {
          setIsLoading(false);
          if (!newCapstones || Object.keys(newCapstones).length < 10) {
            setHasMore(false);
          }
        }).catch(() => {
          setIsLoading(false);
        });
        return newNumber;
      });
    }
  }, [hasMore, isLoading, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="capstones-container">
        {capstones && Object.values(capstones)
          .reverse()
          .map((capstone, index) => (
            Object.keys(capstone).length > 0 ? (
              <RenderCapstone key={capstone.id || index} capstone={capstone} />
            ) : null
          ))
        }
        {!hasMore && <div>No more capstones available.</div>}
      </div>
    </>
  );
}

export default AllCapstones;
