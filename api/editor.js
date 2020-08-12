import { request } from "@/plugins/request";

//创建文章
export const createArticle = (data) => {
    return  request({
        method:'POST',
        url:`/api/articles`,
        data
    })
}

//更新文章

export const updateArticle = (data, slug) => {
    return  request({
        method:'PUT',
        url:`/api/articles/${slug}`,
        data
    })
}

//删除文章

export const deleteArticle = (slug) => {
    return  request({
        method:'DELETE',
        url:`/api/articles/${slug}`,
    })
}