import React, {useEffect, useState} from 'react';


import ProductCard from '../components/products/ProductCard';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux';
import SkeletonArticle from '../skeleton/SkeletonArticle';
import {getWishlist} from '../actions/wishlist';
import {Container} from 'react-bootstrap';
const Wishlist = () => {
  const error = useSelector((state) => state.wishlist?.error);
  //    console.log(query)
  const [show, setShow] = useState(error ? true : false);
  const data = useSelector((state) => state.wishlist.wishlistItems);
  const loading = useSelector((state) => state.wishlist.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
  }, []);
  return (
    <Container>
      <div className="mainarea wishlist_main main-search">
        <div className="all-list search">
          {data.length > 0 ? (
            <div className="all-products">
              {loading ? (
                <>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div className="product-card" key={n}>
                      <SkeletonArticle key={n} />
                    </div>
                  ))}
                </>
              ) : (
                <ProductCard product={data ? data : []} />
              )}
              <Message
                showModal={show}
                msg={'Opps!,Something went wrong'}
                img={'https://image.flaticon.com/icons/png/512/835/835408.png'}
                type="error"
                closeModal={setShow}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <img
                src="https://aquamarineexotic.com/adminpanel/assets/images/empty-wishlist.png"
                alt=""
                className="img-fluid"
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Wishlist;
