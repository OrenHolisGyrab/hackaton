import { createStore } from 'vuex'
import {REST} from "../utils/REST";
import {Uploads} from "../utils/utils";

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    theme: 'light',

    items: {
      items: [],
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
      state.data.items.deleteByIndex(data, i => i.id === data.id);
    },
    importItems(state, data) {
      state.data.items = state.data.items.concat(data);
    },
    setItemsError(state, data) {
      state.items.error = data;
    },
  },
  actions: {
    async getItems(context) {
      try {
        const response = await REST.GET('items');
        context.commit('setItems', response);
      } catch (error) {
        context.setItemsError(error);
      }
    },
    async newItem(context, data) {
      try {
        const response = await REST.POST('items', data);
        context.addItem(response);
      } catch (error) {
        context.setItemsError(error);
      }
    },
    async updateItem(context, {id, data}) {
      try {
        const response = await REST.POST(`items/${id}`, data);
        context.updateItem(response);
      } catch (error) {
        context.setItemsError(error);
      }
    },
    async deleteItem(context, id) {
      try {
        const response = await REST.DELETE(`items/${id}`);
        context.deleteItem(response);
      } catch (error) {
        context.setItemsError(error);
      }
    },
    async importItems(context, file) {
      try {
        const response = await Uploads.uploadFile(`items/import`, file);
        context.importItems(response);
      } catch (error) {
        context.setItemsError(error);
      }
    }
  },
  modules: {},
})
