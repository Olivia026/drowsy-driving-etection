import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css";
import "element-ui/lib/theme-chalk/display.css";
import axios from "./utils/http";
import "hover.css";
import App from "./App.vue";
import router from "./router";

import {
  BackTop,
  Affix,
  Button,
  Menu,
  MenuItem,
  Card,
  Row,
  Col,
  Tag,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  CheckboxGroup,
  Checkbox,
  Select,
  Option,
  RadioGroup,
  Radio,
  Cascader,
} from "view-design";
import "view-design/dist/styles/iview.css";
Vue.component("Button", Button);
Vue.component("Menu", Menu);
Vue.component("MenuItem", MenuItem);
Vue.component("Card", Card);
Vue.component("Row", Row);
Vue.component("Col", Col);
Vue.component("Tag", Tag);
Vue.component("Tabs", Tabs);
Vue.component("TabPane", TabPane);
Vue.component("Form", Form);
Vue.component("FormItem", FormItem);
Vue.component("Input", Input);
Vue.component("CheckboxGroup", CheckboxGroup);
Vue.component("Checkbox", Checkbox);
Vue.component("Select", Select);
Vue.component("Option", Option);
Vue.component("RadioGroup", RadioGroup);
Vue.component("Radio", Radio);
Vue.component("Cascader", Cascader);
Vue.component("BackTop", BackTop);
Vue.component("Affix", Affix);
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.axios = axios;

new Vue({
  router,
  beforeCreate: () => {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
}).$mount("#app");
