import Layout from "../../component/Layout";
import React from "react";
import withAdmin from "../withAdmin";


const Admin = ({user}) => <Layout>
  {JSON.stringify(user)}
</Layout>;

export default withAdmin(Admin);