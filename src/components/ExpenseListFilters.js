import ExpenseList from "./ExpenseList"
import { connect } from "react-redux";
import { setFilter, sortByDate, sortByAmount } from "../actions/filters";

const ExpenseListFilters = (props) => (
    <div>
        <input type="type" value={props.filters.text} onChange={(e) => {
            props.dispatch(setFilter(e.target.value))
        }}/>
        <select value={props.filters.sortBy} onChange={(e) => {
            if(e.target.value === 'date')
                props.dispatch(sortByDate())
            else
                props.dispatch(sortByAmount())
        }}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
)

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters)