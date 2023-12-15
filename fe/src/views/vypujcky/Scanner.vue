<template>
  <CSpinner/>

</template>

<script>
import { ref, reactive } from "vue";
import VypujckyTable from "./VypujckyTable";
import { REST } from "../../utils/REST";
import {useStore} from "vuex";

export default {
  name: 'Scanner',
  props: { code: { type: String } },
  setup(context) {
    const store = useStore();
    console.log(
      context.code
    );

    return {
    }
  },
}
</script>
