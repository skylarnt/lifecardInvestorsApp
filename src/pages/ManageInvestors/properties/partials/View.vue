<template>
    <div class="">
         <form action="" @submit.prevent="save">
            <!-- <v-card-title>
                <span class="text-h5">Create Property</span>
            </v-card-title> -->
            <v-card-text class="_body">
            <v-container class="px-0">
                <div v-if="form.image !=null" class="row border-bottom mx-1 mb-3">
                    <div 
                        class="col-md-3"
                        v-for="(img, i) in form.image"
                        :key="i"
                    >
                        <div class="card">
                            <div class="card-body" style="position:relative">
                                <span 
                                    title="Click to remove image" 
                                    class="font-weight-bold cancel_img" 
                                    @click="removeSingleImage(img, i)"
                                    style="cursor:pointer;
                                        color:;
                                        position: absolute;
                                        right: 1%;
                                        top: -6%;
                                        font-size: 20px;"
                                        
                                    >
                                    <i class="mdi mdi-close-thick"></i>
                                </span>
            
                                <embed :src="img.image" alt="" style="width:100%">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <embed :src="form.property_link" alt="" style="width:100%">

                </div>
                <v-row>
                    <v-col
                        cols="12"
                        sm="3"
                        md="3"
                    >
                        <v-text-field
                        label="Name*"
                        v-model="form.name"
                        disabled
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="3"
                        md="3"
                    >
                        <v-select
                            v-model="form.status"
                            :items="['active', 'inactive']"
                            label="Status*"
                            disabled
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="3"
                        md="3"
                    >
                    <v-text-field
                        label="Amount*"
                        v-model="form.amount"
                        disabled
                        ></v-text-field>
                    </v-col>
                    
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                        <div v-html="form.description">

                        </div>
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions style="margin-top:100px">
                <v-spacer></v-spacer>
                <button
                    class="btn btn-primary"
                    @click="closeMe()"

                >
                    Close
                </button>
            </v-card-actions>

        </form>
    </div>
</template>
<script>
export default {
    props:['my_model', 'data'],
    data() {
        return {
            form:this.data,
            loading:false
        }
    },
    methods:{
        
        closeMe() {
            this.$bvModal.hide("view");
        },
        removeMoreInfo(){

        },
    }
}
</script>
<style scoped>
    .requests-table td {
        font-size: 14px;
        vertical-align: middle;
        padding-top: 1px !important;
        padding-bottom: 1px !important;
    }
</style>