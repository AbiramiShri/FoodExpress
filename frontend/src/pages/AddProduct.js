import React, {useState} from 'react';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import authApi from '../api/authApi';

const AddProduct = () => {
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [des, setDes] = useState('');
  const [price, setPrice] = useState('');
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('');
  const [fileName, setFileName] = useState('Add Image');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation checks
    if (!name || !price || !des || !category || !img) {
      setError('Please fill in all fields.');
      return;
    }
    if (isNaN(parseInt(price))) {
      setError('Price must be a number.');
      return;
    }
    setLoading(true);
    try {
      const {data} = await authApi.post('/api/products/add-product', {
        name,
        description: des,
        price: parseInt(price),
        image: img,
        category,
      });
      // await setDoc(doc(firestore, db.foodExpress, name), {
      //   name,
      //   inStockItem: 7,
      //   outOfStock: false,
      //   img,
      // });
      setLoading(false);
      setShow(true);
      // Reset form data
      setName('');
      setDes('');
      setPrice('');
      setImg('');
      setFileName('Add Image');
      setCategory('');
      setError('');
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.includes('duplicate key')
      ) {
        setError('Product with this name already exists.');
      } else {
        setError('Failed to add product. Please try again.');
      }
    }
  };

  const handleOnChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      setFileName(file.name);
      reader.onload = (readerEvent) => {
        setImg(readerEvent.target.result);
      };
    }
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <div className="mainarea admin my-3">
        <div className="auth">
          <div className="form">
            <h4>Add Products</h4>
            {error && <p className="error-message text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  placeholder="Product Name"
                />
                <label htmlFor="name">Product Name</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  name="Price"
                  id=""
                  placeholder="Price"
                />
                <label htmlFor="Price">Price</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  name="description"
                  placeholder="Description"
                />
                <label htmlFor="description">Description</label>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value="">Category</option>
                <option value="pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Smoothy">Smoothie</option>
                <option value="Snak">Snacks</option>
                <option value="Drink">Drinks</option>
              </select>
              <div className="input-group">
                <input type="file" id="file" onChange={handleOnChange} />
                <label htmlFor="file">Add Image</label>
              </div>
              <button type="submit">{loading ? <Spinner /> : 'Add'}</button>
            </form>
          </div>
        </div>
      </div>

      {show && (
        <Message
          showModal={show}
          msg={'Product Added Successfully'}
          img={
            'https://cdn.dribbble.com/users/335541/screenshots/7102045/media/5b7237fe7bbfa31531d6e765576f1bc4.jpg?compress=1&resize=400x300'
          }
          type="success"
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default AddProduct;
