<template>
  <div>
    <PCNavbar selectIndex="3" />
    <MobileNavBar :currentActive="2" />
    <ResearchIns />
  </div>
</template>

<script>
import PCNavbar from "@/components/navbar/index";
import MobileNavBar from "@/components/navbar/MobileNavBar.vue";
import ResearchIns from "@/components/research/index.vue";
export default {
  components: {
    PCNavbar,
    MobileNavBar,
    ResearchIns,
  },
};
</script>

<style></style>
