export const extractArrayData = (data) => {
  if (!data || data.length === 0) return []
  const result = data.map((item) => {
    return {
      id: item.id,
      ...item?.attributes,
    }
  })
  return result
}

export const extractSingleData = (data) => {
  if (!data) return null
  return {
    id: data.id,
    ...data?.attributes,
  }
}
