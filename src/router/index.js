import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'


import Login from '../components/Login.vue'
import list from '../components/list.vue'
import test from '../components/test.vue'
import Cinecism from '../components/Cinecism.vue'
import t2 from '../components/t2.vue'
import write from '../components/element/write.vue'
import blog from '../components/element/blog.vue'
import NavigationBar from '../components/element/NavigationBar.vue'
import Home from '../components/Home.vue'
import PersonInf from '../components/PersonInf.vue'
import personChange from '../components/element/person-chang.vue'
import passwordChange from '../components/element/password-change.vue'
import logout from "../components/element/logout.vue"
import HomePage from "../components/HomePage.vue"
import bottom from "../components/element/bottom.vue"
import Search from "../components/Search.vue"
import LoginRegist from "../components/LoginRegist.vue"
import Article from '../components/Article.vue';
import Friends from '../components/Friends.vue';
import follow from '../components/element/follow.vue';
import fans from '../components/element/fans.vue';
import reCinecism from '../components/element/reCincism.vue'
import index from '../components/admin/index.vue'
import adminMovie from '../components/element/admin-movie.vue'
import adminMovieChange from '../components/element/admin-movie-change.vue'
import adminUser from '../components/element/admin-user.vue'
import adminAdmin from '../components/element/admin-admin.vue'
import adminCinecism from '../components/element/admin-cinecism.vue'
import adminDiscuss from '../components/element/admin-discuss.vue'
import adminBlog from '../components/element/admin-blog.vue'
import allCinecism from '../components/AllCinecism.vue'
import genreSearch from '../components/GenreSearch.vue'
import adminLogin from '../components/admin/adminLogin.vue'
import billUpload from '../components/element/bill-upload.vue'
import movie from '../components/Movie.vue'
import means from '../components/element/means.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/Movie',
            component: movie
        },
        {
            path: '/login',
            component: LoginRegist
        },
        {
            path: '/billUpload',
            component: billUpload
        }
        ,
        {
            path: '/adminLogin',
            component: adminLogin
        },
        {
            path: '/list',
            name: 'list',
            component: list
        },
        {
            path: '/test',
            component: test
        },
        {
            path: '/editor',
            name: 'editor',
            component: Cinecism
        },
        {
            path: '/reCinecism',
            name: 'reCinecism',
            component: reCinecism
        }
        ,
        {
            path: '/friends',
            name: 'friends',
            component: Friends,
            children: [
                { path: "follow", component: follow },
                { path: "fans", component: fans }
            ]
        },
        {
            path: '/t2',
            name: 't2',
            component: t2
        },
        {
            path: '/navBar',
            name: 'navBar',
            component: NavigationBar
        },
        {
            path: "/allCinecism",
            name: 'allCinecism',
            component: allCinecism
        },
        {
            path: '/Home',
            name: 'home',
            component: Home,
            children: [
                { path: "write", component: write },
                { path: "blog", component: blog }
            ]
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
        },
        {
            path: '/Article',
            name: 'Article',
            component: Article
        }
        , {
            path: '/person',
            name: 'person',
            component: PersonInf,
            children: [
                { path: "personChange", component: personChange },
                {
                    path: "passwordChange", component: passwordChange
                },
                {
                    path: "logout", component: logout
                }
            ]
        },
        {
            path: '/'
            , name: 'HomePage',
            component: HomePage
        },
        {
            path: '/genreSearch',
            name: 'genreSearch',
            component: genreSearch
        },
        {
            path: '/means',
            name: 'means',
            component: means
        }
        ,
        {
            path: '/bottom',
            name: 'bottom',
            component: bottom
        },
        {
            path: '/Admin/index',
            name: 'index',
            component: index,
            children: [
                {
                    path: "adminMovie", component: adminMovie
                },
                {
                    path: "adminUser", component: adminUser
                },
                {
                    path: 'adminMovieChange', component: adminMovieChange
                },
                {
                    path: 'adminAdmin', component: adminAdmin
                },
                {
                    path: 'adminDiscuss', component: adminDiscuss
                },
                {
                    path: 'adminBlog', component: adminBlog
                },
                {
                    path: 'adminCinecism', component: adminCinecism
                }
            ]
        }
    ]
})
export default router