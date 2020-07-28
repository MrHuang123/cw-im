<template>
    <div class="login p-lr-20">
        <div class='w-per-100 f-c p-t-80 m-b-40'>
            <img class="h-130 w-130" :src="logo" />
        </div>
        <div class='idNum f-s-c'>
            <label class='m-r-20'>课程码</label>
            <input class='f-1 p-tb-15' v-model='userID' type="text" placeholder="请输入课程码" />
        </div>
        <div class='f-c w-per-100 m-t-40'>
            <button class="submit"  @click="onLogin">进入课程</button>
        </div>
    </div>
</template>
<script>
import logo from '../assets/logo.png'
export default {
    name:'login',
    data(){
        return {
            logo,
            userID: 'user0',
        }
    },
    mounted(){
        console.log(this.tim);
    },
    methods:{
        onLogin(){
            this._loading()
            this.tim.login({
                userID: this.userID,
                userSig: window.genTestUserSig(this.userID).userSig
            }).then((res)=>{
                this._clear()
                 this.$router.push('/home')
                console.log(res);
            }).catch(error => {
                console.log(error);
                this._clear()
                // this.loading = false
                // this.$store.commit('showMessage', {
                //     message: '登录失败：' + error.message,
                //     type: 'error'
                // })
            })
        }
    }
}
</script>
<style lang="stylus">
.login
    width 100%
    height 100%
    overflow-y auto
    .logo
        width: 130px;
        height: 130px;
    .idNum
        input 
            border: none;
            border-bottom: 1px solid  #ccc;
    .submit{
        width:550px;
        height:100px;
        background:linear-gradient(180deg,rgba(92,122,255,1) 0%,rgba(58,73,173,1) 100%);
        box-shadow:0px 15px 30px 0px rgba(0,0,0,0.24);
        border-radius:60px;
        font-size:30px;
        font-family:MicrosoftYaHei;
        color:rgba(223,229,255,1);
    }
</style>
