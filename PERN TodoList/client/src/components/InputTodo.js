import React, { Fragment, useState } from 'react'

const InputTodo = () => {
    const [description, setDescription] = useState("");
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch("http://localhost:5000/todos",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
            
        }

    }
    return (
        <Fragment>
            <div>
                <h1 className="text-center my-5">Hi react</h1>
                <form className="d-flex" onSubmit={onSubmitForm}>
                    <input type="text"
                        placeholder="Add Todo"
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <button className="btn btn-success">Add</button>
                </form>
            </div>
        </Fragment>
    )
}

export default InputTodo
