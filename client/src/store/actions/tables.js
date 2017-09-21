import * as constants from '../constants/tables';

export const createTable = (obj) => ({
  type: constants.CREATE_TABLE,
  payload: obj,
});

export const deleteTable = (index) => ({
  type: constants.DELETE_TABLE,
  index, 
});

export const deleteItem = (tableIndex, itemIndex) => ({
  type: constants.DELETE_ITEM,
  tableIndex,
  itemIndex,
});

export const updateTable = (index) => ({
  type: constants.UPDATE_TABLE,
  payload: obj,
  index: index,
});
