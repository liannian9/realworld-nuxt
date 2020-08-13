<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit test</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="auth">
                <nuxt-link class="nav-link" exact :to="{name:'home', query:{tab:'your_feed'}}" :class="{active:tab === 'your_feed'}">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" exact :to="{name:'home', query:{tab:'global_feed'}}" :class="{active:tab === 'global_feed'}">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link class="nav-link" exact :to="{name:'home', query:{tab:'tag', tag}}" :class="{active:tab === 'global_feed'}"># {{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params:{
                      username:article.author.username
                  }
              }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                  name: 'profile',
                  params:{
                      username:article.author.username
                  }
              }"
                >{{article.author.username}}</nuxt-link>
                <span class="date">{{article.createdAt | date('MM DD, YYYY')}}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active:article.favorited}"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i>
                {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{name:'article', params:{slug:article.slug}}" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!--  页码-->
          <nav>
            <ul class="pagination">
              <li 
                class="page-item" 
                v-for="item in totalPage" 
                :key="item"
                :class="{active:item == page}"
                >
                <nuxt-link class="page-link ng-binding" :to="{name:'home', query:{page:item, tab:$route.query.tab, tag:$route.query.tag}}">{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link :to="{name:'home', query:{tab:'tag', tag}}" class="tag-pill tag-default" v-for="(tag, index) in tags" :key="index">{{tag}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticles, getTags, getYourFeedArticles, deleteFavorite, addFavorite } from "@/api/home";
import {mapState} from "vuex";

export default {
  name: "homeIndex",
  async asyncData({ query }) {
    const limit = Number.parseInt(query.limit || 20);
    const page = Number.parseInt(query.page || 1);
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    let loadArticles = tab === 'your_feed' ? getYourFeedArticles : getArticles;
    const [articleRes, tagRes] = await Promise.all([
        loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
        }),
        getTags()
    ])
    const {articles, articlesCount} = articleRes.data;
    const {tags} = tagRes.data;
    articles.forEach((item) => {
      item.favoriteDisabled = false
    })
    return {
      articles, //文章列表
      articlesCount, //文章总数
      limit, //每页条数
      page, //页码
      tags, // 标签列表
      tab, //选项卡
      tag //当前标签
    };
  },
  watchQuery:['page', 'limit', 'tag', 'tab'],
  computed: {
    ...mapState(['auth']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods:{
    async onFavorite(article) {
      console.log(article)
      article.favoriteDisabled = true;
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug);
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false;

    }
  }
};
</script>

<style>
</style>