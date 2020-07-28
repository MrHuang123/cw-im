import TIM from 'tim-js-sdk'
/**
 * Im client class
 */
export default class TimClient{
  /**
   * @constructor
   * @param {string} sdkAppId
   * @param {string} avChatRoomId
   */
  constructor(onMsgRcved,sdkAppId,roomId,userId,userSig,xMap){
    this._client = null
    this._onMsgRcved = onMsgRcved
    this._sdkAppId = sdkAppId
    this._roomId = roomId
    this._userId = userId
    this._userSig = userSig
    this._xMap = xMap
    this._data = []
  }
  
  get client(){return this._client}
  set client(val){this._client = val}

  get onMsgRcved(){return this._onMsgRcved}
  set onMsgRcved(val){this._onMsgRcved = val}

  get sdkAppId(){return this._sdkAppId}
  set sdkAppId(val){this._sdkAppId = val}

  get roomId() { return this._roomId}
  set roomId(val) { this._roomId =val}

  get userId(){return this._userId}
  set userId(val){this._userId = val}

  get userSig(){return this._userSig}
  set userSig(val){this._userSig = val}

  get xMap(){return this._xMap}
  set xMap(val){this._xMap = val}

  get data(){return this._data}
  set data(val){this._data = val}

  get imLoginInfo(){
    return {
      'sdkAppID': this.sdkAppId, //用户所属应用id,必填
      'appIDAt3rd': this.sdkAppId, //用户所属应用id，必填
      'identifier': null, //当前用户ID,必须是否字符串类型，选填
      'identifierNick': "null", //当前用户昵称，选填
      'userSig': null, //当前用户身份凭证，必须是字符串类型，选填
      'headurl': '',//当前用户默认头像，选填
      'accountType': 0 //用户所属应用帐号类型，已废弃
    }
  }

  get imListener(){
    return {
      "onConnNotify": this.onConnNotify.bind(this), //选填
      "jsonpCallback": this.jsonpCallback.bind(this), //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
      "onBigGroupMsgNotify": this.onBigGroupMsgNotify.bind(this), //监听新消息(大群)事件，必填
      "onMsgNotify": this.onMsgNotify.bind(this),//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
      "onGroupSystemNotifys": this.onGroupSystemNotifys.bind(this), //监听（多终端同步）群系统消息事件，必填
      "onGroupInfoChangeNotify": this.onGroupInfoChangeNotify.bind(this)//监听群资料变化事件，选填
    }
  }

  get options(){
    const opts = {}
    opts.isLogOn = false
    opts.isAccessFormalEnv = true
    return opts;
  }

  init(){
    const options = {
      sdkAppID:this.sdkAppId
    }
    this.client =TIM.create(options)
    this.subEvent() 
  }

  subEvent(){
    
  }

  async startAsync(){
      this.init()
      await this.loginAsync()
      await this.joinAsync()
  }
  loginAsync(){
    return new Promise((resolve,reject)=>{
      const client = this.client
      const loginInfo = this.imLoginInfo
      const listeners = this.imListener
      const options = this.options
      client.login(loginInfo,listeners,options,s=>resolve(s),e=>reject(e));
    })
  }
  joinAsync(){
    return new Promise((resolve,reject)=>{
      const client = this.client
      const options = {GroupId:this.roomId}
      client.applyJoinBigGroup(options,s=>resolve(s),e=>reject(e))
    })
  }
  quitAsync(){
    return new Promise((resolve,reject)=>{
      const client = this.client
      const options = {GroupId: this.roomId}
      client.quitBigGroup(options,s=>resolve(s),e=>reject(e))
    })
  }
  async changeRoomAsync(roomId){
    if(this.roomId == roomId){
      return
    }
    await this.quitAsync()
    await this.enterRoomAsync(roomId)
  }
  async enterRoomAsync(roomId){
    this.roomId = roomId
    await this.joinAsync()
  }
  async stopAsync(){
    this.data = []
    this.xMap.clear()
    await this.quitAsync()
  }
  reconnect(){
    setTimeout( async ()=>{
      try {
        await this.quitAsync()
        await this.joinAsync()
      } catch (e){
        this.reconnect()
      }
    },500)
  }
  onConnNotify(e){
    // const code = e.ErrorCode;
    // switch(code){
    //   case webim.CONNECTION_STATUS.ON:
    //     break;
    //   case webim.CONNECTION_STATUS.OFF:
    //     this.reconnect()
    //     break;
    //   default:
    //     console.error('未知连接状态,status=' + resp.ErrorCode)
    //     break;
    // }
  }
  jsonpCallback(rspData){
    this.client.setJsonpLastRspData(rspData)
  }
  onBigGroupMsgNotify(msgs){
    if(msgs.length == 0){
      return
    }
    for(let i= msgs.length-1;i>=0;i--){
      const msg = msgs[i]
      const el = msg.elems[0]
      if (el.type == "TIMCustomElem"){
        const parseData = JSON.parse(el.content.data)
        const id = parseData.data.id
        const content = parseData.data.content
        if(content != ""){
          this.xMap.add(id,content)
        }
      }
    }
    this.data =  this.xMap.values()
    if(this.onMsgRcved){
      this.onMsgRcved(this.data)
    }
  }
  onMsgNotify(){
    
  }
  onGroupSystemNotifys(){

  }
  onGroupInfoChangeNotify(){

  }
}