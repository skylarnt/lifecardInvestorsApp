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
                <div class="row">
                    <div class="col-md-4 mb-2">
                        <h5>Actual amount <span class="text-info">₦{{ Number(data.amount).toLocaleString() }}</span></h5>
                        <h5>Total amount paid <span class="text-info">₦{{ Number(amount_paid).toLocaleString() }}</span></h5>
                        <h5>Total amount left <span class="text-info">₦{{ (Number(data.amount) - Number(amount_paid)).toLocaleString() }}</span></h5>

                    </div>
                    <div class="col-md-8 mb-2">
                        <div class="alert   shadow-sm" style="background-color: #dbf0ff;">
                            <h4>Payment Info</h4>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, similique!
                        </div>
                    </div>
                </div>
                
              
                <div class="alt-vtl mt-3" v-if="transactions.length">
                    <div class="alt-event" 
                        v-for="(tr, i) in transactions" 
                        :key="tr.id"
                        :class="{
                            'right' : (i+1) % 2 < 1
                        }"
                    >
                        <button class="btn btn-primary float-right ml-2" @click="deleteTransaction(tr)">Delete</button>
                        <button class="btn btn-primary float-right" @click="trans_rec = tr; $bvModal.show('EditBreakdown'); current=p">Edit</button>
                        <p class="date mb-0">{{tr.created_at | moment("from", true) }} ago</p>
                        <h3 class="mb-0">₦{{Number(tr.amount).toLocaleString()}}</h3>
                        <p class="mb-0 txt"> Was recorded as this user payment.</p>
                        <p class="mb-0 txt" v-if="tr.is_reciept_received=='yes'" >Receipt has been sent</p>
                        <p class="mb-0 txt" v-else> 
                            <button class="btn p-0" type="button"><span @click="sendReceipt(tr.id)">Click to send receipt</span></button>
                        </p>
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

            <b-modal size="lg"  title="Edit Breakdown" id="EditBreakdown" hide-footer>
            <EditBreakdown :my_model="$bvModal" :auth_token="auth_token"  @done="fetch()"  :data="trans_rec"  />
        </b-modal>

        </form>
  </div>
</template>

<script>
import VueElementLoading from 'vue-element-loading'
import EditBreakdown from '@/pages/ManageInvestors/approved/partials/EditBreakdown';
import { mapState,mapActions } from 'vuex';
import swal from 'sweetalert';
export default {
    props:['my_modal', 'data', 'swal'],
    components:{
        VueElementLoading,
        EditBreakdown
    },
    computed:{
        ...mapState('auth',['auth_token', 'auth_data']),

    },
    data() {
        return {
            nameRules: [
                v => !!v || 'This is a required',
            ],
            trans_rec: {},
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
        ...mapActions('page', ['getAuthData']),
        closeMe() {
            this.$bvModal.hide('breakdownA')
        },
        sendReceipt(id) {
            this.loading=true;
            this.$api.post(this.dynamic_route('/requests/admin/record_receipt'), {
                id
            }).then((res) => {
                this.loading=false;

                if(res.status == 200) {
                  this.fetch()
                } else {
                    if(res.status==422 && res.data.message =="The given data was invalid.") this.error_messg=res.data.errors
                    this.toast(res)
                }

            });
        }, 
        deleteTransaction(data) {
            swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this transaction!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    this.deleteTrans(data.id)
  } else {
    
  }
});
        },
        deleteTrans(id) {
            this.loading=true;
            this.$api.delete(this.dynamic_route(`/requests/admin/delete_transaction_breakdown/${id}`)
            ).then((res) => {
                this.loading=false;

                if(res.status == 200) {
        this.fetch()

                this.$toast.success('Payment Deleted', {
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
                } else {
                    if(res.status==422 && res.data.message =="The given data was invalid.") this.error_messg=res.data.errors
                    this.toast(res)
                }

            });
        },
        fetch() {
            this.loading=true;
            this.$api.post(this.dynamic_route('/requests/admin/get_transactions'), {
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
  height:100%;
 
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
