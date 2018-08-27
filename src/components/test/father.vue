<template>
	<div id="app">
   	
  	</div>
</template>
<script>
	export default {
		data(){
			return {
				prives:[],
				city:[],
				area:[],
				privesJson:{},
				cityJson:{}


			}
		},
		mounted(){
			// this.$axios.get("/api/login").then(res => {
			// 	console.log(res)
			// },response => {
			// 	console.log(response);
			// })
			this.$http.get("/static/json/jiguan.json").then(res => {
				let value=res.data.record;
				for(let i=0;i<value.length;i++){
					if(value[i].CD_CODE.length==2){
						this.prives.push(value[i]);//把每一个元素推入prives中
					}
					if(value[i].CD_CODE.length==4){
						this.city.push(value[i]);
					}
					if(value[i].CD_CODE.length==6){
						this.area.push(value[i]);
					}
				}
				// console.log(this.prives);

				// console.log(this.city);
				
				// console.log(this.area);

				//let privesJson={};

				for(let i=0;i<this.prives.length;i++){
					this.privesJson[this.prives[i].CD_CODE]=[];//清空privesJson中的编码,把每个编码当下标传入privesJson里
					for(let j=0;j<this.city.length;j++){//对city进行循环
						if(this.city[j].CD_CODE.indexOf(this.prives[i].CD_CODE)>-1){//如果city的编码没有prives的编码就压入
							this.privesJson[this.prives[i].CD_CODE].push(this.city[j]);
						}	
					}
				}
			

				let cityJson={};

				for(let i=0;i<this.city.length;i++){
					this.cityJson[this.city[i].CD_CODE]=[];
					for(let j=0;j<this.area.length;j++){
						if(this.area[j].CD_CODE.indexOf(this.city[i].CD_CODE)>-1){
							this.cityJson[this.city[i].CD_CODE].push(this.area[j]);
						}	
					}
				}

				console.log(this.privesJson);

				// console.log(this.cityJson);

			},response => {
				console.log(response);
			})
		}
	}
</script>
<style>
	html,body{
		height:100%;
		overflow:hidden;
	}
</style>

