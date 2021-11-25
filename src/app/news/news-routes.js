import News from './news.vue';
import NewsHeadlines from './news-headlines/news-headlines.vue';

const newsRoutes = [
    {
        path: '/news',
        name: 'News',
        component: News,
        children: [
            {
                path: 'news-headlines',
                name: 'NewsHeadlines',
                component: NewsHeadlines
            },
            {
                path: 'details',
                name: 'NewsDetails',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ './news-details/news-details.vue'),
                props: true
            },
            {
                path: '',
                redirect: { name: 'NewsHeadlines' }
            }
        ]
    },

]

export default newsRoutes;
