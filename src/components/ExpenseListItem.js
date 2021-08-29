import React from "react";
import { connect } from "react-redux";
import { removeExpense } from "../actions/expenses"

const ExpenseListItem = ({ id, description, amount, createdAt, dispatch }) => (
    <div>
        <p>{description}  {amount}  {createdAt} <button onClick={() => {
            dispatch(removeExpense({ id }))
        }}>remove</button> <button>Edit</button> </p>
    </div>
)

export default connect()(ExpenseListItem)