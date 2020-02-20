<template>
  <mb-header v-if="isMobile"></mb-header>
  <Header v-else></Header>
</template>
<script>
import MbHeader from "./MbHeader";
import Header from "./Header";
export default {
  name: "HeaderCon",
  components: {
    Header,
    MbHeader
  }
};
</script>
