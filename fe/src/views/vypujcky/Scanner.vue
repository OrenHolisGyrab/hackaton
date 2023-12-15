<template>
  <CSpinner/>

</template>

<script>
import { REST } from "../../utils/REST";
import router from "../../router";

export default {
  name: 'Scanner',
  props: { code: { type: String } },
  setup(context) {

    (async () => {
      const borrowed = await REST.GET(`lending/item/${context.code}/borrowed`);

      if (!borrowed.user) {
        await router.push(`/vypujcky/aktivni/${borrowed.code}/create`);
      } else {
        await router.push(`/vypujcky/aktivni/${borrowed.id}/return`);
      }
    })();

    return {}
  },
}
</script>
