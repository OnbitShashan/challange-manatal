import News from './news.vue';
import NewsHeadlines from './news-headlines/news-headlines.vue';

const newsRoutes = [
    {
        path: '/news',
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
                component: () => import('./news-details/news-details.vue'),
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
