import Layout from "../../components/Layout";
import React from "react";
import axios from "axios";
import {API} from "../../config";
import {getCookie} from "../../helpers/auth";
import withUser from "../withUser";
import Link from 'next/link'
import moment from "moment";
import Router from 'next/router'

const User = ({user, userLinks, token}) => {

  const confirmDelete = (e, id) => {
    e.preventDefault();
    // console.log('delete > ', slug);
    let answer = window.confirm('Are you sure you want to delete?');
    if (answer) {
      handleDelete(id);
    }
  };

  const handleDelete = async id => {
    console.log('delete link > ', id);
    try {
      const response = await axios.delete(`${API}/link/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('LINK DELETE SUCCESS ', response);
      await Router.replace('/user');
    } catch (error) {
      console.log('LINK DELETE ', error);
    }
  };


  const listOfLinks = () => userLinks.map((l, i) => (
    <div className="row alert alert-danger p-2" style={{backgroundColor: '#fff5f9'}}>
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
          <span className="badge" key={c._id} style={{fontSize: '16px', color: '#ffb1d5'}}>{c.name}</span>
        ))}
      </div>

    </div>
  ))

  return (
    <Layout>
      <h1>{user.name}'s dashboard<span style={{color: '#58b7ff'}}> / {user.role}</span></h1>
      <hr/>
      <div className="row">
        <div className="col-md-4">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link href="/user/link/create">
                <a className="nav link">Submit a link</a>
              </Link>
            </li>

            <br/>

            <li className="nav-item">
              <Link href="/user/profile/update">
                <a className="nav link">Update profile</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-8">
          <h2>Your links</h2>
          <br/>
          {listOfLinks()}
        </div>
      </div>
    </Layout>
  )
}

export default withUser(User);