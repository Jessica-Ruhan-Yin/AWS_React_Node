import axios from 'axios';
import Layout from "../components/Layout";
import Link from 'next/link';
import {API} from '../config';
import React, {useEffect, useState} from 'react'
import moment from "moment";

const Home = ({categories}) => {

  const [popular, setPopular] = useState([])

  useEffect(() => {
    loadPopularLink()
  }, [])

  /**
   * List all categories
   * @returns {*}
   */
  const listCategories = () =>
    categories.map((c, i) => (
      <Link href={`/links/${c.slug}`} key={c._id}>
        <a style={{border: '1.5px solid #FFC0CB'}} className="bg-light p-3 col-md-4">
          <div key={i}>
            <div className="row">
              <div className="col-md-4">
                <img
                  src={c.image && c.image.url}
                  alt={c.name}
                  style={{width: '120px', height: '70px'}}
                  className="pr-3"
                />
              </div>
              <div className="col-md-8">
                <h3>{c.name}</h3>
              </div>
            </div>
          </div>
        </a>
      </Link>
    ));

  /**
   * List popular links
   * @returns {*}
   */
  const loadPopularLink = async () => {
    const response = await axios.get(`${API}/link/popular`)
    setPopular(response.data);
    console.log(response.data)
  }

  const listOfLinks = () =>
    popular.map((l, i) => (
      <div key={i} className="row alert alert-danger p-2" style={{backgroundColor: '#fff5f9'}}>
        <div className="col-md-8" onClick={() => handleClick(l._id)}>
          <a href={l.url} target="_blank">
            <h4 className="pt-2" style={{color: '#041861'}}>{l.title}</h4>
            <h6 className="pt-2" style={{fontSize: '16px', color: '#4d78ff'}}>{l.url}</h6>
          </a>
        </div>
        <div className="col-md-4 pt-2">
          <span className="pull-right" style={{fontSize: '16px'}}>
            {moment(l.createdAt).fromNow()} by {l.postedBy.name}</span>
          <br/><br/>
          <span className="badge text-secondary pull-right" style={{fontSize: '14px'}}>{l.clicks} clicks</span>
        </div>
        <div className="col-md-12">
          <span className="badge text-dark" style={{fontSize: '14px'}}>{l.type} / {l.medium}&nbsp;&nbsp;&nbsp;</span>
          {l.categories.map((c, i) => (
            <span key={i} className="badge" style={{fontSize: '16px', color: '#ffb1d5'}}>{c.name}</span>
          ))}
        </div>
      </div>
    ));

  // when click a link, clicks++
  const handleClick = async (linkId) => {
    const response = await axios.put(`${API}/click-count`, {linkId})
    await loadPopularLink();
  }


  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1 className="font-weight-bold">Browse Tutorials/Courses</h1>
          <br/>
        </div>
      </div>

      <div className="row">{listCategories()}</div>
      <div className="row pt-5">
        <h2 className="font-weight-bold pd-3">Trending</h2>
        <div className="col-md-12 overflow-hidden">{listOfLinks()}</div>
      </div>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const response = await axios.get(`${API}/categories`);
  return {
    categories: response.data
  };
};

export default Home;