<template>
  <b-list-group class="listGroup thin-scroll">
    <!-- <b-list-group-item class="listGroupItem bg-attention">
      <span class="notificationIcon thumb-sm">
        <i class="fa fa-check text-success fa-lg" />
      </span>
      <p class="m-0 overflow-hidden">
        2 issues require your approval.
        &nbsp;<a href="#">The Search Project</a> completed on time!
        <time class="help-block m-0">
          just now
        </time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem bg-attention">
      <span class="notificationIcon thumb-sm">
        <img class="rounded-circle" src="../../../assets/people/a4.jpg" alt="..." />
      </span>
      <p class="m-0 overflow-hidden">
        <a href="#">Jeniffer Willington</a>has just endorsed you with 50 points!
        <time class="help-block m-0">
          30 sec ago
        </time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <img class="rounded-circle" src="../../../assets/people/a3.jpg" alt="..." />
      </span>
      <p class="m-0 overflow-hidden">
        1 new user just signed up! Check out
        &nbsp;<a href="#">Monica Smith</a>'s account.
        <time class="help-block m-0">
          2 mins ago
        </time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <i class="fa fa-angle-double-up fa-2x" />
      </span>
      <p class="text-ellipsis m-0">
        2.1.0-pre-alpha just released.
        <time class="help-block m-0">
          5h ago
        </time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <i class="fa fa-bolt fa-lg" />
      </span>
      <p class="text-ellipsis m-0 overflow-hidden">
        Server load limited.
        <time class="help-block m-0">
          7h ago
        </time>
      </p>
    </b-list-group-item> -->
    <b-list-group-item class="listGroupItem shadow-sm mb-2" v-for="(n,i) in notificationsData" :key="i">
      <span class="notificationIcon thumb-sm">
        <!-- <img class="rounded-circle" src="../../../assets/people/a5.jpg" alt="..." /> -->
      </span>
      <p class="mb-2 overflow-hidden">
        User <span class="text-primary" style="cursor:pointer" @click="$router.push({name:'MarketPlace'})">{{n.fname}}</span> Is selling <span>{{n.gender == 'male' ? 'his' : 'her'}}</span> portion
        <!-- &nbsp;&nbsp; -->
        <div class="pt-1 d-flex justify-content-between">
          <b-button size="xs" variant="success" @click="reply_to_notification('interested',n.id, n.mpg_id)" class="">Interested</b-button>
          <b-button size="xs" variant="danger" @click="reply_to_notification('notInterested',n.id, n.mpg_id)">Not Interested</b-button>

        </div>
        <!-- <div class="text-center">
          <a href.prevent="/app/market-place/index"> click to view more</a>
          
        </div> -->
        <!-- <time class="help-block m-0">
          12:18 AM
        </time> -->
      </p>
    </b-list-group-item>
    <div class="p-1 text-center" v-if="!notificationsData.length">
      No Quick Sale Notification Found
    </div>
    <!-- <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <i class="fa fa-shield fa-lg" />
      </span>
      <p class="m-0 overflow-hidden">
        Instructions for changing your Envato Account password. Please
        check your account <a href="#">security page</a>.
        <time class="help-block m-0">
          12:18 AM
        </time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <span class="rounded bg-primary rounded-lg">
          <i class="fa fa-facebook text-white" />
        </span>
      </span>
      <p class="text-ellipsis m-0">
        New <strong>76</strong> facebook likes received.
        <time class="help-block m-0">
          15 Apr 2014
        </time>
      </p>
    </b-list-group-item>
    <b-list-group-item class="listGroupItem">
      <span class="notificationIcon thumb-sm">
        <span class="circle circle-lg bg-gray-dark">
          <i class="fa fa-circle-o text-white" />
        </span>
      </span>
      <p class="text-ellipsis m-0">
        Dark matter detected.
        <time class="help-block m-0">
          15 Apr 2014
        </time>
      </p>
    </b-list-group-item> -->
  </b-list-group>
</template>

<script>
import axios from "axios"
import { mapState, mapActions } from 'vuex';

export default {
  name: 'NewNotificationsList',
   computed: {
    ...mapState('page', ['authData', 'authToken'])
  },
  props:['notificationsData'],
  data(){
    return {
    }
  },
  mounted(){
    this.getAuthData()
  },
  methods:{
    ...mapActions('page', ['getAuthData']),
    reply_to_notification(msg,id,mpg){
      let payload = {
        msg,
        id,
        mpg,
        userId: this.authData.id
      }

      axios.post(this.dynamic_route('/client/my-investments/reply-sale-notification'),payload,{
        headers:{
          authorization: `Bearer ${this.authToken}`
        }
      })
      .then(res => {
        this.$emit('replied');
      }).catch(err => {
        if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
          return this.logoutUser();
        }
        this.$toast.error('Something went wrong, please try again later!', {
          position: 'top-center',
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: true,
          rtl: false,
        })
      })
    }
  }
};
</script>

<style src="./ListGroup.scss" lang="scss" />
