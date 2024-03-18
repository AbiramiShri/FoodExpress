import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductById, updateProduct} from '../actions';
import Message from '../components/Message';
import Spinner from '../components/Spinner';

const EditProduct = () => {
  const {productId} = useParams(); // Get productId from URL params
  const dispatch = useDispatch();
  // const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch product details when component mounts
    dispatch(fetchProductById(productId))
      .then((product) => {
        console.log('product', product);
        // Populate form fields with product details
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch product details');
        setLoading(false);
      });
  }, [dispatch, productId]);

  const handleInputChange = (e) => {
    // Update form data when input fields change
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the image data to state or do whatever you need
        setFormData({...formData, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch updateProduct action to update the product details
      await dispatch(updateProduct(productId, formData));
      setSuccessMessage('Product updated successfully');
    } catch (error) {
      setError('Failed to update product');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Message msg={error} type="error" />;
  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept="image/*" // Optionally restrict to image files
          />
          <label htmlFor="file">Choose Image</label>
        </div>
        <button type="submit">Update Product</button>
      </form>
      {successMessage && <Message msg={successMessage} type="success" />}
    </div>
  );
};

export default EditProduct;
