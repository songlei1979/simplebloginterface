import React, {useState} from 'react';
import {addCategory, userLogin} from "../Functions";

function AddCategory(props) {
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')

    const addBtn =()=>{
       if (!addCategory(category)){
           setError("Add New Category Failed")
       }
        
    }

    return (
        <div>
            <h1>Add Category</h1>
            <div className = "mb-3">
                <label htmlFor={"category"} className={"form-label"}>New Category</label>
                <input type={"text"} className={"form-control"} id={"category"}
                       placeholder={"Please enter a category name"}
                        value={category} onChange={e=>setCategory(e.target.value)}
                />
                <div className = "mb-3">
                <label htmlFor={"error"} className={"form-label"}>{error}</label>
            </div>
            <button className={"btn btn-primary"} onClick={addBtn}>Add Category</button>
            </div>
        </div>
    );
}

export default AddCategory;