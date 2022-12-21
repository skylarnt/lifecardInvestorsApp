export default {
  data: () => {
      return {
      }
  },
 methods: {
  getAppPercentAmount(data){
    var appreciate = data.more_infos.find(ele=>{
       return ele.name.toLowerCase() == 'percent' 
   });

   return (Number(data.price)/100) * Number(appreciate.value)+data.price
   
},
 }
};
