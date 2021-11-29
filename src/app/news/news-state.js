import { fetchNewsTopHeadlines, fetchAllSources, fetchErrorResult } from './shared/services/'

// initial state
const initialState = () => ({
    headlines: [],
    headlineSearchText: '',
    headlineFilterSources: {},
    sources: [],
    isOverlayLoading: false,
    showSnackbar: false,
    snackbarData: {
        text: 'An error occured. Please contact administrator!',
        backgroundColor: 'red darken-4',
        buttonColor: 'white',
        textColor: 'text--white'
    }
})

// actions
const actions = {
    async getNewsTopHeadlines({ commit, state }) {
        commit('setOverlayLoading', true);
        let params;
        if (state.headlineFilterSources && state.headlineFilterSources.id) {
            params = { sources: state.headlineFilterSources.id, q: state.headlineSearchText };
        } else if (state.headlineSearchText !== '') {
            params = { q: state.headlineSearchText };
        } else {
            params = { country: 'us' };
        }
        try {
            const topHeadlinesRes = await fetchNewsTopHeadlines(params);
            commit('setHeadlines', topHeadlinesRes.articles);
        } catch (e) {
            console.error(`getNewsTopHeadlines: ${e}`)
            commit('setSnackbarData', initialState().snackbarData);
            commit('setShowSnackbar', true);
        } finally {
            commit('setOverlayLoading', false);
        }
    },

    async getSources({ commit }) {
        try {
            const response = await fetchAllSources();
            if (response.status === 'ok') {
                commit('setSources', response.sources);
            }
        } catch (e) {
            console.error(`getSources: ${e}`)
            commit('setSnackbarData', initialState().snackbarData);
            commit('setShowSnackbar', true);
        }
    },

    async makeWrongApiCall({ commit }) {
        commit('setOverlayLoading', true);
        try {
            const response = await fetchErrorResult();
            console.log(response)
        } catch (e) {
            console.error(`makeWrongApiCall: ${e}`)
            commit('setSnackbarData', initialState().snackbarData);
            commit('setShowSnackbar', true);
        } finally {
            commit('setOverlayLoading', false);
        }
    }
}

// mutations
const mutations = {
    setHeadlines(state, headlines) {
        state.headlines = headlines;
    },

    setHeadlinesSearchText(state, text) {
        state.headlineSearchText = text;
    },

    setHeadlineFilterSources(state, filterSource) {
        state.headlineFilterSources = filterSource;
    },

    setSources(state, sources) {
        state.sources = sources;
    },

    setOverlayLoading(state, isLoading) {
        state.isOverlayLoading = isLoading;
    },

    setSnackbarData(state, data) {
        state.snackbarData = data;
    },

    setShowSnackbar(state, showSnackbar) {
        state.showSnackbar = showSnackbar;
    }
}

export default {
    actions,
    mutations,
    namespaced: true,
    state: initialState
}