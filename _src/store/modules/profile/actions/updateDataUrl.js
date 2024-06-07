/**
 * Update Data URL
 */
const updateDataUrl = ({ commit }, _dataUrl) => {
    // console.info('Updating data URL...', _dataUrl) // eslint-disable-line no-console

    /* Commit data URL. */
    commit('setDataUrl', _dataUrl)
}

/* Export module. */
export default updateDataUrl
