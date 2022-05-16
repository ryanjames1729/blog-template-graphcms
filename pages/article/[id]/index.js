import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from '../../../styles/Home.module.css'


import { GraphQLClient } from 'graphql-request'

const article = ({ article }) => {
  

    return (
        <>
          <div className={styles.container}>
            <div className={styles.name}>
              <h1 className={styles.title}>
                {article[0].title}
              </h1>
              <Image 
                  src={article[0].coverPhoto.url} 
                  alt={article[0].title} 
                  width={300} 
                  height={300}
                  layout="responsive" 
                />
            </div>
          </div>
        <div className={styles.container}>
            <div dangerouslySetInnerHTML={{__html: article[0].body.html}}></div>
            <p>Written by {article[0].author} on {article[0].date}.</p>
            <p>Tagged: {article[0].tags}</p>
            <div className={styles.card}><Link href="/">&rarr; Go Back</Link></div>
        </div>
        </>
    )
}   


export const getStaticProps = async (context) => {
  const targetSlug = context.params.id

  const graphcms = new GraphQLClient(
    'https://api-us-east-1.graphcms.com/v2/cl2syczv13a4b01yxg6fy8odn/master'
  );

  const { blogPosts } = await graphcms.request(
    `
      { 
        blogPosts {
          author
          title
          date
          body {
            text
            html
          }
          slug
          tags
          coverPhoto {
            url
          }
        }
      }
    `
  );

  const article = blogPosts.filter(post => post.slug === targetSlug)
  
  console.log('artilcle before return: ' + article[0].title)

  return {
    props: {
      article,
    },
    revalidate: 10, // revalidate every 10 seconds
  };
}


export const getStaticPaths = async () => {
  const graphcms = new GraphQLClient(
    'https://api-us-east-1.graphcms.com/v2/cl2syczv13a4b01yxg6fy8odn/master'
  );

  const { blogPosts } = await graphcms.request(
    `
      { 
        blogPosts {
          id
          slug
        }
      }
    `
  );

  const paths = blogPosts.map(post => ({ params: { id: post.slug } }));
  return {
    paths,
    fallback: false,
  }

}

  export default article