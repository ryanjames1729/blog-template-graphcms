import Link from 'next/link'
import articleStyles from '../styles/Article.module.css';

const ArticleItem = ({article}) => {
    return (
        <div>
            <Link href="/article/[slug]" as={`/article/${article.slug}`}>
                <div className={articleStyles.card}>
                    <h3>{article.title} &rarr;</h3>
                    <p>{article.desc.text}</p>
                </div>
            </Link>
        </div>
    )
}

export default ArticleItem