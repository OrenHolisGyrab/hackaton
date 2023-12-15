import { createStore } from 'vuex'
import {REST} from "../utils/REST";
import {Uploads} from "../utils/utils";

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    theme: 'light',
    session: null,
    error: null,

    items: {
      items: [],
      error: null
    },

    borrowings: {
      list: [],
      error: null
    },

    users: {
      users: [],
      error: null
    }
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setItems(state, data) {
      state.items.items = data;
    },
    addItem(state, data) {
      state.items.items.push(data);
    },
    updateItem(state, data) {
      state.data.items.updateByIndex(data, i => i.id === data.id);
    },
    deleteItem(state, data) {
      const idx = state.items.items.findIndex(i => i.id === data);
      state.items.items.splice(idx, 1);
    },
    importItems(state, data) {
      state.data.items = state.data.items.concat(data);
    },
    setItemsError(state, data) {
      state.items.error = data;
    },

    setBorrowings(state, data) {
      state.borrowings.list = data;
    },
    pushBorrowings(state, data) {
      state.borrowings.list.push(data);
    },
    prolongeBorrowing(state, data) {
      const idx = state.borrowings.list.findIndex(b => b.id === data.id);
      state.borrowings.list[idx].to = data.to;
      state.borrowings.list[idx].note = data.note;
    },
    returnBorrowing(state, data) {
      const idx = state.borrowings.list.findIndex(b => b.id === data.id);
      state.borrowings.list[idx].returned = data.returned;
    },
    setBorrowingsError(state, data) {
      state.borrowings.error = data;
    },

    setSession(state, data) {
      state.session = data;
    },
    setSessionError(state, data) {
      state.error = data;
    },

    setUsersError(state, data) {
      state.users.error = data;
    },
    setUsers(state, data) {
      state.users.users = data;
    },
    setUserRole(state, data) {
      const idx = state.users.users.findIndex(b => b.id === data.id);
      state.users.users[idx].role = data.role;
    },
    disableUser(state, data) {
      const idx = state.users.users.findIndex(b => b.id === data.id);
      state.users.users[idx].active = data.active;
    },
  },
  actions: {
    async getSession(context) {
      try {
        const response = await REST.GET('session');
        context.commit('setSession', response);
      } catch (error) {
        context.commit('setSessionError', error);
      }
    },

    async getItems(context) {
      try {
        const response = await REST.GET('items');
        context.commit('setItems', response);
      } catch (error) {
        context.commit('setItemsError', error);
      }
    },
    async newItem(context, data) {
      try {
        const response = await REST.POST('items', data);
        context.commit('addItem', response);
      } catch (error) {
        context.commit('setItemsError', error);
      }
    },
    async updateItem(context, {id, data}) {
      try {
        const response = await REST.POST(`items/${id}`, data);
        context.commit('updateItem', response);
      } catch (error) {
        context.commit('setItemsError', error);
      }
    },
    async deleteItem(context, id) {
      try {
        const response = await REST.DELETE(`items/${id}`);
        context.commit('deleteItem', id);
      } catch (error) {
        context.commit('setItemsError', error);
      }
    },
    async importItems(context, file) {
      try {
        const response = await Uploads.uploadFile(`items/import`, file);
        context.commit('importItems', response);
      } catch (error) {
        context.commit('setItemsError', error);
      }
    },

    async getBorrowings(context, mode) {
      try {
        const response = await REST.GET(`lending${mode}`);
        context.commit('setBorrowings', response);
      } catch (error) {
        context.commit('setBorrowingsError', error);
      }
    },
    async newBorrowing(context, data) {
      try {
        const response = await REST.POST(`lending`, data);
        context.commit('pushBorrowings', response);
      } catch (error) {
        context.commit('setBorrowingsError', error);
      }
    },
    async prolongeBorrowing(context, {id, data}) {
      try {
        const response = await REST.PUT(`lending/${id}`, data);
        context.commit('prolongeBorrowing', response);
      } catch (error) {
        context.commit('setBorrowingsError', error);
      }
    },
    async returnBorrowing(context, id) {
      try {
        const response = await REST.POST(`lending/${id}/returned`);
        context.commit('returnBorrowing', response);
      } catch (error) {
        context.commit('setBorrowingsError', error);
      }
    },

    async getUsers(context) {
      try {
        const response = await REST.GET(`users/list`);
        context.commit('setUsers', response);
      } catch (error) {
        context.commit('setUsersError', error);
      }
    },
    async updateUserRole(context, {id, role}) {
      try {
        const response = await REST.POST(`users/${id}/role`, {role});
        context.commit('setUserRole', response);
      } catch (error) {
        context.commit('setUsersError', error);
      }
    },
    async disableUser(context, {id, active}) {
      try {
        const response = await REST.POST(`users/${id}/activate`, {active});
        context.commit('disableUser', response);
      } catch (error) {
        context.commit('setUsersError', error);
      }
    },
  },
  modules: {},
})
