/*
 * @Author:carrie
 * @Date: 2018-08-01 09:49:29
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-01 18:38:09
 * content:预约详情
 */

<template>
	<div class="approveDetails control-margin">
		<!-- <div class="container">
			<div class="approveTitle">
				<p class="hadeTile">预约服务</p>
			</div>
			<ul class="approveServe">
				<li>
					<span class="designation">单位</span>
					<span class="appreveContent">微达安</span>
				</li>
				<li>
					<span class="designation">姓名</span>
					<span class="appreveContent">carrie</span>
				</li>
				<li>
					<span class="designation">证件号</span>
					<span class="appreveContent">4302241998784885</span>
				</li>
			</ul>
		</div> -->
		<div class="container" v-for="(container,i) in items" :key="i">
			<div class="approveTitle">
				<p class="hadeTile">{{container.hadeTile}}</p>
			</div>
			<ul class="approveServe">
				<li>
					<span class="designation">{{container.unit}}</span>
					<span class="appreveContent">{{container.organization}}</span>
				</li>
				<li>
					<span class="designation">{{container.users}}</span>
					<span class="appreveContent">{{container.names}}</span>
				</li>
				<li>
					<span class="designation">{{container.idNumber}}</span>
					<span class="appreveContent">{{container.numbers}}</span>
				</li>
				<li>
					<span class="designation">{{container.handlePerson}}</span>
					<span class="appreveContent">{{container.PersonName}}</span>
				</li>
			</ul>
		</div>
			<div class="approveResult">
				<p class="result-content">
					<span>{{resultTitle}}</span>
					<span class="finalReult">{{finalReult}}</span>
				</p>
				<p class="cause">
					{{cause}}:{{causeType}}
				</p>
			</div>
	</div>
</template>
<script>
export default {
    name: "approveDetails",
    data() {
        return {
			items:[
				{
				hadeTile:'预约服务',
				unit:"单位",
				organization:'微达安',
				users:'姓名',
				names:'carrie',
				idNumber:"证件号",
				numbers:'430224199897734'
				},
				{
				hadeTile:'预约信息',
				unit:"预约时间",
				organization:'2018-08-07 11:00',
				},
				{
				hadeTile:'预约人信息',
				unit:"警号",
				organization:'12345',
				handlePerson:"办案人",
				PersonName:'Carrie',
				users:'办事人',
				names:'carrie',
				idNumber:"办事单位",
				numbers:'省厅'
				},
				
			],
			resultTitle:"预约结果",
			finalReult:'失败',
			cause:'失败原因',
			causeType:"时间错误"
			
		};
    }
};
</script>
<style lang="less" scoped>
.control-margin {
    margin-top: -0.4rem;
}
.container {
    padding-top: 0.4rem;
}
.approveDetails {
    background-color: #fff;
    font-size: 0.373333rem;
    color: #333;
}
.hadeTile {
	font-size: .4rem;
    padding: 0 5%;
    font-size: 0.373333rem;
    padding-bottom: 0.4rem;
}
.approveServe {
    padding: 0 5%;
    padding-bottom: 0.133333rem;
    border-bottom: 1px solid #ededed;
    li {
        padding-bottom: 0.266667rem;
        display: flex;
        color: #666666;
        span {
			font-size: .32rem;
            flex: 1;
        }
        .appreveContent {
            text-align: right;
        }
    }
}
.approveResult{
	padding: .4rem 5%;
	.result-content{
		display: flex;
		span{
			flex:1;
		}
	}
	.finalReult{
		color: #EA4D5F;
		text-align: right; 
	}
	.cause{
		padding-top: .4rem;
		color: #EA4D5F;
	}
}
</style>


