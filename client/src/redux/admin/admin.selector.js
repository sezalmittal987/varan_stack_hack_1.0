import {createSelector} from 'reselect';

const selectAdmin = state => state.admin;



export const selectAdminPresent = createSelector(
    [selectAdmin],
    admin => admin.isAdmin
)


export const selectUser = createSelector(
    [selectAdmin],
    admin => admin.user
)