<template>
  <div>
    <svg :style="{height:h+'px',width:w+'px'}"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <circle cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0"
                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/>
      </circle>
      <circle transform="rotate(45 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.125s"
                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/>
      </circle>
      <circle transform="rotate(90 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.25s"
                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/>
      </circle>
      <circle transform="rotate(135 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.375s"
                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/>
      </circle>
      <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s"
                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/>
      </circle>
      <circle transform="rotate(225 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.625s"
                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/>
      </circle>
      <circle transform="rotate(270 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.75s"
                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/>
      </circle>
      <circle transform="rotate(315 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.875s"
                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/>
      </circle>
      <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s"
                 keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline"/>
      </circle>
    </svg>
    <h1>Loading</h1>
  </div>
</template>
<script>
  export default {
    props: {
      h: {
        type: Number,
        default: 32
      },
      w: {
        type: Number,
        default: 32
      }
    }
  }
</script>
<style scoped lang='less' type='text/less'>
  div {
    position: relative;
    width: 100%;
    height: 100%;
  }

  svg {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate3d(-50%, -50%, 0);
    fill: gray;
  }

  h1 {
    top: 40%;
    position: absolute;
    left: 0;
    right: 0;
    font-size: .4rem;
  }

</style>
