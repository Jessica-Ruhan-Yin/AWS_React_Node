import axios from "axios";
import {API} from "../config";
import {getCookie} from "../helpers/auth";
import React from "react";


/**
 * getInitialProps enables server-side rendering in a page and allows you to do initial data population,
 * it means sending the page with the data already populated from the server.
 */
const withAdmin = Page => {
  const WithAuthAdmin = props => <Page {...props}/>
  WithAuthAdmin.getInitialProps = async context => {
    const token = getCookie('token', context.req);
    let user = null;
    let userLinks = [];

    if (token) {
      try {
        const response = await axios.get(`${API}/admin`, {
          headers: {
            authorization: `Bearer ${token}`,
            contentType: 'application/json'
          }
        })
        user = response.data.user;
        userLinks = response.data.links;
      } catch (error) {
        if (error.response.status === 401) {
          user = null;
        }
      }
    }

    if (user === null) {
      // redirect in the server side
      context.res.writeHead(302, {
        Location: '/'
      });
      context.res.end();
    } else {
      // return the page
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
        user,
        token,
        userLinks
      };
    }
  };

  return WithAuthAdmin;
};

export default withAdmin;