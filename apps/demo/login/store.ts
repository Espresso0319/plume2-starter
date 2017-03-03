import {Store, IOptions} from 'plume2'
//import { Router } from 'preact-router';
import { hashHistory } from 'react-router'

import commActor from './actor/comm-actor'
import  WebApi from './webapi'


export default class AppStore extends Store {
  //[propName: string]: any;
  constructor(props: IOptions) {
    super(props)
    if (__DEV__) {
      window['_store'] = this
    }
  }
  bindActor() {
    return [
      new commActor,
     
    ]
  }

  setLoading = () => {
    console.log("store setLoading")
    this.dispatch('login:setLoading')
    hashHistory.push("/home")
  };

  init=()=>{
    WebApi.init();
  
  }
}