import { connect } from "react-redux";
import filters from "../reducers/filters";
import ExpenseItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

const ExpenseList = (props) => (
    <div>
        <h2>Expense List</h2>
        {props.expenses.map((expense, index) => 
            <ExpenseItem key={expense.id} {...expense}/>)}
    </div>
)

const mapStateToProps = (state)=>{
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
} 

export default connect(mapStateToProps)(ExpenseList);