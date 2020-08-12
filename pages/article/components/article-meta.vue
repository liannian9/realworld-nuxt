<template>
  <div class="article-meta">
    <nuxt-link :to="{
        name:'profile',
        params:{
            username:article.author.username
        }
    }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">

      <nuxt-link class="author" :to="{
        name:'profile',
        params:{
            username:article.author.username
        }
    }">
     {{ article.author.username}}
    </nuxt-link>
      <span class="date">{{article.createAt | date('MMM DD, YYYY')}}</span>
    </div>
    <template v-if="isOwn">
      <span ng-show="$ctrl.canModify" class="ng-scope">

    <nuxt-link class="btn btn-outline-secondary btn-sm" :to="{
      name:'editor',
      params:{slug:article.slug}
    }">
      <i class="ion-edit"></i> Edit Article
    </nuxt-link>

    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle(article.slug)">
      <i class="ion-trash-a"></i> Delete Article
    </button>

  </span>
    </template>
    <template v-else>

      <button 
      class="btn btn-sm b
      tn-outline-secondary"
      :class="{active : article.author.following}"
      @click="followOrUnFollow(article.author)"
      :disabled="followDisabled"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{article.author.following ? 'unFollow' : 'Follow'}} {{ article.author.username}}
      </button>
      &nbsp;
      <button 
      class="btn btn-sm btn-outline-primary"
      :class="{active : article.favorited}"
      @click="onFavorite(article)"
      :disabled="favoriteDisabled"
      >
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post
        <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </template>
  </div>
</template>
<script>
import { followUser, unFollowUser } from "@/api/profile";
import {deleteFavorite, addFavorite } from "@/api/home";
import {deleteArticle } from "@/api/editor";

import {mapState} from "vuex";

export default {
  name: "ArticleMeta",
  props:{
      article:{
          type:Object,
          required:true
      }
  },
  data() {
    return {
      followDisabled:false,
      favoriteDisabled:false
    }
  },
  computed: {
    ...mapState(['auth']),
    isOwn() {
      return this.auth.username === this.article.author.username
    }
  },
  methods:{
    async followOrUnFollow(author) {
      this.followDisabled = true;
      if (author.following) {
        author.following = false;
        await unFollowUser(author.username)
      } else {
        await followUser(author.username)
        author.following = true;

      }
      this.followDisabled = false;
    },
    async onFavorite(article) {
      this.favoriteDisabled = true;
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug);
        article.favorited = true
        article.favoritesCount += 1
      }
      this.favoriteDisabled = false;

    },
    async deleteArticle(slug) {
      await deleteArticle(slug);
      this.$router.push('/')
    }
  
  }
};
</script>

<style>
</style>