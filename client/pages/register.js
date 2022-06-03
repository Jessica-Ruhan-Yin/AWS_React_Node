import {useState, useEffect} from "react"
import Layout from "../components/Layout"
import React from "react";
import axios from "axios";
import {showSuccessMessage, showErrorMessage} from "../helpers/alerts";
import {API} from '../config'
import {isAuth} from "../helpers/auth";
import Router from "next/router";

const Register = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: '',
    buttonText: 'Register',
    loadedCategories: [],
    categories: []
  });

  //extract parameter
  const {name, email, password, error, success, buttonText, loadedCategories, categories} = state;

  useEffect(() => {
    isAuth() && Router.push('/');
  }, []);


  const handleChange = (name) => (e) => {
    //change state
    setState({...state, [name]: e.target.value, error: '', success: '', buttonText: 'Register'})
  };

  // load categories when component mounts using useEffect
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({...state, loadedCategories: response.data});
  };

  const handleToggle = c => () => {
    // return the first index or -1
    const clickedCategory = categories.indexOf(c);
    const all = [...categories];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setState({...state, categories: all, success: '', error: ''});
  };

  // show categories > checkbox
  const showCategories = () => {
    return (
      loadedCategories &&
      loadedCategories.map((c, i) => (
        <li className="list-unstyled" key={c._id}>
          <input type="checkbox" onChange={handleToggle(c._id)} className="mr-2"/>
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setState({
      ...state,
      buttonText: 'Registering'
    });
    try {
      const response = await axios.post(`${API}/register`, {
        name,
        email,
        password,
        categories
      });
      console.log(response);
      //clear the form and change button text
      setState({
        ...state,
        name: '',
        email: '',
        password: '',
        categories: [],
        buttonText: 'Submitted',
        success: response.data.message
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        buttonText: 'Register',
        error: error.response.data.error
      })
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          required
          value={name}
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          placeholder="Type your username"/>
      </div>
      <div className="form-group">
        <input
          required
          value={email}
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          placeholder="Type your email"/>
      </div>
      <div className="form-group">
        <input
          required
          value={password}
          onChange={handleChange('password')}
          type="password"
          className="form-control"
          placeholder="Type your password"/>
      </div>
      <div className="form-group">
        <label className="text-muted ml-4">Pick categories you are interested in</label>
        <ul style={{maxHeight: '130px', overflowY: 'scroll'}}>{showCategories()}</ul>
      </div>
      <div className="form-group">
        <button className="btn btn-outline-warning">
          {buttonText}
        </button>
      </div>
    </form>
  )

  return (<Layout>
      <div className="col-md-6 offset-md-3">
        <h1>Register</h1>
        <br/>
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        {registerForm()}
      </div>
    </Layout>
  );
};

export default Register;