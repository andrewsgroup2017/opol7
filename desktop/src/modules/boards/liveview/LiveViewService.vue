<script>
import Vue from 'vue'

export default {
    methods: {
        getRegisters: function() {
            return Vue.http.get('/api/registersjson').then((res) => {
                return res.body
            })
        },

    }
}
</script>

