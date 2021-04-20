import React from 'react'
//import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import Layout from '../../components/layout'
import TopHeadBox from '../../components/TopHeadBox'
import PagingBox from '../../components/PagingBox'
import IndexRow from '../IndexRow';
import LibPagenate from '../../libs/LibPagenate'
import LibCommon from '../../libs/LibCommon'
//
function Page(data) {
  var items = data.blogs
  var paginateDisp = data.display
  var page = data.page
// console.log(items)  
  return (
    <Layout>
      <Head><title key="title">{data.site_name}</title></Head> 
      <TopHeadBox site_name={data.site_name} />
      <div className="body_main_wrap">
        <div className="container">
          <div className="body_wrap">
            <div id="post_items_box" className="row conte mt-2 mb-4">
              <div className="col-sm-12">
                <div id="div_news">
                  <h2 className="h4_td_title mt-2 mb-2" >Post</h2>
                </div>
              </div>
              {items.map((item, index) => {
//                console.log(item.id ,item.createdAt )
                return (<IndexRow key={index}
                  id={item.ID} title={item.post_title}
                  date={item.post_date} category_name={item.category_name} />       
                )
              })}
              <hr /> 
              <PagingBox page={page} paginateDisp={paginateDisp} />            
            </div>
          </div>          
        </div>
      </div>
    </Layout>
    )  
}
//
export const getStaticProps = async context => {
  const page = context.params.id;
  var url = process.env.BASE_URL+`/api/posts.php?page=${page}`
  const req = await fetch( url );
  const json = await req.json(); 
  url = process.env.BASE_URL+`/api/count.php`
  const reqCount = await fetch( url );
  const jsonCount = await reqCount.json(); 
//console.log(jsonCount) 
  var item_len = jsonCount.count 
//console.log(item_len) 
  LibPagenate.init()
  var display = LibPagenate.is_next_display(page, parseInt(item_len) )
  return {
    props : {
      blogs: json, display: display, 
      page: page,
      site_name : process.env.MY_SITE_NAME,
    }
  };
}
export async function getStaticPaths() {
  var paths = []
  var url = process.env.BASE_URL+`/api/count.php`
  const req = await fetch( url );
  const json = await req.json(); 
  var count = json.count 
//console.log("count=", count)
  LibPagenate.init()
  var pageMax =LibPagenate.get_max_page(count)
  pageMax = Math.ceil(pageMax)
//console.log( "pageMax=", pageMax )
  for(var i= 1 ; i<= pageMax; i++ ){
    var item = {
      params : {
        id: String(i)
      } 
    }
    paths.push(item)
  }
// console.log( paths )
  return {
    paths: paths,
    fallback: false,
  }
}

export default Page
