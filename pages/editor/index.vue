<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input type="text" v-model="article.title" class="form-control form-control-lg" placeholder="Article Title" />
              </fieldset>
              <fieldset class="form-group">
                <input type="text" v-model="article.description" class="form-control" placeholder="What's this article about?" />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" />
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createArticle, updateArticle } from "@/api/editor";
import { getArticle } from "@/api/article";

export default {
  name: "editorIndex",
    //路由匹配组件渲染前会先执行中间件处理
  middleware:'authenticated',
  async mounted() {
    const {data} = await getArticle(this.$route.params.slug)
    const {article} = data
    this.article = article

  },
  data() {
    return {
      article:{
        body: "",
        description: "",
        tagList: [],
        title: "",
      },
    };
  },
  methods:{
    async onSubmit () {
      let articlefn = createArticle;
      if (this.$route.params.slug) {
        articlefn = updateArticle;
        this.article.updatedAt = new Date().toISOString();
      }
      const {data} = await articlefn({article:this.article}, this.$route.params.slug);
      this.$router.push({
        name:'article',
        params:{slug:data.article.slug}
      })

    } 
  }
};
</script>

<style>
</style>