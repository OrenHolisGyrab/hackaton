<template>
  <div>
    <CTable :columns="data.columns" :items="items" hower striped />

  </div>
</template>

<script>

import {Formats} from "../../utils/utils";
import { ref } from "vue";
import { useStore } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    items () {
      return this.$store.state.items.items.map(i => ({
        ...i,
        added: Formats.date((new Date(i.added)).getTime() / 1000)
      }));
    }
  },
  components: {
  },
  setup() {
    const store = useStore();

    let data = ref(
      {
        columns: [
          {
            key: 'code',
            label: 'Kód položky',
            _props: { scope: 'col' },
          },
          {
            key: 'name',
            label: 'Název položky',
            _props: { scope: 'col' },
          },
          {
            key: 'description',
            label: 'Popis',
            _props: { scope: 'col' },
          },
          {
            key: 'room',
            label: 'Místnost',
            _props: { scope: 'col' },
          },
          {
            key: 'added',
            label: 'Přidáno do inventáře',
            _props: { scope: 'col' }
          },
          {
            key: 'serial_number',
            label: 'Výrobní číslo',
            _props: { scope: 'col' },
          }
        ],
      }
    );

    const downloadItems = async () => await store.dispatch('getItems');
    downloadItems();

    return {data}
  },
}
</script>
