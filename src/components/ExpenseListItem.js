import React from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { removeExpense } from "../actions/expenses"

const ExpenseListItem = ({ id, description, amount, createdAt, dispatch }) => (
    <div>
        <p>{description}  {amount}  {createdAt} <button onClick={() => {
            dispatch(removeExpense({ id }))
        }}>remove</button>
        <Link to={`/edit/${id}`} >
            <button>Edit</button>
        </Link>
         </p>
    </div>
)

export default connect()(ExpenseListItem)