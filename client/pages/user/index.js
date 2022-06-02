import Layout from "../../components/Layout";
import React from "react";
import axios from "axios";
import {API} from "../../config";
import {getCookie} from "../../helpers/auth";
import withUser from "../withUser";

const User = ({user}) => <Layout>
  {JSON.stringify(user)}
</Layout>;


export default withUser(User);