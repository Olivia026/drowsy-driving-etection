import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 原有组件导入
const Home = () =>
    import ("@/views/Home");
// 新增登录/注册组件
const Auth = () =>
    import ("@/views/Auth"); // 新增的认证页面
const FatigueDetection = () =>
    import ("@/views/FatigueDetection.vue");
const goToContact = () =>
    import ("@/views/goToContact.vue");
const routes = [{
        path: "",
        redirect: "/home",
    },
    {
        path: "/home",
        component: Home,
        meta: { title: "首页" },
    },
    {
        path: "/threenav",
        component: FatigueDetection,
        meta: {
            requiresAuth: true, // 需要登录
            title: "历史记录",
        },
    },
    {
        path: "/auth", // 新增的登录/注册路由
        component: Auth,
        meta: {
            title: "登录/注册",
            guestOnly: true, // 仅未登录用户可访问
        },
    },
    {
        path: "/fatigue-detection",
        name: "FatigueDetection",
        component: FatigueDetection,
        meta: {
            title: "疲劳检测",
            requiresAuth: true, // 需要登录
        },
    },
    {
        path: "/goToContact",
        name: "goToContactn",
        component: goToContact,
        meta: {
            title: "联系我们",
            requiresAuth: true, // 需要登录
        },
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
    // 设置页面标题
    if (to.meta.title) {
        document.title = to.meta.title;
    }

    // 检查是否需要登录
    const isAuthenticated = localStorage.getItem("user");

    // 如果路由需要认证但用户未登录
    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !isAuthenticated
    ) {
        next({ path: "/auth", query: { redirect: to.fullPath } });
        return;
    }

    // 如果路由仅限未登录用户访问但用户已登录
    if (to.matched.some((record) => record.meta.guestOnly) && isAuthenticated) {
        next({ path: "/" });
        return;
    }

    next();
});

export default router;