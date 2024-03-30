import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import authApi from '../api/authApi';
import {fetchProductById} from '../actions'; // Assuming you have a fetchProductById action

const EditProduct = () => {
  const {id} = useParams(); // Get productId from URL params
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    ingredients: '',
    specialInstruction: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Fetch product details when component mounts
    dispatch(fetchProductById(id)); // Dispatch fetchProductById action with productId
  }, [dispatch, id]);

  // Select product details from redux store
  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: productLoading,
    error: productError,
    product,
  } = productDetails;

  useEffect(() => {
    // Set form fields with product details after fetching
    if (product) {
      setProductData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image: product.image,
        specialInstruction: product.specialInstruction,
        ingredients: product.ingredients,
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation checks
    const {name, description, price, category, image, ingredients} =
      productData;

    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !image ||
      !ingredients
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (isNaN(parseInt(price))) {
      setError('Price must be a number.');
      return;
    }

    setLoading(true);
    try {
      // Make a request to update the product
      await authApi.put(`/api/products/${id}`, productData);
      setLoading(false);
      setShowSuccessMessage(true);
      setError('');
    } catch (error) {
      console.log('error', error);
      setLoading(false);
      setError('Failed to update product. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const closeModal = () => {
    setShowSuccessMessage(false);
  };

  return (
    <>
      <div className="mainarea admin my-3">
        <div className="auth">
          <div className="form">
            <h4>Edit Product</h4>
            {error && <p className="error-message text-danger">{error}</p>}
            {loading ? (
              <Spinner />
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Input fields for product details */}
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                />
                <input
                  type="text"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                />
                <input
                  type="text"
                  name="specialInstruction"
                  value={productData.specialInstruction}
                  onChange={handleInputChange}
                  placeholder="Special Instruction"
                />
                <input
                  type="text"
                  name="ingredients"
                  value={productData.ingredients}
                  onChange={handleInputChange}
                  placeholder="Ingredients"
                />
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  rows="11"
                  placeholder="Description"
                />
                {/* Select field for category */}
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  <option value="pizza">Pizza</option>
                  <option value="burger">Burger</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Smoothy">Smoothie</option>
                  <option value="Snak">Snacks</option>
                  <option value="Drink">Drinks</option>
                </select>
                {/* Input field for image upload */}
                <img
                  src={productData.image}
                  alt={productData.name}
                  className="img-fluid"
                />
                <input type="file" name="image" onChange={handleInputChange} />
                <button type="submit">
                  {loading ? <Spinner /> : 'Update'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      {/* Success message modal */}
      {showSuccessMessage && (
        <Message
          showModal={showSuccessMessage}
          msg={'Product Updated Successfully'}
          img={'https://example.com/success-image.jpg'} // Update with actual image URL
          type="success"
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default EditProduct;
