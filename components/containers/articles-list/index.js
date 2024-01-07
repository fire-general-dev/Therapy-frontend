import GridSection from "@/components/elements/gridDisplaySection"
import ArticleCard from "./ArticleCard"

const ArticlesListContainer = ({
  articles,
  fetchArticlesList,
  isLoading,
  pagination,
}) => {
  return (
    <div>
      <GridSection
        items={articles}
        ItemComponent={ArticleCard}
        listView={false}
        onloadMore={fetchArticlesList}
        isLoading={isLoading}
        pagination={pagination}
        gridClassName="lg:!grid-cols-3"
      />
    </div>
  )
}

export default ArticlesListContainer
