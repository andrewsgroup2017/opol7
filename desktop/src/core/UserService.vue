/*eslint no-unused-vars disable */
<script>
import Vue from 'vue'
// import { API_GATEWAY_ENDPOINT } from '../globals/resources'
const url = 'https://z1mp2pbwcg.execute-api.us-west-2.amazonaws.com/dev'
// const nrUrl = 'https://opol-fred.mybluemix.net'


export default {
    methods: {

        noderedLogin: function(username) {
        // Vue.http.headers.common['Authorization'] = token
        // console.log(token)
        // console.log(nrUrl)
            return Vue.http.post('/api/employees/login', { username: username }).then((res) => {
                return res.body
            })
        },
        sendGroupMessage: function(token, message) {
            Vue.http.headers.common.Authorization = token
            return Vue.http.post(`${url}/group-chat`, message).then((res) => {
                return res.body
            })
        },
        deleteChat: function(token, chatId) {
            Vue.http.headers.common.Authorization = token
            return Vue.http.delete(`${url}/user/chats/${chatId}`).then((response) => {
                // console.log(response)
                return response
            })
        },
        updateUserActivity: function(token) {
            Vue.http.headers.common.Authorization = token
            return Vue.http.put(`${url}/user/last-activity`).then((response) => {
                // console.log(response)
                return response
            })
        },
        deleteUser: function(token) {
            Vue.http.headers.common.Authorization = token
            return Vue.http.delete(`${url}/user`).then((res) => {
                return res.body
            })
        },
        getUser: function(token) {
        // console.log('token is: ', token)
            Vue.http.headers.common.Authorization = token
            return Vue.http.get(`${url}/user`).then((res) => {
                // console.log('res is: ', res.body)
                return res.body
            })
        },
        getChats: function(token) {
            Vue.http.headers.common.Authorization = token
            return Vue.http.get(`${url}/user/chats`).then((res) => {
                return res.body
            })
        },
        getMessages: function(chatId, token) {
            Vue.http.headers.common.Authorization = token
            return Vue.http.get(`${url}/user/chats/${chatId}/messages`).then((res) => {
                // console.log('response: ', res.body)
                return res.body
            })
        },
        sendMessage: function(body, chatId, token) {
            Vue.http.headers.common.Authorization = token
            return Vue.http.post(`${url}/user/chats/${chatId}/messages`, { messageBody: body }).then((res) => {
                // console.log('response is: ', res.body)
                return res.body
            })
        },
        sendInvite: function(user, token, type) {
            let body
            if (type === 'username') {
                body = { username: user }
            } else {
                body = { userId: user }
            }
            Vue.http.headers.common.Authorization = token
            return Vue.http.post(`${url}/invites/send`, body).then((res) => {
                // console.log('res is: ', res.body)
                return res.body
            })
        },
        acceptInvite: function(userId, token) {
            Vue.http.headers.common.Authorization = token
            return Vue.http.post(`${url}/invites/accept`, { userId: userId }).then((res) => {
                // console.log('res is : ', res.body)
                return res.body
            })
        },
        getUsers: function(token) {
        // console.log('getting users...')
            Vue.http.headers.common.Authorization = token
            return Vue.http.get(`${url}/users/online`).then((res) => {
                // console.log('response is: ', res.body)
                return res.body
            })
        },
        getInvites: function(token) {
            Vue.http.headers.common.Authorization = token
            // console.log('getting invites...')
            return Vue.http.get(`${url}/user/invites`).then((res) => {
                // console.log('invites are: ', res.body)
                return res.body
            }).catch((err) => {
                console.error(err)
            })
        }
    }
}
</script>
