<template>
  <v-app>
    <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-4"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

    <!--  <v-btn text link href="/#/homepage">解决方案</v-btn> -->
      <v-btn text link href="/#/online">在线应用</v-btn>

    </v-app-bar>
     <v-sheet>
      <v-sheet
      id="scrolling-techniques-4"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 50px;"></v-container>
    </v-sheet>
    </v-sheet>
  </v-card> 

      <router-view></router-view>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      model:""
    }
  }
};
</script>

<style>
*::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
*::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 15px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  /*background: #cce2f7;*/
  /* background: #999; */
}
*::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

*:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #323451 inset !important;
  -webkit-box-shadow: 0 0 0px 1000px #323451 inset !important;
  border: 0px solid #CCC!important;
  -webkit-text-fill-color: #FFF;
}
</style>
