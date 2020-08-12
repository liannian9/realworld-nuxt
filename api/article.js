import { request } from "@/plugins/request";

//获取文章详情
export const getArticle = (slug) => {
    return  request({
        method:'GET',
        url:`/api/articles/${slug}`,
    })
}

//获取文章评论
export const getComments = (slug) => {
    return  request({
        method:'GET',
        url:`/api/articles/${slug}/comments`,
    })
}
//新增文章评论
export const addComments = (slug, data) => {
    return  request({
        method:'POST',
        url:`/api/articles/${slug}/comments`,
        data
    })
}

//删除文章评论
export const deleteComments = (slug, id) => {
    return  request({
        method:'DELETE',
        url:`/api/articles/${slug}/comments/${id}`,
    })
}