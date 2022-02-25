import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const responce = await fetch('https://rn-test-medyk-default-rtdb.firebaseio.com/products.json')

      if (!responce.ok) {
        throw new Error("Something goes wrong!")
      }

      const responceData = await responce.json();

      const loadedProducts = []

      for (const key in responceData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            responceData[key].title,
            responceData[key].imageUrl,
            responceData[key].description,
            responceData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts })
    } catch (err) {
      throw err;
    }
  }
}

export const deleteProduct = productId => {
  return async dispatch => {
    const responce = await fetch(`https://rn-test-medyk-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE'
      }
    );

    if(!responce.ok) {
      throw new Error('Something went wrong!')
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    const responce = await fetch('https://rn-test-medyk-default-rtdb.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    })

    const responceData = await responce.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responceData.name,
        title,
        description,
        imageUrl,
        price
      }
    })

  }
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async dispatch => {

    const responce = await fetch(`https://rn-test-medyk-default-rtdb.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
      })
    })

    if(!responce.ok) {
      throw new Error('Something went wrong')
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      }
    })
  };
};
