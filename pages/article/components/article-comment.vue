<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="comment.body"></textarea>
      </div>
      <div class="card-footer">
        <img :src="author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
            name:'profile',
            params:{
                username:comment.author.username
            }
        }" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <a href class="comment-author">{{comment.author.username}}</a>
        <span class="date-posted">{{comment.createAt | date('MMM DD, YYYY')}}</span>
        <span class="mod-options">
          <i class="ion-trash-a" @click="deleteComment(comment)"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import {getComments, addComments, deleteComments} from "@/api/article";
import { getProfile} from "@/api/profile";

export default {
  name: "ArticleComment",
  async mounted() {
    const[profileData, commnetsData] = await Promise.all([
      getProfile(this.article.author.username),
      getComments(this.article.slug),
    ])
    console.log(profileData, commnetsData);
    this.comments = commnetsData.data.comments;
    this.author = profileData.data.profile;
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { 
      comments: [],
      author:{},
      comment:{
          body:'',
      }, 
    };
  },
  methods:{
    async onSubmit() {
        try {
            const {data} = await addComments(this.article.slug,{comment:this.comment})
            const {comment} = data;
            this.comments.unshift(comment)
        } catch (error) {

        }
    },
    async deleteComment (comment) {
      await deleteComments(this.article.slug, comment.id);
      this.comments = this.comments.filter(item => {
        return item.id !== comment.id
      })
    }
  }
};
</script>

<style>
</style>