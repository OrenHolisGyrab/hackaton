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
        const response = await REST.GET(`lending/${mode}`);
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
        const response = await REST.GET(`lending/${id}`, data);
        context.commit('prolongeBorrowing', response);
      } catch (error) {
        context.commit('setBorrowingsError', error);
      }
    },
    async returnBorrowing(context, id) {
      try {
        const response = await REST.GET(`lending/${id}/returned`);
        context.commit('returnBorrowing', response);
      } catch (error) {
        context.commit('setBorrowingsError', error);
      }
    },
  },
  modules: {},
})
