import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SkeletonArticle from '../skeleton/SkeletonArticle';
import {fetchPizzas, deletePizza} from '../actions'; // Assuming you have a deletePizza action
import Message from '../components/Message';
import {Link} from 'react-router-dom';
import {Container} from 'react-bootstrap';

const ProductList = ({category}) => {
  const dispatch = useDispatch();
  const allPizzas = useSelector((state) => state.allPizza);
  const {loading, error, data} = allPizzas;
  const [showError, setShowError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('pizza');
  const [successMessage, setSuccessMessage] = useState('');
  // const history = useHistory();

  useEffect(() => {
    if (category) {
      dispatch(fetchPizzas(category));
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchPizzas(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  const handleEdit = (productId) => {
    // history.push(`/edit-product/${productId}`);
    // Handle edit logic here, e.g., navigate to edit product page
    console.log('Editing product:', productId);
    window.location.href = `/edit-product/${productId}`;
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deletePizza(productId));
        setSuccessMessage('Product deleted successfully');
        // Refresh product list after deletion
        dispatch(fetchPizzas(selectedCategory));
      } catch (error) {
        setShowError(true);
      }
    }
  };

  return (
    <Container>
      <form>
        <div className="category-dropdown col-6 mx-auto mt-5">
          <h4>Select the Category</h4>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Smoothy">Smoothies</option>
            <option value="Snak">Sides</option>
            <option value="Drink">Drinks</option>
            {/* Add other categories as needed */}
          </select>
        </div>
      </form>

      {successMessage && <Message msg={successMessage} type="success" />}

      <div className="all-products">
        {loading || data.length === 0 ? (
          <>
            {[1, 2, 3].map((n) => (
              <div className="product-card" key={n}>
                <SkeletonArticle key={n} />
              </div>
            ))}
          </>
        ) : (
          <>
            {data.map((product) => (
              <div
                className="product-card box-shadow product-list"
                key={product._id}>
                <div className="mb-3">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="product-details">
                  <h6>{product.name}</h6>
                  <p>{product.description}</p>
                  <h6>Price: ${product.price}</h6>
                  <div className="row justify-content-around align-items-center">
                    <button
                      className="col-5 edit"
                      onClick={() => handleEdit(product._id)}>
                      Edit
                    </button>
                    <button
                      className="col-5"
                      onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {error && (
          <Message
            showModal={showError}
            msg={'Oops!, Something went wrong'}
            img={'https://image.flaticon.com/icons/png/512/835/835408.png'}
            type="error"
            closeModal={() => setShowError(false)}
          />
        )}
      </div>
    </Container>
  );
};

export default ProductList;
