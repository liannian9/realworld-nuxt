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