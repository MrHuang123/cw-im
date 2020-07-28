<template>
  <div class="home h-full " >
    测试转换
    <div class="test-viewport">测试转换</div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
  },
  mounted(){
    // 初始化监听器
    this.initListener()
  },
  methods:{
    initListener() {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this)
      // SDK NOT READT
      this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)
      // 被踢出
      this.tim.on(this.TIM.EVENT.KICKED_OUT, this.onKickOut)
      // SDK内部出错
      this.tim.on(this.TIM.EVENT.ERROR, this.onError)
      // 收到新消息
      this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
      // 会话列表更新
      this.tim.on(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onUpdateConversationList)
      // 群组列表更新
      this.tim.on(this.TIM.EVENT.GROUP_LIST_UPDATED, this.onUpdateGroupList)
      // 网络监测
      this.tim.on(this.TIM.EVENT.NET_STATE_CHANGE, this.onNetStateChange)
      // 已读回执
      this.tim.on(this.TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer)
    },
    onMessageReadByPeer() {

    },
    checkoutNetState(state) {
      // switch (state) {
      //   case this.TIM.TYPES.NET_STATE_CONNECTED:
      //     return { message: '已接入网络', type: 'success' }
      //   case this.TIM.TYPES.NET_STATE_CONNECTING:
      //     return { message: '当前网络不稳定', type: 'warning' }
      //   case this.TIM.TYPES.NET_STATE_DISCONNECTED:
      //     return { message: '当前网络不可用', type: 'error' }
      //   default:
      //     return ''
      // }
    },
    onNetStateChange(event) {
      // this.$store.commit('showMessage', this.checkoutNetState(event.data.state))
    },
    onReadyStateUpdate({ name }) {
      // const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
      // this.$store.commit('toggleIsSDKReady', isSDKReady)

      // if (isSDKReady) {
      //   this.tim
      //     .getMyProfile()
      //     .then(({ data }) => {
      //       this.$store.commit('updateCurrentUserProfile', data)
      //     })
      //     .catch(error => {
      //       this.$store.commit('showMessage', {
      //         type: 'error',
      //         message: error.message
      //       })
      //     })
      //   this.$store.dispatch('getBlacklist')
      // }
    },
     onKickOut(event) {
      // this.$store.commit('showMessage', {
      //   message: `${this.kickedOutReason(event.data.type)}被踢出，请重新登录。`,
      //   type: 'error'
      // })
      // this.$store.commit('toggleIsLogin', false)
      // this.$store.commit('reset')
    },
     onError({ data }) {
      // if (data.message !== 'Network Error') {
      //   this.$store.commit('showMessage', {
      //     message: data.message,
      //     type: 'error'
      //   })
      // }
    },
     onUpdateConversationList(event) {
      // this.$store.commit('updateConversationList', event.data)
    },
    onUpdateGroupList(event) {
      // this.$store.commit('updateGroupList', event.data)
    },
     onReceiveMessage({ data: messageList }) {
      this.handleVideoMessage(messageList)
      this.handleAt(messageList)
      this.handleQuitGroupTip(messageList)
      this.$store.commit('pushCurrentMessageList', messageList)
    },
  }
};
</script>
<style lang="less" scoped>
.home{
  overflow-y: auto
}
.test-viewport {
  width: 750px;
  height: 100px;
  font-size: 40px;
  text-align: center;
  line-height: 100px;
  background: #13b5b1;
}
</style>