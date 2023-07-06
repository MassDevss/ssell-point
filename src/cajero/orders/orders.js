
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


//* form fields and logic

const dataForm = document.getElementById('form-edit');

const editHour = document.getElementById('field-i-hour');
const editCost = document.getElementById('field-i-cost');
const editProducts = document.getElementById('field-i-products');
const editAddress = document.getElementById('field-i-address');


const filterForm = document.getElementById('filter-orders');

const dateField = document.getElementById('fil-date');
const timeField = document.getElementById('fil-time');
const costField = document.getElementById('cost-order');

const allInputs = [
  editHour,
  editCost,
  editProducts,
  editAddress,

  dateField,
  timeField,
  costField
];

const clearFields = () => {
  allInputs.forEach( (field) => {field.value = ''});
}

clearFields();