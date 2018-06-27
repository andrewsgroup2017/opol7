/*eslint no-unused-vars disable */
<script>
import Vue from 'vue'
// import { API_GATEWAY_ENDPOINT } from '../globals/resources'
const url = 'http://localhost:1880'

export default {
    methods: {
        getHardwares: function() {
            return Vue.http.get('/api/assets/hardwarelist').then((res) => {
                return res.body
            })
        },
        checkInhardware: function(assetId) {
            return Vue.http.post('/api/assets/checkinhardware', { assetId: assetId }).then((res) => {
                return res.body
            })
        },
        checkOuthardware: function(assetId, username) {
            console.log(username)
            return Vue.http.post('/api/assets/checkouthardware', { assetId: assetId, username: username }).then((res) => {
                return res.body
            })
        },
        getConsumables: function() {
            return Vue.http.get('/api/assets/consumablelist').then((res) => {
                console.log(res)
                return res.body
            })
        },
        takeConsumable: function(asset) {
            console.log(asset)
            // const id = assetId.id
            return Vue.http.post('/api/assets/takeconsumable', { asset: asset }).then((res) => {
                console.log(res)
                return res.body
            })
        },
        getEmployees: function() {
        // console.log('getting users...')
            return Vue.http.get('/api/employeelist/').then((res) => {
                // console.log('response is: ', res.body)
                return res.body
            })
        },
    }
}
</script>

