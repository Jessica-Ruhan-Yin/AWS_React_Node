import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {API} from '../../../config';
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts';
import Layout from "../../../components/Layout";
import withAdmin from '../../withAdmin';
import Link from "next/link";


const Read = ({user, token}) => {
  const [state, setState] = useState({
    error: '',
    success: '',
    categories: []
  });

  const {error, success, categories} = state

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({...state, categories: response.data})
  };

  const confirmDelete = (event, slug) => {
    event.preventDefault();
    // alert("Are you sure to forever DELETE this category?")
    let answer = window.confirm('Are you sure to forever DELETE this category?')
    if (answer) {
      handleDelete(slug);
    }
  }

  const handleDelete = async (slug) => {
    try {
      const response = await axios.delete(`${API}/category/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('CATEGORY DELETED', response)
      await loadCategories();
    } catch (error) {
      console.log('CATEGORY DELETE FAILED', error)
    }
  }

  const listCategories = () =>
    categories.map((c, i) => (
      <Link href={`/links/${c.slug}`} key={i}>
        <a style={{border: '1px solid #D8BFD8'}} className="bg-light p-3 col-md-4">
          <div>
            <div className="row">
              <div className="col-md-4">
                <img
                  src={c.image && c.image.url}
                  alt={c.name}
                  style={{width: '120px', height: '70px'}}
                  className="pr-3"
                />
              </div>
              <div className="col-md-5">
                <h3>{c.name}</h3>
              </div>
              <div className="col-md-3">
                <Link href={`/admin/category/${c.slug}`}>
                  <button className="btn btn-sm btn-outline-primary btn-block mb-1">Update</button>
                </Link>
                <button className="btn btn-sm btn-outline-danger btn-block mb-1"
                        onClick={(event) => confirmDelete(event, c.slug)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </a>
      </Link>
    ))


  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1>All categories</h1>
          <br/>
        </div>
      </div>
      <div className="row">
        {listCategories()}
      </div>
    </Layout>
  )
};

export default withAdmin(Read);
