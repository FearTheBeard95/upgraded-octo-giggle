/* eslint-disable no-unused-vars */
import { Provider } from "react-redux";
import AppRouter from './routers/AppRouter'
import configureStore from "./store/configureStore";
import {addExpense} from "./actions/expenses";
import { setFilter } from "./actions/filters";
import getExpenses from "./selectors/expenses";
import normalize from 'normalize.css'
//import './styles/styles.scss'

const store = configureStore()

store.dispatch(addExpense({
  description: 'water bill',
  amount: 700
}))

store.dispatch(addExpense({
  description: 'Rent bill',
  amount: 1090,
  createdAt: 1000
}))

store.dispatch(addExpense({
  description: 'gas bill',
  amount: 1000
}))


const state = store.getState()
const visibileExpenses = getExpenses(state.expenses, state.filters)

console.log(visibileExpenses)



function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
