import * as actions from './actionLookup'

export const updateCart = (order) => {
  return {
    type: actions.ADD_TO_CART,
    order
  }
}

export const deleteOrder = (order) => {
  return {
    type: actions.REMOVE_FROM_CART,
    order
  }
}

export const updateContact = (buyer) => {
  return {
    type: actions.UPDATE_CONTACT,
    buyer
  }
}
