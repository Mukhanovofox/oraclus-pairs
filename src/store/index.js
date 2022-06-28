import { createStore } from 'vuex'

// Modules
import coins from './modules/coins'

export default createStore({
  modules: {
      coins
  }
})
