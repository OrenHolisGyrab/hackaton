<template>
  <div>
    <CTable :columns="data.columns" :items="data.items" hower striped />

  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: 'Dashboard',
  components: {
  },
  setup() {
    //kód, clovek,od,do, nazev polozky, poznámka, prodlouženo, tkacitka: detail, vrátit, prodlouzit  
    let data = ref(
      {
        columns: [
          {
            key: 'code',
            label: 'Kód položky',
            _props: { scope: 'col' },
          },
          {
            key: 'student',
            label: 'Student',
            _props: { scope: 'col' },
          },
          {
            key: 'from',
            label: 'Od',
            _props: { scope: 'col' },
          },
          {
            key: 'to',
            label: 'Do',
            _props: { scope: 'col' },
          },
          {
            key: 'name',
            label: 'Název položky',
            _props: { scope: 'col' },
          },
          {
            key: 'note',
            label: 'Poznámka',
            _props: { scope: 'col' },
          },
          {
            key: 'prolonged',
            label: 'Prodlouženo',
            _props: { scope: 'col' },
          },
          //buttons
          {
            key: 'detail',
            label: '',
            _props: { scope: 'col' },
          },
          {
            key: 'return',
            label: '',
            _props: { scope: 'col' },
          },
          {
            key: 'longer',
            label: '',
            _props: { scope: 'col' },
          },
        ],
        items: [
          {
            code: 'DHM-2002',
            student: 'Mark Mark (mart@sd.cz)',
            from: '3.3.2000',
            to: '3.5.5000',
            name: 'Name',
            note: 'Poznamkskkaksk',
            prolonged: 'yes',
            //buttons enabled
            detail: true,
            return: true,
            longer: true,
          },
          
        ]
      }
    )
    return {
      data
    }
  },
}
</script>
