import React from 'react';

function Form() {
    return (
        <div className="row g-3">
            <div className="col-md-6">

                <input type="text" className="form-control" id="inputFirstName" placeholder='First Name' />
            </div>
            <div className="col-md-6">
                <input type="text" className="form-control" id="inputLastName" placeholder='Last Name' />
            </div>
            <div className="col-12">
                <input type="text" className="form-control" id="inputAddress" placeholder="Address" />
            </div>
            <div className="col-12">
                <input type="number" className="form-control" id="inputPhone" placeholder="Phone Number" />
            </div>
            <div className="col-md-6">

                <input type="text" className="form-control" id="inputCity" placeholder="City" />
            </div>
            <div className="col-md-4">

                <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                    <option>...</option>
                    <option>...</option>
                    <option>...</option>
                </select>
            </div>
            <div className="col-md-2">

                <input type="text" className="form-control" id="inputZip" placeholder='ZIP' />
            </div>
            <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                    <label className="form-check-label" htmlFor="gridCheck">
                        Check me out
                    </label>
                </div>
            </div>
            <button className="col-12  btn btn-success">CHECKOUT</button>
        </div>
    );
}

export default Form;
