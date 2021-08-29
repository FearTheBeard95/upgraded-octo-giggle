import { createStore, combineReducers } from "redux";
import {v4 as uuidv4} from 'uuid'

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuidv4(),
    description,
    note,
    amount,
    createdAt
  }
})

// REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// SET_TEXT_FILTER
const setFilter = (filter) => ({
  type: 'SET_TEXT_FILTER',
  filter
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate
})

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate
})

// Expense Reducer

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
          return [...state, action.expense]
        case 'REMOVE_EXPENSE':
          return state.filter((expense) =>(expense.id !== action.id))
        case 'EDIT_EXPENSE':
            return state.map((expense) =>{
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default:
            return state
    }
};

//Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.filter
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}

//get expenses
const getExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense)=>{
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b)=>{
    if(sortBy === 'date'){
      return a.createdAt < b.created ? 1 : -1
    }else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1
    }
  });
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(()=>{
  const state = store.getState()
  const expenses = getExpenses(state.expenses, state.filters)
  
  console.log(expenses)
})

const expenseOne = store.dispatch(addExpense({
  description: 'February Rent',
  amount: 7000,
  createdAt: -21000
}))

const expenseTwo = store.dispatch(addExpense({
  description: 'January Rent',
  amount: 500,
  createdAt: -10000
}))

//store.dispatch(removeExpense({id: expenseTwo.expense.id}))
 //store.dispatch(sortByAmount())

 store.dispatch(sortByDate())

// store.dispatch(setStartDate(125))

// store.dispatch(setEndDate(1250))