<template>
  <div class="cqc-upload">
    <uploadDragger 
      v-if="drag" 
      :accept="accept"
      @file="uploadFiles"
    >
      <slot name="drag" v-if="$slots.drag"></slot>
    </uploadDragger>
    <template v-else>
      <input
        ref="uploadInp"
        class="uploadInp"
        type="file"
        :accept="accept"
        :name="name"
        :multiple="multiple"
        @change="handleChange"
      />
      <div @click="handleClick">
        <slot v-if="$slots.default"></slot>
        <cqc-button type="primary" v-else>上传</cqc-button>
      </div>
    </template>
    <div class="cqc-upload-tips">
      <slot name="tips"></slot>
    </div>
  </div>
</template>

<script>
/*
on-exceed - 如果数量超过限制后，会执行此方法
on-change - 如果当前上传的文件的状态发生变化的时候， 会触发，用户选择了文件，上传成功，上传失败都会触发
*/
import ajax from '@/lib/ajax';
import uploadDragger from './upload-dragger.vue';
export default {
  name: "cqc-upload",
  components: {
    uploadDragger
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    formDataName: {
      type: String,
      default: 'file'
    },
    action: {
      type: String,
      default: ""
    },
    accept: String,
    // 限制个数
    limit: {
      type: Number,
      default: 0
    },
    multiple: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    drag: { // 是否是拖拽上传
      type: Boolean,
      default: false
    },
    accept: String,
    exceed: Function,
    change: Function,
    success: Function,
    error: Function,
    progress: Function,
    beforeUpload: Function,
    httpRequest: Function, // 用户自定义的上传方法
  },
  data() {
    return {
      tempIndex: 1,
      files: [], // 存储要上传的file
      reqs: {}
    }
  },
  watch: {
    fileList: {
      immediate: true,
      handler(val) {
        if (val && val.length > 0) {
          this.files = val.map(e => {
            e.uid = Math.random() + this.tempIndex++;
            e.status = 'success';
            return e;
          })
        }
      }
    }
  },

  methods: {
    handleClick() {
      this.$refs.uploadInp.value = "";
      this.$refs.uploadInp.click();
    },
    handleStart(file) {
      // 给文件生成唯一的id
      file.uid = Math.random() + this.tempIndex++;
      let fileData = {
        status: 'ready',
        name: file.name,
        size: file.size,
        percentage: 0, // 上传的进度
        uid: file.uid,
        file
      };
      this.files.push(fileData)
     // this.onChange && this.onChange(file, this.files)
    },
    post(file) {
      // 真正的上传
      if (!this.action) {
        console.error('cqc-upload的action值不能为空')
        return false;
      }
      const uid = file.uid; // 可用于取消上传
      const options = {
        file,
        formDataName: this.formDataName,
        action: this.action,
        onProgress: ev => {
          this.progress && this.progress(ev)
         // this.change && this.change()
        },
        onSuccess: res => {
          this.success && this.success(res)
          // this.change && this.change()
        },
        onError: err => {
          this.error && this.error(err)
          // this.change && this.change()
          // delete this.reqs[uid] // 已经失败的ajax, 不需要后续中断请求了
        }
      };
     let req = ajax(options);
     this.reqs[uid] = req; // 保存ajax请求，可用于取消请求
    },
    upload(file) {
      // 先判断这个文件是否能够上传 没有任何限制直接上传即可
      if (!this.beforeUpload) {
        this.post(file)
        return false;
      }
      // 否则需要调用用户的函数，获取返回值
      let flag = this.beforeUpload(file);
      if (flag) {
        this.post(file)
      }
    },
    uploadFiles(files) {
      if (this.limit && (this.fileList.length + files.length) > this.limit) {
        return this.exceed && this.exceed(files, this.fileList);
      };
      if (this.httpRequest) {
        // 用户自定义的上传方法
        this.httpRequest(files)
      } else {
        [...files].forEach(file => {
          // 用户上传的文件 需要做一些处理 可能用户频繁上传同一个文件 
          // 将文件格式化成我想要的结果
          this.handleStart(file) // 上传之前的处理
          this.upload(file); // 真正的上传
        });
      }
    },
    handleChange(e) {
      // 获取选中的文件
      const files = e.target.files;
      this.change(files)
      // 多个文件如何上传，一起上传可能会有并发问题，可以遍历上传
      this.uploadFiles(files)
    }
  }
}
</script>

<style lang="scss">
.cqc-upload {
  .uploadInp {
    display: none;
  }
}

</style>