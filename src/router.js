const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/topic/:address',
        name: 'topic',
        component: (resolve) => require(['./views/topic.vue'], resolve)
    }];
export default routers;
