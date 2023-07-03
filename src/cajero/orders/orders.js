
/**
 *  global Object hoo contains all the filters has been used in orders search
 * 
 */
let filters = {
  date: {
    from: null,
    to: null
  },
  address: null,
  cost: null,
  contains: null,
};


const cleanFilters = () => {
  filters = {
    date: {
      from: null,
      to: null
    },
    address: null,
    cost: null,
    contains: null,
  };
};


// show orders in first instance
window.mainView.getOrders(filters);





