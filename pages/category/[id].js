import React from 'react'
//import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import Layout from '../../components/layout'
import IndexRow from './IndexRow';
import LibCommon from '../../libs/LibCommon'
import LibCms from '../../libs/LibCms'
//
function Page(data) {
  var items = data.blogs
  var category_name = data.category_name
// console.log(items)  
  return (
    <Layout>
      <Head><title key="title">{category_name} | {data.site_name}</title>
      </Head> 
      <div className="body_main_wrap">
        <div className="container">
          <Link href="/" >
            <a className="btn btn-outline-primary mt-2">Back</a>
          </Link>          
          <div className="body_wrap">
            <div id="post_items_box" className="row conte mt-2 mb-4">
              <div className="col-sm-12">
                <div id="div_news">
                  <h2 className="h4_td_title mt-2 mb-2">Category : {category_name}
                  </h2>
                </div>
                <hr />
              </div>
              {items.map((item, index) => {
// console.log(item )
                return (<IndexRow key={index}
                  id={item.ID} title={item.post_title}
                  date={item.post_date} />       
                )
              })}
            </div>
            <br /><br />
          </div>          
        </div>
      </div>
    </Layout>
    )  
}
//
export const getStaticProps = async context => {
  const id = context.params.id;
//console.log("id=", id)
  var url = process.env.BASE_URL+`/api/post_category.php?cat_id=${id}`
  const req = await fetch( url );
  const json = await req.json();  
  var category_name = ""
  url = process.env.BASE_URL+`/api/category.php`
  const reqCat = await fetch( url );
  const jsonCat = await reqCat.json();  
  var category = LibCms.get_category_item(jsonCat, id)
  category_name = category.name
//console.log(category)
  var items = json
  return {
    props : {
      blogs: items, display: 0, 
      site_name : process.env.MY_SITE_NAME,
      category_name: category_name,
    }
  };
}
//
export const getStaticPaths = async () => {
  var url = process.env.BASE_URL+`/api/category.php`
  const req = await fetch( url );
  const json = await req.json();  
  var paths = []
  json.map((item, index) => {
    var row = { params: 
      { id: String(item.ID) } 
    }
    paths.push(row)
  })
//console.log(paths)
  return {
    paths: paths,
    fallback: false
  } 
};

export default Page
