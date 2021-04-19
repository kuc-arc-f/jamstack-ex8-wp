import React from 'react'
import Head from 'next/head';

import Layout from '../components/layout'
import TopHeadBox from '../components/TopHeadBox'
import PagingBox from '../components/PagingBox'
import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import LibCms from '../libs/LibCms'
import IndexRow from './IndexRow';
//
function Page(data) {
    var items = data.blogs
    var paginateDisp = data.display
// console.log( items )
    return (
    <Layout>
      <Head><title key="title">{data.site_name}</title></Head>      
      <TopHeadBox site_name={data.site_name} info_text={data.info_text} />
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
// console.log(item.id )
                var category_name = ""
                return (<IndexRow key={index}
                  id={item.ID} title={item.post_title}
                  date={item.post_date} category_name={category_name} />       
                )
              })}
              <hr />
              <PagingBox page="1" paginateDisp={paginateDisp} />
            </div>
          </div>          
        </div>
      </div>
    </Layout>
    )
  }
export const getStaticProps = async context => {
  var url = process.env.BASE_URL+`/api/posts.php?page=1`
  const res = await fetch( url );
  var blogs = await res.json();
// console.log(blogs)
  LibPagenate.init()
  var display = LibPagenate.is_paging_display(blogs.length)    
  return {
    props : {
      blogs: blogs,
      page_items: [],
      category_items: [],
      site_name : process.env.MY_SITE_NAME,
      info_text : "Sample CMSの関連記事を公開予定しております。",        
      display: display
    }
  };
}
export default Page
  