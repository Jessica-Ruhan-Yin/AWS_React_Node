import Layout from "../../components/Layout";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API} from "../../config";
import Link from "next/link"
import renderHTML from 'react-render-html'
import moment from "moment";
import InfiniteScroll from 'react-infinite-scroller';

const Links = ({query, category, links, totalLinks, linksLimit, linkSkip}) => {

  const [allLinks, setAllLinks] = useState(links)
  const [limit, setLimit] = useState(linksLimit)
  const [skip, setSkip] = useState(linkSkip)
  const [size, setSize] = useState(totalLinks)

  const listOfLinks = () =>
    allLinks.map((l, i) => (
      <div className="row alert alert-danger p-2" style={{backgroundColor: '#fff5f9'}}>
        <div key={l._id} className="col-md-8" onClick={e => handleClick(l._id)}>
          <a href={l.url} target="_blank">
            <h4 className="pt-2" style={{color:'#041861'}}>{l.title}</h4>
            <h6 className="pt-2" style={{fontSize: '16px', color:'#4d78ff'}}>{l.url}</h6>
          </a>
        </div>
        <div className="col-md-4 pt-2">
          <span className="pull-right" style={{fontSize: '16px'}}>
            {moment(l.createdAt).fromNow()} by {l.postedBy.name}</span>
          <br/>
          <span className="badge text-secondary pull-right">{l.clicks} clicks</span>
        </div>
        <div className="col-md-12">
          <span className="badge text-dark" style={{fontSize: '14px'}}>{l.type} / {l.medium}</span>
          {l.categories.map((c, i) => (
            <span className="badge" key={c._id} style={{fontSize: '16px', color:'#ffb1d5'}}>{c.name}</span>
          ))}
        </div>
      </div>
    ))

  // when click a link, clicks++
  const handleClick = async linkId => {
    const response = await axios.put(`${API}/click-count`, {linkId})
    await loadUpdatedLinks();
  }

  // reload the links (clicks changed)
  const loadUpdatedLinks = async () => {
    let slug = query.slug;
    const response = await axios.post(`${API}/category/${query.slug}`, {slug});
    setAllLinks(response.data.links)
  }


  // the method to fetch more data when click "Load more"
  const loadMore = async () => {
    let toSkip = skip + limit;
    let slug = query.slug;
    const response = await axios.post(`${API}/category/${query.slug}`, {skip: toSkip, limit, slug});
    setAllLinks([...allLinks, ...response.data.links])
    setSize(response.data.links.length)
    setSkip(toSkip)
  };

  // const loadMoreButton = () => {
  //   return (
  //     size > 0 && size >= limit && (
  //       <button className="btn btn-outline-primary btn-lg" onClick={loadMore}>Load more</button>
  //     )
  //   );
  // };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-8">
          <h1 className="display-4 font-weight-bold">{category.name} - URL/Links</h1>
          <div className="lead alert alert-secondary pt-4">{renderHTML(category.content || '')}</div>
        </div>

        <div className="col-md-4">
          <img src={category.image.url} alt={category.name} style={{width: 'auto', maxHeight: '200px'}}/>
        </div>
      </div>

      <br/>

      <div className="row">
        <div className="col-md-8">
          {listOfLinks()}
        </div>
        <div className="col-md-4">
          <h1 className="lead">Most popular in {category.name}</h1>
          <p>show popular links</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={size > 0 && size >= limit}
            loader={<img src="/static/images/loading.gif" alt="loading"/>}
          >
          </InfiniteScroll>
        </div>
      </div>
    </Layout>);
}


Links.getInitialProps = async ({query, req}) => {
  let skip = 0;
  let limit = 2;
  let slug = query.slug;
  const response = await axios.post(`${API}/category/${query.slug}`, {skip, limit, slug});
  return {
    query,
    category: response.data.category,
    links: response.data.links,
    totalLinks: response.data.links.length,
    linksLimit: limit,
    linkSkip: skip
  };
};

export default Links;