/**
 * Created by Administrator on 2017/10/10.
 */
//import imageClipper from './imageClipper.vue';
import imageClipper from '../imageClipper/imageClipper.vue'

export default {
    install(Vue) {
        Vue.component(imageClipper.name, imageClipper);
    }
}