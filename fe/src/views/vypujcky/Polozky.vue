<template>
  <div>
    <CTable :columns="data.columns" :items="data.items" hower striped />

  </div>
</template>

<script>

import {Formats} from "../../utils/utils";
import { ref } from "vue";

export default {
  name: 'Dashboard',
  components: {
  },
  setup() {
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
        items: [
          {
            code: 'DHM-2002',
            room: '111',
            added: '2011-10-05T14:48:00.000Z',
            name: 'Name',
            description: 'yes',
            serial_number: 'yes',
          },
        ].map(i => ({
          ...i,
          added: Formats.date((new Date(i.added)).getTime() / 1000)
        }))
      }
    )
    return {
      data
    }
  },
}
</script>
