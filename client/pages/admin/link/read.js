import Layout from "../../../components/Layout";
import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import InfiniteScroll from 'react-infinite-scroller';
import withAdmin from "../../withAdmin";
import {API} from "../../../config";
import {getCookie} from "../../../helpers/auth";
import Link from "next/link";

const Links = ({token, links, totalLinks, linksLimit, linkSkip}) => {

  const [allLinks, setAllLinks] = useState(links)
  const [limit, setLimit] = useState(linksLimit)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(totalLinks)

  const confirmDelete = (event, id) => {
    event.preventDefault();
    let answer = window.confirm('Are you sure to forever DELETE this link?')
    if (answer) {
      handleDelete(id);
    }
  }

  const handleDelete = async id => {
    try {
      const response = await axios.delete(`${API}/link/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('LINK DELETED', response);
      process.browser && window.location.reload();
    } catch (error) {
      console.log('LINK DELETE FAILED', error)
    }
  }

  const listOfLinks = () =>
    allLinks.map((l, i) => (
      <div key={i} className="row alert alert-danger p-2" style={{backgroundColor: '#fff5f9'}}>
        <div className="col-md-8">
          <a href={l.url} target="_blank">
            <h4 className="pt-2" style={{color: '#041861'}}>{l.title}</h4>
            <h6 className="pt-2" style={{fontSize: '16px', color: '#4d78ff'}}>{l.url}</h6>
          </a>
        </div>
        <div className="col-md-4 pt-2">
          <span className="pull-right" style={{fontSize: '16px'}}>
            {moment(l.createdAt).fromNow()} by {l.postedBy.name}</span>
          <br/>
          <span className="badge text-secondary pull-right">{l.clicks} clicks</span>

          <Link href={`/user/link/${l._id}`}>
            <span className="badge text-primary pull-right">Update</span>
          </Link>

          <span className="badge text-danger pull-right"
                onClick={(event) => confirmDelete(event, l._id)}>Delete</span>

        </div>
        <div className="col-md-12">
          <span className="badge text-dark" style={{fontSize: '14px'}}>{l.type} / {l.medium}</span>
          {l.categories.map((c, i) => (
            <span className="badge" key={i} style={{fontSize: '16px', color: '#ffb1d5'}}>{c.name}</span>
          ))}
        </div>
      </div>
    ))

  // the method to fetch more data when click "Load more"
  const loadMore = async () => {
    let toSkip = skip + limit;
    const response = await axios.post(`${API}/links`, {skip: toSkip, limit}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setAllLinks([...allLinks, ...response.data])
    setSize(response.data.length)
    setSkip(toSkip)
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1>All Links</h1>
        </div>
      </div>
      <br/>

      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={size > 0 && size >= limit}
        loader={<img key={0} src="/static/images/loading.gif" alt="loading"/>}
      >
        <div className="row">
          <div className="col-md-12">{listOfLinks()}</div>
        </div>
      </InfiniteScroll>
    </Layout>
  );
}


Links.getInitialProps = async ({req}) => {
  let skip = 0;
  let limit = 5;

  const token = getCookie('token', req);

  const response = await axios.post(
    `${API}/links`,
    {skip, limit},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return {
    links: response.data,
    totalLinks: response.data.length,
    linksLimit: limit,
    linkSkip: skip,
    token
  };
};

export default withAdmin(Links);