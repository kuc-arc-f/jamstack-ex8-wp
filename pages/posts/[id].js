import React from 'react'
import Link from 'next/link';
import Head from 'next/head';
import marked from  'marked'

import Layout from '../../components/layout'
import LibCommon from '../../libs/LibCommon'
import LibCms from '../../libs/LibCms'
//
export default function Page({ blog, category_name }) {
//console.log(blog)
  var content = marked(blog.post_content)
//  var content = ""
  return (
    <Layout>
    <Head><title key="title">{blog.title}</title></Head>      
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
      <div id="post_item" dangerouslySetInnerHTML={{__html: `${content}`}}></div>
      <hr />                 
    </div>
    <style>{`
      div#post_item img{
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
    process.env.BASE_URL + `/api/posts.php`
  );
  const repos = await res.json();
  var paths = []
  repos.map((item, index) => {
    var row = { params: 
      { id: String(item.ID) } 
    }
    paths.push(row)
  })
// console.log(paths)
  return {
    paths: paths,
    fallback: false
  } 
};
export const getStaticProps = async context => {
  const postId = context.params.id
  var url = process.env.BASE_URL + `/api/postone.php?id=${postId}`
// console.log(url)
  const res = await fetch( url);
  var blog = await res.json(); 
  var item = blog[0]
// console.log(blog)
  return {
    props: { 
      blog: item,
      category_name: ""
    },
  }
  
};


