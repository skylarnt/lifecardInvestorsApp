<template>
  <section class="notifications navbar-notifications">
    <header class="cardHeader card-header">
      <div class="text-center mb-sm">
        <strong>All  notifications</strong>
      </div>
      <b-button-group style="width:100%" id="notification-b-buttons">
        <b-button variant="default" @click="changeNotificationsTab(1)"
          >Quick Sales</b-button
        >
        <b-button variant="default" @click="changeNotificationsTab(2)"
          >Admin Messages</b-button
        >
      </b-button-group>
    </header>
    <NewNotifictionsList :notificationsData="notificationsData" @replied="$emit('replied')" v-if="newNotifications || notificationsTabSelected === 1" />
    <!-- <NotifictionsList v-else-if="notificationsTabSelected === 1" /> -->
    <Messages v-else-if="notificationsTabSelected === 2" />
    <NotifictionsList v-else />
    <footer class="cardFooter text-sm card-footer">
      <span class="fs-mini">Synced at: 21 Apr 2014 18:36</span>
      <b-button
        variant="link"
        @click="loadNotifications"
        :class="{
          disabled: isLoad,
          'btnNotificationsReload btn-xs float-right py-0': true,
        }"
      >
        <span v-if="isLoad"
          ><i class="la la-refresh la-spin" /> Loading...</span
        >
        <i v-else class="la la-refresh" />
      </b-button>
    </footer>
  </section>
</template>

<script>
import Vue from "vue";

import NotifictionsList from "./NotificationsDemo/NotificationsList";
import NewNotifictionsList from "./NotificationsDemo/NewNotificationsList";
import Messages from "./NotificationsDemo/Messages";

export default {
  name: "Notification",
  props:['notificationsData'],
  components: {
    NotifictionsList,
    NewNotifictionsList,
    Messages,
  },
  data() {
    return {
      notificationsTabSelected: 1,
      newNotifications: true,
      isLoad: false,
    };
  },
  methods: {
    changeNotificationsTab(tab) {
      Vue.set(this, "notificationsTabSelected", tab);
      Vue.set(this, "newNotifications", null);
    },
    loadNotifications() {
      Vue.set(this, "isLoad", true);

      setTimeout(() => {
        Vue.set(this, "newNotifications", "new notifications component");
        Vue.set(this, "isLoad", false);
        this.changeNotificationsTab(1);
      }, 1500);
    },
  },
};
</script>

<style src="./Notifications.scss" lang="scss" />
