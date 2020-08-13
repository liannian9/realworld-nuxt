<template>
    <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <nuxt-link to='/setting' class="btn btn-sm btn-outline-secondary action-btn" v-if="isOwn">
            <i class="ion-gear-a"></i> Edit Profile Settings
          </nuxt-link>
          <button :class="{active : profile.following}" @click="followOrUnFollow(profile)" class="btn btn-sm btn-outline-secondary action-btn" v-else >
            <i class="ion-plus-round"></i>
            &nbsp;
            {{profile.following ? 'unFollow' : 'Follow'}} {{profile.username}} 
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <button 
                class="nav-link " 
                :class="{active:tab === 'author'}"
                @click="changeTab('author')">My Articles</button>
            </li>
            <li class="nav-item">
              <button 
              class="nav-link"
              :class="{active:tab === 'favorited'}"
               @click="changeTab('favorited')">Favorited Articles</button>
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
              <span>Read more ...</span>
            </nuxt-link>
          </div>


      </div>

    </div>
  </div>

</div>
</template>
<script>
import {mapState} from "vuex";
import { getProfile,  } from "@/api/profile";
import { getArticles,  } from "@/api/home";
import { followUser, unFollowUser } from "@/api/profile";


export default {
    name:'profileIndex',
      //路由匹配组件渲染前会先执行中间件处理
    middleware:'authenticated',
    async mounted() {
        const {data} = await getProfile(this.$route.params.username)
        const {data:articleData} = await getArticles({
          [this.tab]:this.$route.params.username
        })
        
        console.log(articleData, 'articleData about')
        this.profile = data.profile
        this.articles = articleData.articles
    },
    computed: {
      ...mapState(['auth']),
      isOwn() {
        return this.auth.username === this.$route.params.username
      }
    },
    data(){
        return {
            profile:{},
            tab:'author',
            articles:[],
            followDisabled:false
        }
    },
    methods:{
      async changeTab(tab) {
        this.tab = tab
        const {data:articleData} = await getArticles({
          [tab]:this.$route.params.username
        })
        this.articles = articleData.articles
      },
      async followOrUnFollow(author) {
        this.followDisabled = true;
        if (author.following) {
          author.following = false;
          console.log(this.profile)
          await unFollowUser(author.username)
        } else {
          await followUser(author.username)
          author.following = true;

        }
        this.followDisabled = false;
      },
    }
}
</script>

<style>

</style>