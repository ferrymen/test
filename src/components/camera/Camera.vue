<template>
    <div class="vue-camera">
        <div class="camera-hidden">
            {{label}}
            <input accept="image/*" capture="camera" type="file" @change="change">
        </div>
        <div v-show="preview" class="camera-preview" ref="preview"></div>
    </div>
</template>

<script>
export default {
  name: 'Camera',
  props: {
    label: {
      type: String,
      default: "TAKE PHOTO"
    },
    preview: {
      type: String,
      default: "TAKE PHOTO"
    }
  },
  data() {
    return {
      picture: {}
    };
  },
  watch: {
    picture: {
      deep: true,
      handler(picture) {
        this.$emit("input", picture);
        this.$emit("change");
        this.previewer(picture);
      }
    }
  },
  methods: {
    change(e) {
      const picture = e.target.files || e.dataTransfer.files;
      if (!picture.length) {
        return;
      }
      this.picture = picture;
    },
    previewer(picture) {
      const reader = new FileReader();
      reader.readAsDataURL(picture[0]);
      reader.addEventListener("load", () => {
        this.createPreviewField(reader.result);
      });
    },
    createPreviewField(src) {
      let photo;
      if (!photo) {
        photo = document.createElement("img");
        this.$refs["preview"].appendChild(photo);
      }
      photo.src = src;
    }
  }
};
</script>

<style>
.vue-camera {
  display: block;
  height: 100%;
  background: #fff;
  position: relative;
}

.vue-camera .camera-hidden {
  width: 100%;
    height: 44px;
    overflow: hidden;
    position: relative;
    font-size: 14px;
    text-align: center;
    line-height: 44px;
}

.vue-camera .camera-hidden input {
  position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      z-index: 999;
}
</style>
