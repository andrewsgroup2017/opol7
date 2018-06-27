<template>

  <div :style="pickerStyle.picker">
    <img :src="src" :style="pickerStyle.img" @error="imageError" />
    <input :style="pickerStyle.input" title="Pick" type="file" accept="image/*" @change="pick" />
  </div>
</template>

<script>
import { Storage } from 'aws-amplify'
const pickerStyle = {
    picker: {
        position: 'relative'
    },
    preview: {
        maxWidth: '100%'
    },
    img: {
        width: '100px',
        height: '100px',
        // borderRadius: '50%',
        fontSize: '1.2em',
        textAlign: 'center'
    },
    input: {
        width: '100%',
        height: '100%',
        display: 'inline-block',
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
        cursor: 'pointer'
    }
}
export default {
    name: 'PhotoPicker',
    props: [ 'defSrc', 'path' ],
    data: function() {
        return {
            src: this.defSrc,
            style: {},
            loading: false
        }
    },
    computed: {
        pickerStyle: function() {
            return Object.assign({}, this.style.picker, pickerStyle)
        }
    },
    created: function() {
        this.getPhoto()
        this.loading = true
    },
    methods: {
        getPhoto: function() {
            Storage.get(this.path).then((url) => {
                return this.src = url
            })
        },
        pick: function(e) {
            this.loading = true
            const file = e.target.files[0]
            const { name, size, type } = file
            console.debug(name)
            console.debug(size)
            console.debug(`upload photo to ${ this.path}`)
            Storage.put(this.path, file, {
                contentType: type
            })
                .then((data) => {
                    console.debug(data)
                    this.getPhoto()
                })
                .then(this.loading = false)
                .catch((err) => {
                    return console.error(err)
                })
        },
        imageError: function() {
            this.src = this.defSrc
        }
    }
}
</script>
