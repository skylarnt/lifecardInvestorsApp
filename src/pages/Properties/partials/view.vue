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
          
            <!-- <v-card-title>
                <span class="text-h5">Create Property</span>
            </v-card-title> -->
            <v-card-text class="_body p-0">
                <div>
                    <div   id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" :data-slide-to="i" :class="{ 'active': i==0}" v-for="(im,i) in data.image" :key="i"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item" v-bind:class="{ 'active': i==0}" v-for="(im,i) in data.image" :key="i">
                                <!-- <div class="row">
                                    <div class="col-md-6 col-12 p-0" > -->
                                        <embed :src="im.image" class="img-control thumbnail" style="width:100%">
                                    <!-- </div>
                                     <div class="col-md-6 col-12 p-0" >
                                        <img :src="data.image[i+1].image" class="w-100 thumbnail" style="height:400px">
                                    </div>
                                </div> -->
                                
                            <!-- <img class="d-block w-100" src="..." alt="First slide"> -->
                            </div>
                            <!-- <div class="carousel-item">
                            <img class="d-block w-100" src="..." alt="Second slide">
                            </div>
                            <div class="carousel-item">
                            <img class="d-block w-100" src="..." alt="Third slide">
                            </div> -->
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div class="mt-2">
                    <div>
                        NAME:<h6>{{data.name}} -.</h6>

                    </div>
                    <div>
                        PRICE: <h6 class="text-info"> {{ Number(data.amount).toLocaleString() }}</h6>

                    </div>
                    <div>
                        LOCATION:<h6> {{ data.location }}</h6>

                    </div>
                    <div>
                        TYPE:<h6> {{ data.type }}</h6>

                    </div>
                    <div v-if="data.property_link !=null">
                        <a class=" a" :href="data.property_link" target="_blank">View Property Link</a>
                    </div>
                    <div v-if="data.video_link !=null">
                        <a class=" a" :href="data.video_link" target="_blank">View Video Link</a>
                    </div>
                    <div v-html="data.description">
                    </div>
                    <div class="col-6" v-if="squareMeter.length ">
                        More info 
                        <v-simple-table v-if="data.type =='land'">
                            <thead>
                                <tr>
                                <th>Square Meter</th>
                                <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tr, i) in  squareMeter" :key="i">

                                    <td>
                                        {{ tr.sqm }}
                                    </td>
                                    <td>
                                        {{ Number(tr.price).toLocaleString() }}
                                    </td>
                                

                                </tr>

                            </tbody>
                        </v-simple-table>
                        <v-simple-table v-if="data.type =='house'">
                            <thead>
                                <tr>
                                <th>Unit </th>
                                <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tr, i) in  squareMeter" :key="i">

                                    <td>
                                        {{ tr.unit }}
                                    </td>
                                    <td>
                                        {{ Number(tr.price).toLocaleString() }}
                                    </td>
                                   

                                </tr>

                            </tbody>
                        </v-simple-table>

                    </div>
                </div>
            </v-card-text>
            <v-card-actions  >
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    type="button"
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
            squareMeter: this.data.square_meters_info == null ? [] : this.data.square_meters_info,
            columnNames:[],
        }
    },
    mounted() {

        if(this.squareMeter.length) {
            this.columnNames= Object.keys(this.squareMeter[0])

        } 
        

    },
    methods:{
        closeMe() {
            this.$bvModal.hide('view')
        },
        
    }
}
</script>

<!-- <style>
    .convo {
        background: #002b49 !important;
        color: white !important;
        height: calc(100vh / 2) !important;
        padding: 9px 11px !important;
        border-radius: 10px !important;
        overflow-y: scroll;
    }
    .my_text div.message{
        width: 50%;
        background-color: white !important;
        color: black;
        padding: 5px;
        border-radius: 8px;
        
    }
    .my_text div{
        
        float: right;
    }
    .other_text div{
        
        clear: right;
    }
    
    .other_text div.message{
        width: 50%;
        background-color: white !important;
        color: black;
        padding: 5px;
        border-radius: 8px;
    }
</style> -->
<style>
h6 {
    display: inline-block
}
.convo {
        /* background: #002b49 !important; */
        /* color: white !important; */
        height: calc(100vh / 2) !important;
        padding: 0px 11px !important;
        border-radius: 10px !important;
        overflow-y: scroll;
    }
    * {
  font-family: 'Avenir';
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
  width:20px;
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
	background-color: #6C8EA4;
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
span.other{
  font-size: 14px;
  color: grey;
}
</style>