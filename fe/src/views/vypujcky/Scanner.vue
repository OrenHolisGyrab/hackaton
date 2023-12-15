<template>
  Ahoj
</template>

<script>
import { ref, reactive } from "vue";
import VypujckyTable from "./VypujckyTable";
import { REST } from "../../utils/REST";
import {useStore} from "vuex";

export default {
  name: 'Scanner',
  setup(context) {
    const store = useStore();


    return {
    }
  },
}
</script>
