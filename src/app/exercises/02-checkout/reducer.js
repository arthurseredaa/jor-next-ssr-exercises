import {produce} from 'immer';

const saveCartData = (items) => {
  localStorage.setItem('cart_data', JSON.stringify(items))
}

const getCartData = () => {
  return JSON.parse(localStorage.getItem('cart_data'))
}

function reducer(state, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'add-item': {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );

        if (itemIndex !== -1) {
          draftState.items[itemIndex].quantity += 1;

          saveCartData(draftState.items)
          return;
        }

        draftState.items.push({
          ...action.item,
          quantity: 1,
        });
        saveCartData(draftState.items)
        return;
      }

      case 'delete-item': {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );

        draftState.items.splice(itemIndex, 1);
        saveCartData(draftState.items)
        return;
      }

      case 'initialize': {
        const items = getCartData();

        return {
          items: items || [],
          isLoading: false,
        }
      }
    }
  });
}

export default reducer;
