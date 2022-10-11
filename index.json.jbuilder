puts "inside jbuilder file"
json.article do
  json.extract! @articles,
    :id,
    :title,
    :author,
    :status,
    :updated_at,
  json.category_id do
    json.extract! @articles.category_id,
      :id,
      :name
  end
end
