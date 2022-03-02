import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
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
            responceData[key].ownerId,
            responceData[key].title,
            responceData[key].imageUrl,
            responceData[key].description,
            responceData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts, userProducts: loadedProducts.filter(product => product.ownerId === userId) })
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

    if (!responce.ok) {
      throw new Error('Something went wrong!')
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const responce = await fetch(`https://rn-test-medyk-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      })
    })

    const responceData = await responce.json();

    if (!responce.ok) {
      throw new Error('Something went wrong')
    }

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responceData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      }
    })

  }
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const responce = await fetch(`https://rn-test-medyk-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
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

    if (!responce.ok) {
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
