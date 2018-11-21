<template>
  <transition name="bounce">
    <div :class="`alert alert-${error}`" class="msn">
      <span class="close" @click="close">x</span>
      <strong>{{messageState}}...</strong> {{message}}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    messageState: {
      type: String,
      default: "Error"
    },
    error: {
      type: String,
      default: "danger"
    },
    duration: {
      type: Number,
      default: 5
    }
  },
  mounted() {
    setTimeout(() =>{
      this.close()
    }, this.duration*1000)
  },
  methods: {
    close() {
      this.$emit("close-window")
    }
  }
}
</script>

<style>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

