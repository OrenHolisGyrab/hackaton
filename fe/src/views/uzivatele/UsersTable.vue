<template>
  <div>
    <!-- <CTable :columns="columns" :items="items" hower striped /> -->
    <CTable class="mb-0 border" hover striped responsive>
      <CTableHead class="text-nowrap">
        <CTableRow>
          <CTableHeaderCell class="bg-body-secondary"> Jméno</CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary text-center"> Přijmení </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary text-center"> email </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary"> Role </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary"> </CTableHeaderCell>

        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="item in items" :key="item.id">
          <CTableDataCell class="text-center"> {{ item.first_name }} </CTableDataCell>
          <CTableDataCell>{{ item.last_name }} </CTableDataCell>
          <CTableDataCell class="text-center"> {{ item.email }} </CTableDataCell>
          <CTableDataCell>
            <CDropdown color="secondary" variant="btn-group">
              <CDropdownToggle color="primary">{{ item.role }}</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem @click="setRole({id: item.id, role: 'STUDENT'})"  href="#">Student</CDropdownItem>
                <CDropdownItem @click="setRole({id: item.id, role: 'WORKER'})"  href="#">Pracovník</CDropdownItem>
                <CDropdownItem @click="setRole({id: item.id, role: 'ADMIN'})"  href="#">Admin</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>


          </CTableDataCell>
          <CTableDataCell>

            <CButtonGroup role="group" aria-label="Basic outlined example">
              <CButton color="primary" variant="outline" @click="() => { disableUser(item.id, !item.active) }">
                {{ item.active ? 'Deaktivovat' : 'Aktivovat' }}
              </CButton>
            </CButtonGroup>

          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from 'vuex';
import { Formats } from "../../utils/utils";

export default {
  name: 'PolozkyTable',
  components: {
  },
  setup() {
    const store = useStore();

    const downloadItems = async () => await store.dispatch('getUsers');
    downloadItems();

    const deleteConfirm = ref(null);

    let edit = (id) => {
      console.log(id);
    }

    const disableUser = async (id, active) => await store.dispatch('disableUser', { id, active });
    const setRole = data => store.dispatch('updateUserRole', data);

    return {
      setRole,
      edit, deleteConfirm, disableUser,
      items: computed(() => store.state.users.users),
    }
  },
}
</script>
