import axios from 'axios';
import Layout from "../components/Layout";
import Link from 'next/link';
import {API} from '../config';
import React from 'react'

const Home = ({categories}) => {
  const listCategories = () =>
    categories.map((c, i) => (
      <Link href={`/links/${c.slug}`}>
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

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1 className="font-weight-bold">Browse Tutorials/Courses</h1>
          <br/>
        </div>
      </div>

      <div className="row">{listCategories()}</div>
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