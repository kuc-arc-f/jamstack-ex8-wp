import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import marked from  'marked'

import Layout from '../../components/layout'
import LibCommon from '../../libs/LibCommon'
import LibCms from '../../libs/LibCms'
//
export default function Page({ blog }) {
console.log(blog)
  return (
    <Layout>
    <Head><title key="title">{blog.post_title}</title></Head>      
    <div className="container">
      <Link href="/" >
        <a className="btn btn-outline-primary mt-2">Back</a>
      </Link>
      <hr className="mt-2 mb-2" />
      <div className="show_head_wrap">
          <i className="fas fa-home"></i> >
          {blog.post_title}
      </div>
      <hr /> 
      <h1>{blog.post_title}</h1>
      Date: {blog.post_date}<br />
      <hr />
      <div id="post_item" dangerouslySetInnerHTML={{__html: `${blog.post_content}`}}></div>
      <hr />                 
    </div>
    <style>{`
      div#post_item > p > img{
        max-width : 100%;
        height : auto;
      }
      div#post_item > hr {
        height: 1px;
        background-color: #000;
        border: none;
      }
      .show_head_wrap{ font-size: 1.4rem; }
      `}</style>      
  </Layout>
  )
}
//
export const getStaticPaths = async () => {
  const res = await fetch(
    process.env.BASE_URL + `/api/pages.php`
  );  
  const json = await res.json();
  var page_items = json
  var paths = []
  page_items.map((item, index) => {
    var row = { params: 
      { id: String(item.ID) } 
    }
    paths.push(row)
  })
//console.log(page_items)
  return {
    paths: paths,
    fallback: false
  } 
};
export const getStaticProps = async context => {
  const id = context.params.id
//console.log(id)
  var url = process.env.BASE_URL + `/api/pageone.php?id=${id}`
  const res = await fetch( url );
  const json = await res.json();  
//console.log(url )  
  var item = json[0]  
  return {
    props: { 
      blog: item,
    },
  }
  
};
