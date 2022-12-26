<template>
  <div class="a">
    <form action="" @submit.prevent="save">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          
            <!-- <v-card-title>
                <span class="text-h5">Create Property</span>
            </v-card-title> -->
            <v-card-text class="_body">
                
                <h5>Actual amount <span class="text-info">₦{{ Number(data.amount).toLocaleString() }}</span></h5>
                <h5>Total amount paid <span class="text-info">₦{{ Number(amount_paid).toLocaleString() }}</span></h5>
                <div class="alt-vtl mt-3" v-if="transactions.length">
                    <div class="alt-event" 
                        v-for="(tr, i) in transactions" 
                        :key="tr.id"
                        :class="{
                            'right' : (i+1) % 2 < 1
                        }"
                    >
                        <p class="date mb-0">{{tr.created_at | moment("from", true) }} ago</p>
                        <h3 class="mb-0">₦{{Number(tr.amount).toLocaleString()}}</h3>
                        <p class="mb-0 txt"> Was recorded as your payment.</p>
                    </div>
                    
                </div>
                <div v-else class="px-2 text-center mt-5">
                    <p>No payment history found</p>
                </div>
            </v-card-text>
            <v-card-actions  >
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="closeMe()"
                >
                    Close
                </v-btn>
                
            </v-card-actions>

        </form>
  </div>
</template>

<script>
import VueElementLoading from 'vue-element-loading'

export default {
    props:['my_modal', 'data'],
    components:{
        VueElementLoading,
    },
    data() {
        return {
            nameRules: [
                v => !!v || 'This is a required',
            ],
            form:{},
            loading:false,
            error_messg:{},
            transactions:[],
            amount_paid:0,
        }
    },
    mounted() {
        this.fetch()
    },
    methods:{
        closeMe() {
            this.$bvModal.hide('breakdown')
        },
        fetch() {
            this.loading=true;
            this.$api.post(this.dynamic_route('/requests/get_request_transactions'), {
                approved_request_id: this.data.id
            }).then((res) => {
                this.loading=false;

                if(res.status == 200) {
                    this.transactions= res.data.data
                    this.amount_paid=this.transactions.map(el => Number(el.amount)).reduce((ac,v) => ac + v,0)
                } else {
                    if(res.status==422 && res.data.message =="The given data was invalid.") this.error_messg=res.data.errors
                    this.toast(res)
                }

            });
        },
    }
}
</script>

<style>
/* (A) TIMELINE CONTAINER */
.alt-vtl {
  /* (A1) RELATIVE POSITION REQUIRED TO PROPERLY POSITION THE TIMELINE */
  position: relative;
 
  /* (A2) WIDTH RESTRICTION & CENTER ON PAGE */
  max-width: 600px;
  margin: 0 auto;
  height: calc(100vh / 2);
  overflow-y: auto;
}

/* (B) DRAW TIMELINE USING ::BEFORE */
.alt-vtl::before {
  /* (B1) VERTICAL LINE */
  content: "";
  width: 5px;
  background-color: #1da1ff;
 
  /* (B2) POSITION IN THE MIDDLE */
  position: absolute;
  top: 0; bottom: 0; left: 50%;
}

/* (C) EVENTS */
div.alt-event {
  /* (C1) COSMETICS */
  background-color: #dbf0ff;
  border-radius: 6px;
 
  /* (C2) DIMENSIONS */
  padding: 20px 30px;
  width: 45%;
  margin-bottom: 10px;
 
  /* (C3) POSITION - DEFAULT LEFT SIDE */
  position: relative;
  left: 0;
}
 
/* (C4) CHANGE EVENT POSITION TO RIGHT SIDE */
div.right { left: 55%; }

/* (D) COSMETICS FOR EVENT DATE & TEXT */
p.date {
  font-size: 1.1em;
  font-weight: 700;
  color: #ff6a00;
}
p.txt {
  margin: 10px 0 0 0;
  color: #222;
}

/* (E) EVENT "SPEECH BUBBLE CALLOUT" */
/* (E1) SHARED */
div.alt-event::before, div.alt-event.right::before {
  content: "";
  border: 10px solid transparent;
  position: absolute;
}
 
/* (E2) FOR EVENTS ON THE LEFT */
div.alt-event::before {
  /* (E2-1) "MAGIC TRIANGLE" */
  border-left-color: #dbf0ff;
  border-right: 0;
 
  /* (E2-2) POSITION TRIANGLE ON THE RIGHT */
  left: 100%; top: 20%;
}
 
/* (E3) FOR EVENTS ON THE RIGHT */
div.alt-event.right::before {
  /* (E3-1) "MAGIC TRIANGLE" */
  border-right-color: #dbf0ff;
  border-left: 0;
 
  /* (E3-2) POSITION TRIANGLE ON THE LEFT */
  left: auto; right: 100%; top: 20%;
}
 
/* (F) EVENT CIRCLE ON TIMELINE */
/* (F1) SHARED */
div.alt-event::after, div.alt-event.right::after {
  /* (F1-1) "MAGIC CIRCLE" */
  content: "";
  background: #fff;
  border: 4px solid #1da1ff;
  width: 16px; height: 16px;
  border-radius: 50%;
 
  /* (F1-2) POSITION */
  position: absolute;
}
 
/* (F2) POSITION TO THE LEFT */
div.alt-event::after { top: 20%; left: 108%; }
 
/* (F3) POSITION TO THE RIGHT */
div.alt-event.right::after { top: 20%; left: auto; right: 105%; }
</style>
