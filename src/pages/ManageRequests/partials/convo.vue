<template>
  <div>
    <form action="" @submit.prevent="reply">
      <VueElementLoading
        :active="loading"
        spinner="bar-fade-scale"
        color="var(--primary)"
        text="Loading.."
        duration="0.6"
      />

      <p>
        <span
          class="badge"
          v-if="data.is_special == 'yes'"
          :class="{
            'badge-info': data.is_special == 'yes',
          }"
        >
          Special request
        </span>
      </p>
      <!-- <v-card-title>
                <span class="text-h5">Create Property</span>
            </v-card-title> -->
      <p>
        <button type="button" @click="fetchData()" class="btn text-info">
          Refresh
        </button>
      </p>
      <v-card-text class="_body p-0">
        <div class="convo">
          <div v-if="request_conversation.length">
            <div
              class="bubbleWrapper"
              v-for="m in request_conversation"
              :key="m.id"
            >
              <div
                class="inlineContainer"
                :class="{
                  own: m.convo_1 != null,
                }"
              >
                <div
                  :class="{
                    own: m.convo_1 != null,
                    ownBubble: m.convo_1 != null,
                    other: m.convo_2 != null,
                    otherBubble: m.convo_2 != null,
                  }"
                >
                  {{ m.convo_1 != null ? m.convo_1 : m.convo_2 }}
                </div>
              </div>
              <span
                :class="{
                  own: m.convo_1 != null,
                  other: m.convo_2 != null,
                }"
                >{{ m.created_at | moment("from", true) }} ago</span
              >
            </div>
          </div>
          <div class="card" v-else>
            <div class="card-body">
              <p class="text-dark">No conversation .</p>
            </div>
          </div>
        </div>
        <v-container class="px-0">
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="form.message"
                placeholder="Type Reply here."
                required
              ></v-text-field>
              <small class="text-danger" v-if="error_messg.name">{{
                error_messg.name[0]
              }}</small>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeMe()"> Close </v-btn>
        <button class="btn btn-primary" type="submit" :disabled="!form.message">
          {{ loadingChat == true ? "Sending text" : "Send" }}
          <b-spinner v-if="loadingChat" small />
        </button>
      </v-card-actions>
    </form>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import { mapState, mapActions } from "vuex";

export default {
  props: ["my_modal", "data"],
  components: {
    VueElementLoading,
  },
  data() {
    return {
      nameRules: [(v) => !!v || "This is a required"],
      form: {},
      loading: false,
      error_messg: {},
      request_conversation: [],
      loadingChat: false,
    };
  },
  computed: {
    ...mapState("auth", ["auth_data"]),
  },
  mounted() {
    this.scrollDiv();

    this.fetchData();
    window.$this = this;

    this.getAuthData();
    window.pusher_app.bind(`message-${this.auth_data.id}`, function (data) {
      let not_duplicate = this.request_conversation.some(
        (el) => el.id != data.message.id
      );
      if (not_duplicate) {
        this.request_conversation.push(data.message);
        this.scrollDiv();
        this.$emit("message_in");
      }
    });
  },

  methods: {
    ...mapActions("auth", ["getAuthData"]),

    closeMe() {
      this.$bvModal.hide("conversation");
    },
    scrollDiv() {
      var elem = document.querySelector(".convo");
      setTimeout(() => {
        elem.scrollTop = Number(elem.scrollHeight);
      }, 1000);
    },
    reply() {
      this.loadingChat = true;
      this.$api
        .post(this.dynamic_route("/requests/reply_message"), {
          message: this.form.message,
          request_id: this.data.id,
        })
        .then((res) => {
          this.loadingChat = false;
          this.form = {};
          if (res.status == 200) {
            this.request_conversation.push(res.data.data);
            var elem = document.querySelector(".convo");
            setTimeout(() => {
              elem.scrollTop = Number(elem.scrollHeight);
            }, 1000);
          } else {
            if (
              res.status == 422 &&
              res.data.message == "The given data was invalid."
            )
              this.error_messg = res.data.errors;
          }
          this.toast(res);
        });
    },
    fetchData() {
      this.$api
        .post(this.dynamic_route("/requests/get_user_conversations"), {
          message: this.form.message,
          request_id: this.data.id,
        })
        .then((res) => {
          this.loading = false;
          this.form = {};
          if (res.status == 200) {
            this.request_conversation = res.data.data;
            this.scrollDiv();
          } else {
            if (
              res.status == 422 &&
              res.data.message == "The given data was invalid."
            )
              this.error_messg = res.data.errors;
            this.toast(res);
          }
        });
    },
  },
};
</script>
<style>
.convo {
  /* background: #002b49 !important; */
  /* color: white !important; */
  height: calc(100vh / 2) !important;
  padding: 0px 11px !important;
  border-radius: 10px !important;
  overflow-y: scroll;
}
* {
  font-family: "Avenir";
}
.bubbleWrapper {
  padding: 10px 10px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-self: flex-end;
  color: #fff;
}
.inlineContainer {
  display: inline-flex;
}
.inlineContainer.own {
  flex-direction: row-reverse;
}
.inlineIcon {
  width: 20px;
  object-fit: contain;
}
.ownBubble {
  min-width: 60px;
  max-width: 700px;
  padding: 14px 18px;
  margin: 6px 8px;
  background-color: #5b5377;
  border-radius: 16px 16px 0 16px;
  border: 1px solid #443f56;
}
.otherBubble {
  min-width: 60px;
  max-width: 700px;
  padding: 14px 18px;
  margin: 6px 8px;
  background-color: #6c8ea4;
  border-radius: 16px 16px 16px 0;
  border: 1px solid #54788e;
}
.own {
  align-self: flex-end;
}
.other {
  align-self: flex-start;
}
span.own,
span.other {
  font-size: 14px;
  color: grey;
}
</style>